'use strict'

// Import models

const Guide = require('../models/guide')

// Controllers definition

function getGuide (req, res) {
  let guideId = req.params.guideId

  Guide.findById(guideId, (err, guide) => {
    if (err) {
      return res.status(500).send({
        message: `Error performing request: ${err}`
      })
    }
    if (!guide) {
      return res.status(404).send({
        message: `The guide doesn't exist.`
      })
    }
    res.status(200).send({ guide })
  })
}

function getGuides (req, res) {
  Guide.find({}, (err, guides) => {
    if (err) {
      return res.status(500).send({
        message: `Error performing request: ${err}`
      })
    }
    if (!guides) {
      return res.status(404).send({
        message: `There aren't guides.`
      })
    }
    res.status(200).send({ guides })
  })
}

function saveGuide (req, res) {
  let guide = new Guide(req.body)

  guide.save((err, data) => {
    if (err) {
      res.status(500).send({
        message: `Error saving BD: ${err}`
      })
    } else {
      console.log(req.body)
      res.status(200).send({ data })
    }
  })
}

function updateGuide (req, res) {
  let guideId = req.params.guideId
  let update = req.body

  Guide.findByIdAndUpdate(guideId, update, (err, guideUpdated) => {
    if (err) {
      res.status(500).send({
        message: `Error to update the guide: ${err}`
      })
    }
    res.status(200).send({
      guide: guideUpdated
    })
  })
}

function deleteGuide (req, res) {
  let guideId = req.params.guideId

  Guide.findById(guideId, (err, guide) => {
    if (err) {
      res.status(500).send({
        message: `Error to delete the guide: ${err}`
      })
    }

    guide.remove(err => {
      if (err) {
        res.status(500).send({
          message: `Error to delete the guide: ${err}`
        })
      }
      res.status(200).send({
        message: `The guide has delete.`
      })
    })
  })
}

module.exports = {
  getGuide,
  getGuides,
  saveGuide,
  updateGuide,
  deleteGuide
}
