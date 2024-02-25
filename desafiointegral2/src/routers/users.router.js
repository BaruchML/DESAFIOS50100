import { Router } from "express";
import usersModel from '../dao/models/users.model.js'
import { passportCall } from "../middleware/passportCall.js";
import { authorization } from "../middleware/authorization.middleware.js";


const router = Router()


router
    .get('/',passportCall('jwt'),authorization(['USER_PREMIUM','ADMIN']), async (req, res) => {

        try {
            // const users = await usersModel.find({}).explain('executionStats')
            const users = await usersModel.paginate({},{limit:20, page:2, sort:{first_name:-1}, lean:true})
                                            //es importante poner lean para poder parsear 1 objeto 
            console.log(users);

            res.send(users)


        } catch (error) {
            console.log(error);
        }
    })


    .get('/:uid', async (req, res) => {
        try {
            const { uid } = req.params;
            const user = await usersModel.find({ _id: uid });

            res.send({
                status: 'Success',
                result: user
            })
        } catch (error) {
            console.log(error)
        }

    })

    .post('/', async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body
            const newUser = {
                first_name,
                last_name,
                email,
                password
            }
            const result = await usersModel.create(newUser)
            res.send({
                status: 'Success',
                usersCreate: result
            })
        } catch (error) {
            console.log(error);
        }

    })
    .put('/:uid', async (req, res) => {
        try {
            const { uid } = req.params
            const userToUpdate = req.body

            const result = await usersModel.findByIdAndUpdate({ _id: uid }, userToUpdate, { new: true })
            res.send({
                status: 'Success',
                message: result,

            })
        } catch (error) {
            console.log(error)
        }

    })
    .delete('/:uid', async (req, res) => {
        try {
            const { uid } = req.params
            const result = await usersModel.findByIdAndUpdate({ _id: uid })
            res.send({
                status: 'Success, product delete'
            })
        } catch (error) {

        }


    })

export default router 