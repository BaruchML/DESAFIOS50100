import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import logger from 'morgan'
import appRouter from './routers/index.js'
import { connectDB } from './config/config.js'
//cookie - session -  store
import cookieParser from "cookie-parser";
import session from "express-session";
import  FileStore  from "session-file-store";
import MongoStore from "connect-mongo";

import pruebasRouter from "./routers/pruebas.router.js"

//passport estrategias para el sessions 
import passport from "passport";
import initializePassport from "./config/passport.config.js";


const app = express()
const PORT = 8080

connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))
//cookie
app.use(cookieParser('palabrasecretaparafirmarcookie'))//cookie, en el parametro podemos crear una firma cuando cree la cookie, y no va a poder ser validada si se modifica
const fileStore = FileStore(session)
// app.use(session({
//     store:new fileStore({
//         path:'./sessions',//en que folder va a guardar los achivos
//         ttl:100,
//         retries: 0
//     }),
//     secret:'secretCoder',//podemos pasarle un objeto como argumento, tiene el mismo principio de la palabra secreta de cookie
//     resave:true, //mantiene activa la sesion o si no pasa 1 tiempo activa y se pierde
//     saveUninitialized:true, //sirve para guardar independientemente si tiene algo 
// }))

// session con mongo 
app.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://BARUCH123:TpLnR78wIzFREIlj@cluster0.magd2k2.mongodb.net/desafio6?retryWrites=true&w=majority',
        mongoOptions:{
            useNewUrlParser:true,
            useUnifiedTopology:true
            
        },
        ttl:15000000000 * 24
    }),
    secret:'secretCoder',//podemos pasarle un objeto como argumento, tiene el mismo principio de la palabra secreta de cookie
    resave:true, //mantiene activa la sesion o si no pasa 1 tiempo activa y se pierde
    saveUninitialized:true, //sirve para guardar independientemente si tiene algo 
}))

// PASSPORT
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(__dirname+'/public'))
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


//Cookies sin firmas
app.get('/setCookie',(req,res)=>{
    res.cookie('CoderCookie','esta es una cookie',{maxAge:100000}).send('seteando cookie')
        //nombre: codercookie, contenido, tiempo de duración
})
app.get('/getCookie',(req,res)=>{
    console.log(req.cookies);
    res.send(req.cookies)
    
})
app.get('/deleteCookie',(req,res)=>{
    res.clearCookie('CoderCookie').send('cookie borrada')
    
})


//Cookies firmadas 
app.get('/setCookieSigned',(req,res)=>{
    res.cookie('CoderCookie','esta es una cookie firmada',{maxAge:100000, signed:true}).send('seteando cookie firmada')
                                                            // para firmar ponemos signed en true 
})

app.get('/getCookieSigned',(req,res)=>{
    // console.log(req.cookies); SI USARAMOS SOLO req.cookies NO PODRIA LEER UNA COOKIE FIRMADA
    console.log(req.signedCookies);
    res.send(req.signedCookies)
    
})


app.use('/', appRouter)
app.use('/pruebas', pruebasRouter)


app.listen(PORT, (err)=>{
    if(err)console.log(err);
    console.log(`Escuchando en el puerto ${PORT}`);
})

