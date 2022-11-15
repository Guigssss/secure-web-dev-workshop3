const express = require('express')
const locationController = require('./locations/locations.controller')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
app.use(bodyParser.json())
app.use(locationController)

app.listen(port, async () => {
	await mongoose.connect(process.env.MONGO_URI)
	console.log("Well done")
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})