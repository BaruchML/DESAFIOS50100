import { Schema, model } from 'mongoose'

const productsSchema = new Schema({
    title: String,
    description:String,
    price: Number,
    stock:Number,
    quantity: {
        type: Number,
        default: 1
    },
    isActive: {
        type: Boolean,
        default: true,
    }

})

export default model('products', productsSchema)