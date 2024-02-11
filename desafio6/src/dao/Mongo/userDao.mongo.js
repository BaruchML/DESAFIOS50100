import { paginate } from "mongoose-paginate-v2";
import usersModel from "../models/users.model.js";

class userDaoMongo {
    constructor(){
        this.usersModel = usersModel
    }
    
    getUsersPaginate = async (limit=10, page=1)=> await this.usersModel.paginate({},{limit,page,lean,})
    
    getUsers = async _=> await this.usersModel.find({})
    
    getUserBy = async (filter) => await this.usersModel.findOne(filter)
    
    createUser = async (newUser) => await this.usersModel.create(newUser)
    
    updateUser = async  (uid, userUpdate) => await this.usersModel.findOneAndUpdate({_id:uid},userUpdate )

    deleteUser = async (uid) => await this.usersModel.findByIdAndDelete({_id:uid})
}

export default userDaoMongo