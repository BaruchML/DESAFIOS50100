import mongoose from "mongoose"

export class MongoSingleton {
    static #instance //variable privada para fuera de la clase
    //static quiere decir que puedo llamar el metodo sin instanciar la classe   
    constructor(url){
        mongoose.connect(url)
    }

    static getInstance (url){
        if(this.#instance){
            console.log('Base de datos previamente conectada');
            return this.#instance

        }
        this.#instance = new MongoSingleton(url)
        console.log('Base de datos conectada');
        return this.#instance
    }
}