import express from "express"
import "./db/mongoose.js"

const app = express()

app.use(express.json())

export default app