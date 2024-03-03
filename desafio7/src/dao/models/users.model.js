import { Schema, model } from 'mongoose'
import mongoose from 'mongoose'
// import mongoosePaginate from 'mongoose-paginate-v2'
const usersCollection = 'users'

const userSchema = new Schema({
    
        first_name:{
            type:String,
            index:true
        },
        last_name:String,

        email:{
            type:String,
            required:true,
            unique:true
        },
        age:Number,
        password:{
            type:String,
            required:true
           
        },
        carts:{
            type:[{
                cart:{
                    type:Schema.Types.ObjectId,
                    ref:'carts'
                }
            }]
        },
        role:{
            type:String,
            enum:['user','admin'],
            default:'user'
        }
    

})

// userSchema.plugin(mongoosePaginate)
userSchema.pre('findOne', function(){
    this.populate('carts.cart')
})


export default model(usersCollection, userSchema)