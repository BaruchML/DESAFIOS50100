import { paginate } from "mongoose-paginate-v2";
import usersModel from "../models/users.model.js";

class userDaoMongo {
    constructor(){
        this.model = usersModel
    }
    
    // getUsersPaginate = async (limit=10, page=1)=> await this.usersModel.paginate({},{limit,page,lean,})
    
    getUsers = async _=> await this.model.find({})
    
    getUserBy = async (filter) => await this.model.findOne(filter)
    
    createUser = async (newUser) => await this.model.create(newUser)
    
    updateUser = async  (uid, userUpdate) => await this.model.findOneAndUpdate({_id:uid},userUpdate,{new:true} )

    deleteUser = async (uid) => await this.model.findByIdAndDelete({_id:uid})
}

export default userDaoMongo