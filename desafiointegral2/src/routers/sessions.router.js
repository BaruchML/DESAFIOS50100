import { Router } from "express";
import userDaoMongo from "../dao/Mongo/userDao.mongo.js";
import { createHash, isInvalidPassword } from "../utils/hashBcrypt.js";
import generateToken, { authTokenMiddleware } from "../utils/jsonwebtoken.js";


import auth from "../middleware/authentication.middleware.js"
import passport from "passport";
import { passportCall } from "../middleware/passportCall.js";
import { authorization } from "../middleware/authorization.middleware.js";

const router = Router()
const userService = new userDaoMongo()

router.get('/', (req, res) => {
    res.send(console.log('Hola desde sessions'))
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const userFoundDB = await userService.getUserBy({ email })

    if (!isInvalidPassword({ password: userFoundDB.password }, password)) return res.status(401).send('no coincide las credenciales')

    const token = generateToken({
        fullname: `${userFoundDB.first_name} ${userFoundDB.last_name}`,
        role: userFoundDB.role,
        email: userFoundDB.email
    })

    //esta vinculado a authentication
    res.cookie('cookieToken', token, {
        maxAge: 60 * 60 * 1000 * 24,
        httpOnly: true
    }).send({
        status: "success",
        usersCreate: 'login success'
    })

})
router.post('/register', async (req, res) => {

    try {
        const { first_name, last_name, email, password } = req.body

        if (email === "" && password === "") return res.send('faltan llenar campos')
        //falta validar si estan enla basede datos

        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password)
        }
        const result = await userService.createUser(newUser)
        //TOKEN 
        //NO GUARDAR DATOS SENSIBLES

        const token = generateToken({
            fullname: `${first_name} ${last_name}`,
            id: result._id
        })

        res.cookie('cookieToken', token, {
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true
        }).send({ status: 'success', usersCreate: result, token })

    } catch (error) {
        console.log({ status: 'error', error: error.message });

    }

})
router.post('logout', async (req, res) => {
    res.send('logout')
})
//CURRENT CON passport.authenticate
//pondremos session en false porque noe stamos usando session
// router.get('/current', passport.authenticate('jwt',{session:false}), async (req, res) => {
//     res.send({message:'datos sensibles' })
// } )

///CURRENT CON passportCall
router.get('/current', passportCall('jwt'), authorization('admin'), async (req, res) => {
    res.send({ message: 'datos sensibles' })
})

//NUEVO POST PARA PASSPORT  //SE COMENTA PORQUE USAREMOS JWT------------------
// router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
//     res.send({ status: 'success', message: 'usuario registrado' })

// })
// router.get('/failregister', async (req, res) => {
//     res.send({ error: 'falla en el registro' })
// })
// router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
//         //este req.user viene de la configuracion del passport login
//     if (!req.user) return res.status(401).send({ status: 'error', error: 'credencial invalid' })

//     req.session.user = {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         email: req.user.email, 
//         id: req.user._id 
//     }

//     res.send({ status: 'success', message: req.user })

// })
// router.get('/faillogin', async (req, res) => {
//     res.send({ error: 'falla en el registro' })
// })
// router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req, res) => {})
// router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/api/sessions/login'}), async (req, res) => {
//     req.session.user = req.user
//     res.redirect('/api/users')
// })
// router.get('current', async (req, res) => {
//     res.send({message:'datos sensibles' })
// } )---------------------------------



export default router