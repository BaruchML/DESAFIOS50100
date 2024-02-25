import { Router } from "express"
import  jwt  from "jsonwebtoken"


class RouterClass {
    constructor() {
        this.router = Router()
    }
    getRouter = () => {
        return this.router
    }
    init() { }//esta se define en la clase hija

    applyCallback(callbacks) {//usaremos u callback con un array de parametros dependiendo de que callback usaremos
        return callbacks.map(callback => async (...params) => {
            try {           //apply es metodo de javascript
                await callback.apply(this, params)
            } catch (error) {
                console.log(error);
                //request es el 0 y respons es el 1
                params[1].status(500)
            }

        })
    }
    //opera a nivel middleware
    //middleware le etoy agregando 1 funcion sendSucces al response
    
    generateCustomReponses = (req, res, next) => {
        res.sendSuccess = payload => res.send({status:'success',payload}) 
        res.sendServerError = error => res.send({status:'error',error}) 
        res.sendUserError = error => res.send({status:'error',error}) 
    }
    // cookie - headers. validaremos diferentes tipos de usuario para diferentes rutas
    //los roles vendrian en 1 array ['PUBLIC', 'PREMIUM', 'ADMIN']
    handlePolicies = policies =>(req,res,next)=>{
        if(policies[0]==='PUBLIC')next()
        // token = 'BEARER kdakjdlkajsdklajksd'
        const authHeaders = req.headers.authorization //n authorization etoy extrayendo todo el token
        const token = authHeaders.split(' ')[1] //separe el BEARER askdjal EN DOS ELEMENTOS EN 1 ARRAY POR EL SPLIT, COMO QUEREMOSEL TOKEN USAMOS [1]
        let user = jwt.verify(token,'palabrasecretatoken')
        if(!policies.includes(user.role.toUpperCase())) res.status(403).send({status:'error',error:'not permisions'}) 
        req.user = user
        next()
    }


    //recordar que el spread ... agrupa los parametros en 1 array
    get(path,policies,...callbacks) {                           //applyCallback es la funcion que va a ejecutar mis callback
        this.router.get(path,this.handlePolicies ,this.generateCustomReponses, this.applyCallback(callbacks))
    }
    post() { }
    put() { }
    delete() { }


}

export default RouterClass