const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.listen(process.env.PORT || 8081)

app.get('/status', (req,res) => {
    res.send("Bruuuuuuuuh")
})