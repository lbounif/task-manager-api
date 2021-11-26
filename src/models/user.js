//create User model: 
//name required 
//email : must to be: required, lowercase, unique and validated by validator
//password must be required, with minlength of 7 and validated
//age
import mongoose from "mongoose"
import validator from "validator"

const userSchema = new mongoose.Schema({

})

const User = mongoose.model("User", userSchema)

export default User
