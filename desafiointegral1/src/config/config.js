import {connect} from 'mongoose'


export const connectDB = async () =>{
    try {
        await connect('mongodb+srv://BARUCH123:TpLnR78wIzFREIlj@cluster0.magd2k2.mongodb.net/ecommerce?retryWrites=true&w=majority')
        console.log('base de datos connected');
    } catch (error) {
        console.log(error);
    }
}
