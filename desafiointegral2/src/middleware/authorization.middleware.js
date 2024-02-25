
//VALIDAREMOS EL ROLE
export const authorization = roleArray => {
    return async (req, res, next)=>{
        if(roleArray[0]==='PUBLIC') return next()
         
        if(!req.user) return res.status(401).json({status:"error", error: 'Unauthorized'})
        // if(req.user.role != role) return res.status(401).json({status:"error", error: 'Not permission'})
    //lo comentado arriba es para un solo parametro, pero como estamos pasando 1 array necesitamos la proxima validación
    if(!roleArray.includes(req.user.role)) return res.status(401).json({status:"error", error: 'Not permission'})
        next()
    }
}