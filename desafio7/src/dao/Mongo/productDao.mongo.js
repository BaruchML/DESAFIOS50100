import productsModel from "../models/products.model.js";


export class ProductDaoMongo {
    constructor() {
        this.model = productsModel
    }
    getProducts = () => {
        return this.model.find({})
    }
    getProductBy = (filter) => {
        return this.model.findOne({_id:filter})
    }
    createProduct = (newProduct) => {
        return this.model.create(newProduct)
    }
    updateProduct = (pid, productUpdate) => {
        return this.model.findByIdAndUpdate({ _id: pid }, productUpdate, { new: true })
    }
    deleteProduct = (pid) => {
        return this.model.findByIdAndUpdate({ _id: pid },{isActive:false})
    }
}