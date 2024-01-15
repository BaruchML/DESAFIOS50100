import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import homeRouter from "./routers/home.router.js"

import {Server} from "socket.io"



const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))
//setear la direccion para handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use('/', homeRouter)


const httpServer = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//socket del lado del server
const socketServer = new Server(httpServer)

let newProducts = []

let products =
[
    {
    "id": 1,
    "title": "MANZANA",
    "price": 100
  },
  {
    "id": 2,
    "title": "PERA",
    "price": 200
  },
  {
    "id": 3,
    "title": "UVA",
    "price": 300
  },
  {
    "id": 4,
    "title": "PLATANO",
    "price": 400
  },
  {
    "id": 5,
    "title": "XBOXS-PROSERIES",
    "price": 5000
  }
]

socketServer.on('connection',socket => {
  console.log('Cliente conectado');

  socket.on('prod', data => {
    console.log(data);
  })
  socketServer.emit('Datos', products)

  socket.on('prodeliminado', data => {
    
    let prodElim = products.find(p => p.id === Number(data))
    
    if (!prodElim){
      console.log('No existe el id del producto');
    }else{
      let productIndex = products.findIndex(i => i.id === prodElim.id)
      
      products.splice(productIndex, 1)}
      
      
      socketServer.emit('Datos', products)
    })
let newProd = []
socket.on('newtitle', valorTitle => {
newProd.push(valorTitle);


})
socket.on('newprice', valorPrice => {
  newProd.push(valorPrice);
  
})


console.log(newProd);
  

})



// let mensajes =[]
// io.on('connection', socket => {
//   console.log('cliente conectado');


// socket.on('message', data=>{
  //   console.log(data);
  //   mensajes.push(data)
  
  //   io.emit('messageLogs', mensajes)
  
  // })
  // })
  
  
  //PRIMERA PARTE CLASE 10---------------------------
  //emitir mensaje del lado del cliente 
  // socket.emit('solo-para-el-actual', 'Hola cliente')
  
  // socket.broadcast.emit('para-todos-menos-el-actual','PARA EL RESTO')
  
  // socketServer.emit('para-todos','mensaje para todos')  
  //PRIMERA PARTE CLASE 10---------------------------