import {Router} from 'express'
import messageModel from '../dao/models/message.model.js'

const router = Router()



router.get('/',(req,res)=>{

    res.render('chat',{})
})

router.post('/',(req,res)=>{
    const {body} = req.body
  
})

export default router