import express from "express"
import "./db/mongoose.js"

import userRoutes from "./routes/userRoutes.js"

const app = express()

app.use(express.json())
app.use(userRoutes)

export default app