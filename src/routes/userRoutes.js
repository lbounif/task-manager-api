
import express from "express"
import {addNewUser} from "../controllers/userController.js"

const router = new express.Router()

//CRUD
//C: Create -> POST
//R: Read => GET
//U: Update: PUT- PATCH
//D: Delete: DELETE
router.post("/users",addNewUser)

export default router