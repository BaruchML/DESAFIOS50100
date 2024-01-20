import {Router} from 'express'
import cartsModel from '../dao/models/carts.model.js'
import productsModel from '../dao/models/products.model.js'
const router = Router()

router
    .get('/', async (req,res)=>{
        try {
            const allCarts = await cartsModel.find({ isActive: true })

            res.send({
                status: 'Success',
                result: allCarts
            })

        } catch (error) {
            console.log(error);
        }
        
    })

    .post('/', async (req,res)=>{
        try {
            const {body} = req
            const result = await cartsModel.create(body)
            res.send({
                status:'Success',
                result: result
            })
        } catch (error) {
            console.log(error);
        }

        
    })
    .get('/:cid', async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await cartsModel.find({ _id: cid });

            res.send({
                status: 'Success',
                result: cart
            })
        } catch (error) {

        }

    })
    //meter 1 producto a un array de un carrito
    .put('/:cid/:pid', async (req,res)=>{
        try {
            const {cid,pid} = req.params
            const product = await productsModel.findOne({_id:pid}) 

            // cart.products.push(product)
            const pushProduct = await cartsModel.findByIdAndUpdate({_id:cid},{$push:{products:product}})
            
            res.json({
                status:'SUCCESS',
                result:pushProduct
            })
        } catch (error) {
            console.log(error);
        }
        

        
    })
     
    .delete('/:cid', async (req, res) => {
        try {
            const { cid } = req.params
            const deleteCart = await cartsModel.findByIdAndUpdate({ _id: cid }, ({ isActive: false }))
            res.send({
                status: 'Success, cart delete'
            })
        } catch (error) {

        }


    })

export default router