import mongoose from "mongoose"

const MONGODB_URL = "mongodb//localhost:27017/task-db"

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})