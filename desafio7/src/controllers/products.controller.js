import { ProductDaoMongo } from "../dao/Mongo/productDao.mongo.js";

export class ProductController {
    constructor() {
        this.services = new ProductDaoMongo()
    }
    getProducts = async (req, res) => {
        try {
            const allProducts = await this.services.getProducts()
            res.send({
                status: 'Success',
                payload: allProducts
            })
        } catch (error) {
            console.log(error);
        }
    }
    getProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await this.services.getProductBy(pid);
            res.send({
                status: 'Success',
                result: product
            })
        } catch (error) {
            console.log(error);
        }
    }
    createProduct = async (req, res) => {
        try {
            const { title,description,price } = req.body
            const newProduct = {title,description,price}
            const newProductController = await this.services.createProduct(newProduct)
            res.send({
                status: 'Success',
                result: newProduct
            })
        } catch (error) {
            console.log(error);
        }
    }
    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const promocion = { $mul: { price: .80 } }
            const productUpdated = await this.services.updateProduct(pid, promocion)
            res.send({
                status: 'Success',
                promo: '20% de descuento',
                result: productUpdated
            })
        } catch (error) {
            console.log(error);
        }
    }
    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const deleteProd = await this.services.deleteProduct(pid)
            res.send({
                status: 'Success, product delete'
            })
        } catch (error) {
            console.log(error);
        }


    }
}