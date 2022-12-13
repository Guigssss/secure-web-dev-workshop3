const router = require('express').Router()
const userService = require('./user.service')
const passport = require("passport");
const authorizationMiddleware = require("../Authorization/authorization.middleware")
const jwt = require("jsonwebtoken");
require('dotenv').config()

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
    async(req,res)=>{
        res.status(200).send("Token : " + await userService.generateJWT(req.user.id))
    }
)

router.get('/users/me', passport.authenticate('jwt',{session:false}),(req, res) => {
    const user = req.user.toObject()
    delete user.password
    return res.status(200).send(user);
})

router.put('/users/me',passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        return res.status(200).send(await userService.updateUser(req.user.name, req.body));
    }
    catch (e) {
        return res.status(400)
    }
})

router.delete('/users/me', passport.authenticate('jwt',{session:false}), async (req, res) => {
    return res.status(200).send(await(userService.deleteUser(req.user.name)));
})
router.get('/users', passport.authenticate('jwt',{session:false}), authorizationMiddleware.canAccess(['admin','moderator']),async (req, res) => {
    return res.status(200).send({users: await userService.findAll()})
})
module.exports = router