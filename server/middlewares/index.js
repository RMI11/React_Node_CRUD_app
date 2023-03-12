const ObjectId = require('mongoose').Types.ObjectId;


const validateDbId = (req, res, next) => {
    if(ObjectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: `Object id (${req.params.id}) is not valid.`
        }) 
    else
        next ()
}


const error404 = (req, res) => {
    res.status(404).json({
        error: 'no record with given _id : ' + req.params.id
    })
}

module.exports = {
    validateDbId,
    error404
}