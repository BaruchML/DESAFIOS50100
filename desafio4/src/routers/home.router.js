import { Router } from "express";

const router = Router()

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

router.get("/", (req, res) => {
    res.render('home', {
      products,
      
      })
  });


  router.get("/realtimeproducts",(req,res)=>{
    res.render('realTimeProducts',{
     products,
    
    })
    
  })

export default router