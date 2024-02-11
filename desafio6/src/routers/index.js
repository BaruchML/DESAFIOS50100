import {Router} from 'express'
import viewsRouter from './views.router.js'
import cartsRouter from "./carts.router.js"
import messageRouter from "./message.router.js"
import productsRotuer from "./products.router.js"
import usersRouter from "./users.router.js"
import ordersRouter from "./orders.router.js"
import sessionsRouter from "./sessions.router.js"


const router = Router()

router.use('/', viewsRouter)
router.use('/api/carts',cartsRouter)
router.use('/api/message',messageRouter)
router.use('/api/products',productsRotuer)
router.use('/api/users',usersRouter)
router.use('/api/orders',ordersRouter)
router.use('/api/sessions',sessionsRouter)


export default router