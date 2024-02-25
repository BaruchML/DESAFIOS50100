import RouterClass from "./router.js";

class UsersRouter extends RouterClass {
    init(){
        this.get('/',['ADMIN'], async (req,res)=>{
            res.sendSuccess('get users')
        })
    }
}


export default UsersRouter