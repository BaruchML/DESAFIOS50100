
import { Router } from 'express'
const router = Router()
            //Expresione[s regulares regex
            //%C3%A1 -> á codigo para usar tilde
            //buscar las otras letras,
            //tambien se peude agregar 0-9 para los numeros
router.get('/:parametro([a-zA-Z%C3%A1]+)', (req,res)=>{
    res.send(req.params.parametro)
})


//para capturar un parametro, este funciona como un middlewere y podemos ocuparlo para manipularlo antes de mandarlo
router.param('parametro', async(req,res,next,parametro)=>{

})








//EJERCICIONS ANTES DE LA CLASE 12------------------------------------------------------
// router.get('/session', (req,res) =>{
//     if(req.session.counter){
//         req.session.counter++
//         res.send(`Ud ha visitado el sitio ${req.session.counter}`)
//     }else{
//         req.session.counter = 1
//         res.send('Bienvenido a la pagina ')
//     }
// })

// router.get('/logout', (req,res)=>{
//     req.session.destroy(error =>{
//         if (error)res.send('Logout error')
//         res.send({status:'Succes',message:'logoutok'})
//     })
// })
// //Cookies sin firmas
// router.get('/setCookie',(req,res)=>{
//     res.cookie('CoderCookie','esta es una cookie',{maxAge:100000}).send('seteando cookie')
//         //nombre: codercookie, contenido, tiempo de duración
// })
// router.get('/getCookie',(req,res)=>{
//     console.log(req.cookies);
//     res.send(req.cookies)
    
// })
// router.get('/deleteCookie',(req,res)=>{
//     res.clearCookie('CoderCookie').send('cookie borrada')
    
// })


// //Cookies firmadas 
// router.get('/setCookieSigned',(req,res)=>{
//     res.cookie('CoderCookie','esta es una cookie firmada',{maxAge:100000, signed:true}).send('seteando cookie firmada')
//                                                             // para firmar ponemos signed en true 
// })

// router.get('/getCookieSigned',(req,res)=>{
//     // console.log(req.cookies); SI USARAMOS SOLO req.cookies NO PODRIA LEER UNA COOKIE FIRMADA
//     console.log(req.signedCookies);
//     res.send(req.signedCookies)
    
// })



export default router