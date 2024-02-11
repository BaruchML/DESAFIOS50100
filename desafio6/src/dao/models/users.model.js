import { Schema, model } from 'mongoose'
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
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
        password:{
            type:String,
           
        },
        role:{
            type:String,
            enum:['user','admin'],
            default:'user'
        }
    

})

userSchema.plugin(mongoosePaginate)

export default model(usersCollection, userSchema)