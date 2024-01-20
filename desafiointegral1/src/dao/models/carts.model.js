import {Schema, model} from 'mongoose'

const cartsSchema = new Schema({
    title: String,
    products:Array,
    isActive:{
        type: Boolean,
        default:true,
    }

})

export default model('carts', cartsSchema)