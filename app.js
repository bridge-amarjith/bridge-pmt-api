const express = require('express')
const app = express()
require('dotenv').config();
var cors = require('cors')
const router = require('./app/routes/index.js')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const port = 8080
app.listen(port, () => {
    console.log(`pmt-bridge back-end api listening on port ${port} smash it!`)
})

app.use(cors())
app.use(express.json())
app.use('/api', router);