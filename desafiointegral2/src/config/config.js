import {connect} from 'mongoose'
import dotenv from 'dotenv'
import program from '../utils/commander.js'


const {mode} = program.opts()
//clase 13 _______________________________________
dotenv.config({
    path:mode === 'development' ? './.env.development' : './.env.production'
})
export const configObject = {
    port: process.env.PORT || 8080,
    mongo_url:process.env.MONGO_URL,
    jwt_secret_key: process.env.JWT_SECRET_KEY
}
//____________________________________________

export const connectDB = async () =>{
    try {
        await connect(process.env.MONGO_URL)
        console.log('base de datos connected');
    } catch (error) {
        console.log(error);
    }
}
