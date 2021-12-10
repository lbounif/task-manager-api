import express from "express"
import { getCompletedTasks, 
        addNewTask,
        getTaskById } from "../controllers/taskController.js"

const router = new express.Router()

router.post("/tasks",addNewTask)
//get all completed tasks
router.get("/tasks",getCompletedTasks)
//get task by id
router.get("/tasks/:id",getTaskById)


export default router