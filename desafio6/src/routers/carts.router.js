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
            // const {body} = req
            const result = await cartsModel.create({products:[]})
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
            const cart = await cartsModel.findOne({ _id: cid });
            console.log(cart.products);

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
            const product = await productsModel.findById({_id:pid}) 
            const cart = await cartsModel.findById({_id:cid}) 

            cart.products.push({product})
            let pushProduct = await cartsModel.findByIdAndUpdate({_id:cid}, cart)
            
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