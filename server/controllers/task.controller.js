const express = require('express');
const router = express.Router();

const Task = require('../models/task.model')
const { validateDbId, error404 } = require('../middlewares');

router.get('/', (req, res) => {
    Task.find().populate('assignedTo')
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

router.get('/:id', validateDbId, (req, res) => {
    Task.findById(req.params.id).populate('assignedTo')
    .then(data => {
        if(data)
        res.send(data)
        else
        error404(req, res)
    })
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    Task.create(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => console.log(err))
})

router.put('/:id', validateDbId, (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body)
    .then(data => {
        if(data) res.send(data)
        else error404(req, res)
    })
    .catch(err => console.log(err))
})

router.delete('/:id', validateDbId, (req, res) => {
    Task.findByIdAndDelete(req.params.id)
    .then(data => {
        if(data) res.send(data)
        else error404(req, res)
    })
    .catch(err => console.log(err))
})

module.exports = router