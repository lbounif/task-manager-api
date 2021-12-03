import app from './app.js'
const port = process.env.APP_PORT || 4000

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})