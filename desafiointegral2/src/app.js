import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import logger from 'morgan'
import appRouter from './routers/index.js'
import { configObject, connectDB } from './config/config.js'
//cookie - session -  store
import cookieParser from "cookie-parser";
import session from "express-session";
import  FileStore  from "session-file-store";
import MongoStore from "connect-mongo";


//passport estrategias para el sessions 
import passport from "passport";
import initializePassport from "./config/passport.config.js";


const app = express()
const PORT = configObject.port

connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))

//cookie
app.use(cookieParser('palabrasecretaparafirmarcookie'))//cookie, en el parametro podemos crear una firma cuando cree la cookie, y no va a poder ser validada si se modifica
const fileStore = FileStore(session)
// PASSPORT
initializePassport()
app.use(passport.initialize())

app.use(express.static(__dirname+'/public'))
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use('/', appRouter)



app.listen(PORT, (err)=>{
    if(err)console.log(err);
    console.log(`Escuchando en el puerto ${PORT}`);
})

