import userDaoMongo from "../dao/Mongo/userDao.mongo.js";
import { createHash, isInvalidPassword } from "../utils/hashBcrypt.js";
import generateToken, { authTokenMiddleware } from "../utils/jsonwebtoken.js";
import passport from "passport";

export class SessionController {
    constructor() {
        this.services = new userDaoMongo()
    }

    register = async (req, res) => {

        try {
            const { first_name, last_name, email, password } = req.body

            if (email === "" && password === "") return res.send('faltan llenar campos')
            //falta validar si estan enla basede datos

            const newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password)
            }
            const result = await this.services.createUser(newUser)
            //TOKEN 
            //NO GUARDAR DATOS SENSIBLES

            const token = generateToken({
                fullname: `${first_name} ${last_name}`,
                id: result._id
            })

            res.cookie('cookieToken', token, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true
            }).send({ status: 'success', usersCreate: result, token })

        } catch (error) {
            console.log({ status: 'error', error: error.message });

        }
     
    }
    login = async (req, res) => {
        try {
            const { email, password } = req.body

            const userFoundDB = await this.services.getUserBy({ email })

            if (!isInvalidPassword({ password: userFoundDB.password }, password)) return res.status(401).send('no coincide las credenciales')

            const token = generateToken({
                fullname: `${userFoundDB.first_name} ${userFoundDB.last_name}`,
                role: userFoundDB.role,
                email: userFoundDB.email
            })

            //esta vinculado a authentication
            res.cookie('cookieToken', token, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true
            }).send({
                status: "success",
                usersCreate: 'login success'
            })
        } catch (error) {
            console.log({ status: 'error', error: error.message });

        }


    }

    current = async (req, res) => {
        try {
            res.send({ message: 'datos sensibles' })

        } catch (error) {
            console.log({ status: 'error', error: error.message });
        }
    }

}