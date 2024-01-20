import {Router} from 'express'
import viewsRouter from './views.router.js'
import cartsRouter from "./carts.router.js"
import messageRouter from "./message.router.js"
import productsRotuer from "./products.router.js"

const router = Router()

router.use('/', viewsRouter)
router.use('/api/carts',cartsRouter)
router.use('/api/message',messageRouter)
router.use('/api/products',productsRotuer)


export default router