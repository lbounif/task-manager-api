import express from "express"
import { addNewUser, 
        getAllUsers,
        getUserById,
        updateUser,
        deleteUser,
        registerUser,
        loginUser,
        logoutUser,
        logoutAllUser} from "../controllers/userController.js"
import auth from "../middleware/auth.js"

const router = new express.Router()

//CRUD
//C: Create -> POST
//R: Read => GET
//U: Update: PUT- PATCH
//D: Delete: DELETE
router.post("/users", addNewUser)
router.post("/register", registerUser)

router.post("/users/login", loginUser)
router.post("/users/logout",auth, logoutUser)
router.post("/users/logoutAll",auth, logoutAllUser)
router.get("/users", auth, getAllUsers)
router.get("/users/:id", auth,getUserById)
router.put("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)

export default router