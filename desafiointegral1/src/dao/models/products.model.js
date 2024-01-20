import { Schema, model } from 'mongoose'

const productsSchema = new Schema({
    title: String,
    price: Number,
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