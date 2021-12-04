

import mongoose from "mongoose"
import validator from "validator"

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true /* "     hello   " => "hello" */
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
})

const Task = mongoose.model("Task", TaskSchema)

export default Task
