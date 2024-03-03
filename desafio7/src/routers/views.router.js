import {Router} from 'express'
import usersModel from '../dao/models/users.model.js'
const router = Router()

router.get('/login',(req,res)=>{
    res.render('login')  
})
router.get('/register',(req,res)=>{
    res.render('register')  
})
router.get('/',(req,res)=>{
    res.render('index')  
})


export default router