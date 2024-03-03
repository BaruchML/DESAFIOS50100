import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const router = Router()
const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = new UserController()
router
    .get('/',getUsers)
    .get('/:uid',getUser)
    .post('/',createUser)
    .put('/:uid',updateUser)
    .delete('/:uid',deleteUser)

export default router 