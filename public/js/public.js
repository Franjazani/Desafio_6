const socketio = io()
const socket = io.connect();// Mediante un tunel nos conectamos al servidor

const form = document.getElementById("form");
const inputProd = document.getElementByIdById("inputProd");
const inputPrice = document.getElementById("inputPrice");

const inputSubmit = document.getElementById("inputSubmit");

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

inputSubmit.addEventListener("submit", (e) => {
    e.preventDefault()
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const infoParaElServer = {
        prod: inputProd.value,
        price: inputPrice.value
    }
    console.log("Info para el Server")
    console.log((infoParaElServer));

    socket.emit("Producto creado:", infoParaElServer);

})

socket.on("Respuesta", (data) => {
    console.log(`El server me respondio con ${JSON.stringify(data)}`)
});