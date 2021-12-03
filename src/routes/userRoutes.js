
import express from "express"
import { addNewUser, 
        getAllUsers,
        getUserById,
        updateUser,
        deleteUser} from "../controllers/userController.js"

const router = new express.Router()

//CRUD
//C: Create -> POST
//R: Read => GET
//U: Update: PUT- PATCH
//D: Delete: DELETE
router.post("/users",addNewUser)
router.get("/users",getAllUsers)
router.get("/users/:id", getUserById)
router.put("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)

export default router