// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')
const passport = require("passport");
const authorizationMiddleware = require("../Authorization/authorization.middleware");

router.get('/', (req, res) => {
    return res.status(200).send("Hello World")
})

router.get('/locations', passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        const locations = await locationsService.findAll()
        return res.status(200).send(locations)
    } catch (e) {
        if (e.message === "Not Found") {
            return res.status(404).send(e.message)
        }
        return res.status(400).send("Bad Request")
    }
})

router.get('/locations/:id', passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        const locations = await locationsService.findOne(req.params.id)
        return res.status(200).send(locations)
    } catch (e) {
        if (e.message === "Not Found") {
            return res.status(404).send(e.message)
        }
        return res.status(400).send("Bad Request")
    }
})

router.post('/locations', passport.authenticate('jwt',{session:false}),authorizationMiddleware.canAccess(['admin','moderator']), async (req, res) => {
    try {
        const locations = await locationsService.addLocation({
            ...req.body,
            endDate: new Date(req.body?.endDate),
            startDate: new Date(req.body?.startDate)
        })
        return res.status(201).send(locations)
    } catch (e) {
        return res.status(400).send("Bad Request")
    }
})

router.delete('/locations/:id', passport.authenticate('jwt',{session:false}), authorizationMiddleware.canAccess(['admin']), async (req, res) => {
    try {
        const locations = await locationsService.deleteOne(req.params.id)
        return res.status(200).send(locations)
    } catch (e) {
        if (e.message === "Not Found") {
            return res.status(404).send(e.message)
        }
        return res.status(400).send("Bad Request")
    }
})
router.put('/locations/:id',passport.authenticate('jwt',{session:false}), authorizationMiddleware.canAccess(['admin']), async (req, res) => {
    const body = {...req.body, endDate: new Date(req.body?.endDate), startDate: new Date(req.body?.startDate)}
    const locations = await locationsService.updateLocation(req.params.id, body)
    return res.status(200).send(locations)
})

module.exports = router
