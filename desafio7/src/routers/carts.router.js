import {Router} from 'express'
import { CartController } from '../controllers/carts.controller.js'
const router = Router()
const { getCarts,getCartById,createCart,updateCart,deleteCart} = new CartController()
router
    .get('/', getCarts)
    .get('/:cid',getCartById )
    .post('/',createCart)
    //meter 1 producto a un array de un carrito
    .put('/:cid/:pid', updateCart)
    .delete('/:cid',deleteCart)

export default router