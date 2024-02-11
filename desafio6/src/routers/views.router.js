import {Router} from 'express'
import usersModel from '../dao/models/users.model.js'
const router = Router()

router.get('/login',(req,res)=>{
    res.render('login')  
})
router.get('/register',(req,res)=>{
    res.render('register')  
})
router.get('/users',async (req,res)=>{   //utilizo '/users' porque estoy en la vista principal
    const {limit=10, pageQuery=1} = req.query
    const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,      
        page         

    }  = await usersModel.paginate({},{limit,page:pageQuery,lean:true})     //lean en true para usar un objmongoos en js
                                        //primero es para los filtros
                                      
    res.render('users',{
        users:docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
})  
})

export default router