import cartsModel from "../models/carts.model.js";

export class CartDaoMongo {
    constructor(){
        this.model = cartsModel
    }
    
    getCarts = () => {
        return this.model.find({})
    }
    getCartBy = (filter) => {
        return this.model.findOne({_id:filter})
    }
    createCart = (newCart) => {
        return this.model.create({newCart})
    }
    updateCart = (cid, newCart) => {
        return this.model.findOneAndUpdate({_id:cid},newCart,{new:true})
    }
    deleteCart = (cid) => {
        return this.model.findOneAndUpdate({_id:cid},{isActive:false})
    }

}