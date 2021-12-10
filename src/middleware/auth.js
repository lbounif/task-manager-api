
import jwt from "jsonwebtoken"
import User from "../models/user.js"

const auth = async(req, res, next) => {

    try {

        console.log("--In auth: ", req)


        next()
    } catch(err){
        console.log(`Error: ${err}`)

        res.status(401).json({
            message: "Not authorized: Please authenticate",
            data: {}
        })
    }
}
export default auth