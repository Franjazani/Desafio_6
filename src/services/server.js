const express = require('express');
const { engine } = require("express-handlebars");
const http = require("http");
const rutaPrincipal = require('../routes/index');
const path = require('path');
const app = express();
const httpServer = http.Server(app);

    app.use(express.static("public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', rutaPrincipal);
    
// HBS seteo
    const viewFoldersPath = path.resolve(__dirname, "../../views"); 
    const layoutFoldersPath = path.resolve `${viewFoldersPath+"/layouts"}`; 
    const partialFolderPath = path.resolve `${viewFoldersPath+"/partials"}`;
    const defaultLayoutPath = path.resolve `${layoutFoldersPath+"/index.hbs"}`;

    app.set('view engine', 'hbs');
    const viewsPath = path.resolve(__dirname, '../../views');
    app.set('views', viewsPath);
    
    app.engine("hbs", engine({
        // CONFIGURACION 
        layoutsDir: layoutFoldersPath,
        extname: "hbs",
        defaultLayout: defaultLayoutPath,
        partialsDir: partialFolderPath
    }));

// EndPoints    

app.get('/', async (req, res, next)=>{
    try{
        const data = await ProductosController.getAll()
        res.render('products', {data});
    }catch(err){
        next(err);
    } 
});

app.use((err, req, res, next) => {
    // chequear si es un error random o si es el 404

        const status = err.status || 500;
        const message = err.message || 500;

        res.status(status).json({
            message
        })  
    res.status(500).send('Something broke!')
});

module.exports = httpServer;