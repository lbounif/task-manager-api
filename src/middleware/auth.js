
import jwt from "jsonwebtoken"
import User from "../models/user.js"

const auth = async(req, res, next) => {
    try {
        //get token from request header
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log("token: ", token)
        //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWFiMzBjYTk1Y2Y2YWU2NmNmM2ZjOGQiLCJpYXQiOjE2MzkxMjY1Mzd9.oEK0P5faf9PGgQS1YzUs-Qn4aONMETHPQROALWp5xiA
        //decode token using the same key "mysecret"
        const decoded = jwt.verify(token, "mysecret")
        console.log("decoded: ", decoded)
        //decoded:  { _id: '61ab30ca95cf6ae66cf3fc8d', iat: 1639126537 }

        //find user in DB by decoded_id and token
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user) {
            throw new Error()
        }
        //save token and user in req
        req.token = token
        req.user = user
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