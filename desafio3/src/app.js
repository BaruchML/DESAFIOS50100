import  express  from "express";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


let products = [ 
    {id:1, nombre:"arroz", precio:100, stock:10},
    {id:2, nombre:"cebolla", precio:100, stock:10},
    {id:3, nombre:"harina", precio:100, stock:10},
    {id:4, nombre:"leche", precio:100, stock:10},
    {id:5, nombre:"cafe", precio:100, stock:10},
    {id:6, nombre:"té", precio:100, stock:10},
    {id:7, nombre:"agua", precio:100, stock:10},
    {id:8, nombre:"mantequilla", precio:100, stock:10},
    {id:9, nombre:"salchichas", precio:100, stock:10},
    {id:10, nombre:"huevo", precio:100, stock:10},
]

const pushArray = () => {
    products = []
    products.push({id:1, nombre:"arroz", precio:100, stock:10},
    {id:2, nombre:"cebolla", precio:100, stock:10},
    {id:3, nombre:"harina", precio:100, stock:10},
    {id:4, nombre:"leche", precio:100, stock:10},
    {id:5, nombre:"cafe", precio:100, stock:10},
    {id:6, nombre:"té", precio:100, stock:10},
    {id:7, nombre:"agua", precio:100, stock:10},
    {id:8, nombre:"mantequilla", precio:100, stock:10},
    {id:9, nombre:"salchichas", precio:100, stock:10},
    {id:10, nombre:"huevo", precio:100, stock:10},)
}

app.get('/products', (req,res)=> {
res.send(products)
})


//URL localhost 8080 /products / limite ? limit = 5
app.get('/products/limite', (req,res)=> {

let limite = req.query
let {limit} = req.query

if(limit > products.length) res.send(products)
else{
const limiteArray = limit

products.length = limiteArray

res.send(products);

pushArray()
    
}})

app.get('/products/:uid', (req, res) => {
    const {uid} = req.params
   let userId = products.find(u=>u.id===Number(uid))


   if(!userId){ return res.send({error: "El producto no existe"})}

   res.send({userId})
})
app.listen(8080, ()=>console.log("Escuchando en el puerto 8080"));