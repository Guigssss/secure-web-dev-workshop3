const router = require('express').Router()
const userService = require('./user.service')
router.post('/users/register', (req, res) => {
    return res.status(200).send()
})
router.post('/users/login', (req, res) => {
    return res.status(200).send()
})
router.get('/users/me', (req, res) => {
    return res.status(200).send()
})
router.put('/users/me', (req, res) => {
    return res.status(200).send()
})
router.delete('/users/me', (req, res) => {
    return res.status(200).send()
})
router.get('/users', (req, res) => {
    return res.status(200).send()
})
module.exports = router