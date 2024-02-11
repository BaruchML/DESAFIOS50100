import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2"
import usersModel from "../dao/models/users.model.js";
import { createHash, isInvalidPassword } from "../utils/hashBcrypt.js";


const LocalStrategy = local.Strategy
const initializePassport = ()=>{
    //register es el nombre que yo le doy a la estrategia
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, //accediendo al objeto request
        usernameField: 'email'

    }, async (req, username, password, done)=>{
        const {first_name, last_name, email} = req.body
        try {
            let user = await usersModel.findOne({email})
            if(user) return done(null,false)

            let newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password)
            }
            let result = await usersModel.create(newUser)

            return done(null,result) //done funciona como el next 
        } catch (error) {
            return done(error)
        }
    })) 
    passport.use('login', new LocalStrategy({
        usernameField:'email',
                //al igual que en register, parte del proceso de passport es que automaticamente toma username y password sin nosotrros haberlos declarado
    }, async (username,password, done)=>{
        try {
            const user = await usersModel.findOne({email:username})
            if(!user){
                console.log('usuario no encontrado');
                return done(null,false)
            }
            if(!isInvalidPassword(password, user.password)) return done (null, false)
            return done(null,user)
        } catch (error) {
            
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id,done)=> {
        let user = await usersModel.findById({_id:id})
        done(null,user)
    })

    //ESTRATEGIA PARA GITHUB
    passport.use('github', new GithubStrategy({
        clientID:'Iv1.a14a3e9ef0b81265',
        clientSecret:'4d6c2b1a41f70365656098c1c151145607858699',
        callbackURL:'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log('profile: ', profile);
        try {
            let user = await usersModel.findOne({email: profile._json.email})
            if(!user){
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    email: profile._json.email,
                    password:''
                }
                let result = await usersModel.create(newUser)
                return done(null, result)
            }

            return done(null,user)
        } catch (error) {
            done(error)
        }
    }))
}

export default initializePassport