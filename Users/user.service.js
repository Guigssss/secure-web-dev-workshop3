const User = require('./user.model')
const bcrypt = require('bcrypt')

function findAll(){
    return User.find({})
}
async function addUser(userData) {
    try {
        const hash = await bcrypt.hash(userData.password, 10)
        const user = new User({...userData, password: hash})
        return await user.save();
    } catch (e) {
        console.log(e)
        throw new Error("Username already used")
    }
}
async function checkPassword(username,password){
    const user = await User.findOne({name:username})
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        return false
    }
    return user
}
module.exports.addUser = addUser
module.exports.findAll = findAll
module.exports.checkPassword = checkPassword