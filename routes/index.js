'use strict'

const express = require('express')
const guideCtrl = require('../controllers/guide')
const router = express.Router()

// Routes

router.get('/guide', guideCtrl.getGuides)
router.get('/guide/:guideId', guideCtrl.getGuide)
router.post('/guide', guideCtrl.saveGuide)
router.put('/guide/:guideId', guideCtrl.updateGuide)
router.delete('/guide/:guideId', guideCtrl.deleteGuide)

module.exports = router
