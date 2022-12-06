const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    password: String,
    role: {type: String}
})
const User = mongoose.model('User', userSchema)

module.exports = User