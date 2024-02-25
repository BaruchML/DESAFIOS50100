import {Schema, model} from 'mongoose'

const collection = 'carts'

const cartsSchema = new Schema({
    title: String,
    products:{
        type:[{
            product:{
                type:Schema.Types.ObjectId,
                ref:'products'
            }
        }]
    },
    isActive:{
        type: Boolean,
        default:true,
    }

})

cartsSchema.pre('findOne', function(){
    this.populate('products.product')
})

export default model(collection, cartsSchema)