const { Router } = require('express');
const { ProductsController } = require('../controller/productos');

const router = Router();

router.get('/', async (req, res)=>{
   res.render('form')
});

router.get('/:id', async (req, res, next)=>{
    try{
        const {id} = req.params 

        const prodPorId = await ProductsController.getById(id)
        res.json({
            msg: "El producto no Existe"
        })
    }catch(err){
        next(err);
    }    
 });

router.post('/', async (req, res, next)=>{ //crea producto
    try{
        const dataCargada = req.body
        const producto = await ProductsController.save(dataCargada)
        console.log('se agrego '+producto.price+' '+ producto.title)
        res.redirect('/')
    }catch(err){
        next(err);
    } 
});

router.put('/:id', async (req, res, next) =>{ // Modificar Producto
    const {id} = req.params
    const body = req.body
    try {
        let data = await ProductsController.updateById(id, body)

        res.json(data);

    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) =>{// Borrar producto
    try {
        const {id} = req.params
        await ProductsController.deleteById(id)

        res.json({ message: 'Producto eliminado' })

    } catch (err) {
        next(err)
    }
})

module.exports = rutaProducts;