import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import logger from 'morgan'
import appRouter from './routers/index.js'
import { connectDB } from './config/config.js'
const app = express()
const PORT = 8080


connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))

app.use(express.static(__dirname+'/public'))

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use('/', appRouter)


app.listen(PORT, (err)=>{
    if(err)console.log(err);
    console.log(`Escuchando en el puerto ${PORT}`);
})

