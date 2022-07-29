const express = require('express')
const app = express()
require('dotenv').config();
const router = require('./app/routes/index.js')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const port = 3000
app.listen(port, () => {
    console.log(`pmt-bridge back-end api listening on port ${port} smash it!`)
})


app.use(express.json())
app.use('/api', router);