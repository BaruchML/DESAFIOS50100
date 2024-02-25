import { Router } from 'express'
import ordersModel from '../dao/models/orders.model.js'
const router = Router()

router
    .get('/', async (req, res) => {

        try {
            const resultOrders = await ordersModel.aggregate([
                //ordersModel.aggregate([
                //     {},{},{} estos son stages
                // ])

                {$match:{size:"small"}},//encontramos coincidencias
                {$group:{_id:'$name', totalQuantity:{$sum:'$quantity'}}},//en este caso estamos agrupando y '$name' funciona como this al igual que '$quantity' 
                {$sort:{totalQuantity:1}},//usamos sort para ordenar de manera ascendente o descendente
                {$group:{_id:1,orders:{$push:"$$ROOT"}}},//guardaremos todos los documentos en un nuevo documento dentro de un arreglo con el nombre"orders" $push indica que sera en un arreglo y '$$ROOT' que tomara todo el documento, de lo contrario tendriamos que especificar atributo por atributo
                {$project:{"_id":0, orders:'$orders'}},//una vez que tengamos el documento, le agregaremos un objectid nuevo para que no genere coincidencias, al isar "_id":0 indicamos que genere un ObjectId propio
                {$merge:{into:'reports'}}//por ultimo Agreramos estos elementos a la coleccion "reports", EL STAGE CON EL METODO $merge SIEMPRE VA AL ULTIMO aun cuando agregemos mas pasos de los ejemplificados


            ])
            console.log(resultOrders);
            res.send({
                status: 'Success',
                result: resultOrders
            })


        } catch (error) {
            console.log(error);
        }
    })

    .post('/', async (req, res) => {
        try {
            const orders = [
                {
                    name: "Peperoni",
                    size: "small",
                    price: 200,
                    quantity: 3,
                    date: "2024-01-26T09:25:17Z"
                },
                {
                    name: "Hawaiana",
                    size: "medium",
                    price: 300,
                    quantity: 3,
                    date: "2024-01-26T09:21:17Z"
                },
                {
                    name: "Chicago",
                    size: "big",
                    price: 700,
                    quantity: 1,
                    date: "2024-01-25T09:25:17Z"
                },
                {
                    name: "Peperoni",
                    size: "medium",
                    price: 250,
                    quantity: 2,
                    date: "2024-01-26T09:25:27Z"
                },
                {
                    name: "Hawaiana",
                    size: "small",
                    price: 50,
                    quantity: 7,
                    date: "2024-01-30T09:25:17Z"
                },
            ]
            let result = await ordersModel.insertMany(orders)
            res.send({
                status: 'Success',
                result: result
            })
        } catch (error) {
            console.log(error);
        }

    })

    .get('/:pid', async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await productsModel.find({ _id: pid });

            res.send({
                status: 'Success',
                result: product
            })
        } catch (error) {

        }

    })
    .put('/:pid', async (req, res) => {
        try {
            const { pid } = req.params

            const promocion = await productsModel.findByIdAndUpdate({ _id: pid }, ({ $mul: { price: .80 } }))
            res.send({
                status: 'Success',
                promo: '20% de descuento',
                result: promocion
            })
        } catch (error) {

        }

    })
    .delete('/:pid', async (req, res) => {
        try {
            const { pid } = req.params
            const deleteProd = await productsModel.findByIdAndUpdate({ _id: pid }, ({ isActive: false }))
            res.send({
                status: 'Success, product delete'
            })
        } catch (error) {

        }


    })


export default router