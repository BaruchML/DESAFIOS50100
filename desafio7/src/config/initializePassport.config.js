import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt"
import { PRIVATE_KEY } from "../utils/jsonwebtoken.js";

const JWTStrategy = Strategy
const ExtractJWT = ExtractJwt

const initializePassport = ()=>{
const cookieExtractor = (req) => {
    let token = null
    if(req && req.cookies){
        token = req.cookies['cookieToken']//depende como la pasamos al cliente - login o register
    }
    return token
}

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),//desencripta el token y lo guarda en jwt_payload
        secretOrKey:PRIVATE_KEY
    }, async (jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
}

export default initializePassport