import { Router } from 'express'
import productsModel from '../dao/models/products.model.js'
const router = Router()

router
    .get('/', async (req, res) => {
        
        try {
            const allProducts = await productsModel.find({ isActive: true })

            res.send({
                status: 'Success',
                result: allProducts
            })


        } catch (error) {
            console.log(error);
        }
    })

    .post('/', async (req, res) => {
        try {
            // const { body } = req
            const result = await productsModel.create({
                title:'Producto Dos',
                description:'Este es un producto',
                price: 100,
                stock:150
            })
            res.send({
                status: 'Success',
                result: result
            })
        } catch (error) {
            console.log(error);
        }

    })

    .get('/:pid', async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await productsModel.find({ _id: pid });

            res.send({
                status: 'Success',
                result: product
            })
        } catch (error) {

        }

    })
    .put('/:pid', async (req, res) => {
        try {
            const { pid } = req.params
            
            const promocion = await productsModel.findByIdAndUpdate({ _id: pid }, ({ $mul: { price: .80 } }))
            res.send({
                status: 'Success',
                promo: '20% de descuento',
                result: promocion
            })
        } catch (error) {

        }

    })
    .delete('/:pid', async (req, res) => {
        try {
            const { pid } = req.params
            const deleteProd = await productsModel.findByIdAndUpdate({ _id: pid }, ({ isActive: false }))
            res.send({
                status: 'Success, product delete'
            })
        } catch (error) {

        }


    })


export default router