// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')

router.get('/', (req, res) => {
    return res.status(200).send("Hello World")
})

router.get('/locations', async (req, res) => {
    const locations = await locationsService.findAll()
    return res.status(200).send(locations)
})

router.get('/locations/:id', async (req, res) => {
    try {
        const locations = await locationsService.findOne(req.params.id)
        return res.status(200).send(locations)
    } catch (e) {
        if (e.message === "Not Found") {
            return res.status(404).send(e.toString())
        }
        return res.status(400).send("Bad Request")
    }
})

router.post('/locations', async (req, res) => {
    const locations = await locationsService.addLocation({
        ...req.body,
        endDate: new Date(req.body?.endDate),
        startDate: new Date(req.body?.startDate)
    })
    return res.status(201).send(locations)
})

router.delete('/locations/:id', async (req, res) => {
    const locations = await locationsService.deleteOne(req.params.id)
    return res.status(200).send(locations)
})
router.put('/locations/:id', async (req, res) => {
    const body = {...req.body, endDate: new Date(req.body?.endDate), startDate: new Date(req.body?.startDate)}
    const locations = await locationsService.updateLocation(req.params.id, body)
    return res.status(200).send(locations)
})

module.exports = router
