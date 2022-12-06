const router = require('express').Router()
const userService = require('./user.service')
const passport = require("passport");
const authorizationMiddleware = require("../Authorization/authorization.middleware")

router.post('/users/register', async (req, res) => {
    try {
        const user = await userService.addUser(req.body)
        return res.status(201).send(user)
    } catch (e) {
        return res.status(400).send("Bad Request")
    }
})

router.post('/users/login',
    passport.authenticate('local',{session:false}),
    //authorizationMiddleware.canAccess(['admin']),
    async(req,res)=>{
        res.status(200).send(req.user)
    }
)

router.get('/users/me', (req, res) => {
    return res.status(200).send()
})
router.put('/users/me', (req, res) => {
    return res.status(200).send()
})
router.delete('/users/me', (req, res) => {
    return res.status(200).send()
})
router.get('/users', async (req, res) => {
    return res.status(200).send({users: await userService.findAll()})
})
module.exports = router