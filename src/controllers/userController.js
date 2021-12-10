import User from "../models/user.js"
/* Get all users from BD */
//1. Add get route
//2. create function getUsers 
//200 :sucess
//201 : created
//400 : bad request
//401 : Unauthorized
//403 : Forbidden
//404 : Not found
//500 : Internal server error
const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body

        if(!(name && email && password)) {
            return res.status(400).json({
                message: "All inputs are required"
            })
        }
        const oldUser = await User.findOne({email})
        console.log("-----OldUser is: ", oldUser)
        if(oldUser) {
            return res.status(409).json({
                message: "User already exist. Please Login"
            })
        }
        //create a user
        const user = new User(req.body)

        // add token 
        const token = await user.generateAuthToken()
        console.log("token: ", token)

        res.status(201).json({
            message: "User created successfully",
            data: {
                user,
                token
            }
        })
    }catch(e){
        console.log(`Error: ${e}`)
        //send error response to client
        res.status(500).json({
            message: "Internal server error",
            error: e
        })
      }
}
const addNewUser = async(request,response) => {
    console.log("request.body: ", request.body)
    const user = new User(request.body)
      try {
          //save user in database
          await user.save()
          //send success response to client
          response.status(201).json({
                message: "User created successfully",
                data: user
            })

      }catch(error){
        console.log(`Error: ${error}`)
        //send error response to client
        response.status(500).json({
            message: "Internal server error",
            error: error
        })
      }
}
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findByCredentials(email, password)
        if(!user) {
            res.status(404).json({
                message: "User does not exist",
                data: {}
            })
        }
        const token = await user.generateAuthToken()
        res.status(200).json({
            message: "Logged successfully",
            data: {user, token}
        })

    } catch(err){
        console.log(`Error: ${err}`)
        //send error response to client
        res.status(500).json({
            message: "Internal server error",
            data: {}
        })
    }
   
}
const getAllUsers = async(req, res) => {
    try {
        const users = await User.find()
        console.log("users: ", users)

        res.status(200).json({
            message: "Users found successfully",
            data: users
            })
    }catch(error){
        console.log(`Error: ${error}`)
        //send error response to client
        response.status(500).json({
            message: "Internal server error",
            error: error
        })
      }
}
const getUserById = async(req, res) => {
    console.log("req: ", req)
    const id = req.params.id
    if(!id) {
        response.status(400).json({
            message: "Bad request"
        })
    }
    try {
        const user = await User.findById(id)
        if(!user) {
            response.status(404).json({
                message: "User not found"
        })
        }
        res.status(200).json({
            message: "User found successfully",
            data: user
        })

    } catch(error) {
        console.log(`Error: ${error}`)
        //send error response to client
        response.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}
const updateUser = async(req, res) => {
    console.log("req: ", req)
    const id = req.params.id
    if(!id) {
        response.status(400).json({
            message: "Bad request"
        })
    }
    try {
        const user = await User.findById(id)
        if(!user) {
            return response.status(404).json({
                message: "User not found"
        })
        }
        await User.updateOne({_id:id}, 
                            {$set: {email: "newEmail@gmail.com"}})

        res.status(200).json({
            message: "User found successfully",
            data: user
        })

    } catch(error) {
        console.log(`Error: ${error}`)
        //send error response to client
        response.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
    
}
const deleteUser = async(req, res) => {
    console.log("req: ", req)
    const id = req.params.id
    if(!id) {
        response.status(400).json({
            message: "Bad request"
        })
    }
    try {
        const user = await User.findById(id)
        if(!user) {
            return response.status(404).json({
                message: "User not found"
        })
        }
        await user.remove()

        res.status(200).json({
            message: "User deleted successfully",
            data: {}
        })

    } catch(error) {
        console.log(`Error: ${error}`)
        //send error response to client
        response.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
    
}
export {
    addNewUser,
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}