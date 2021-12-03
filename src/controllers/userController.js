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
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}