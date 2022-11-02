const io = require("socket.io");
const webSocketServer = io(httpServer);
const path = require("path");
const formatMsg = require("../utils/message");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("../utils/users");

webSocketServer.on("connection", async (socket) => {
    console.log("Se conecto un cliente");
    console.log("ID SOCKET SERVER:", socket.id);
    console.log("ID SOCKET CLIENT:", socket.client.id);

    const filePath = path.resolve(__dirname, "../../products.json");
    const fs = require('fs/promises');
    const fileData = await fs.readFile(filePath, "utf-8");
    const prods = JSON.parse(fileData);

    socket.on("Se creo Producto:", (data) => {
        console.log(`El cliente${socket.client.id} mando un mensaje:`);
        console.log(data);
        socket.emit("Respuesta", { Recibido: "ok" })
        
        socket.emit("Envio de Datos", prods)
    })

    // CHAT CON SOCKET

    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user, room);

        // Entra un nuevo usuario

        socket.emit("message", formatMsg("Bienvenido"));

        //Broadcast user se conecta
        socket.broadcast.to(user.room).emit("message", formatMsg(`${user.username} se unio al grupo`));

        // Envia info del usuario
        io.to(user.room).emit("roomUsers", { room: user, room, users: getRoomUsers(user.room) })
    });

    //Escucha el mensaje
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMsg(user.username, msg));
    });

    //Se desconecta el cliente
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit("message", formatMsg(`${user.username} salio del chat`));
        };

        io.to(user.room).emit("roomUsers", { room: user.room, users: getRoomUsers(user.room) })
    })
});