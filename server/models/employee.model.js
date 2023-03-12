const mongoose = require('mongoose');

module.exports = mongoose.model('Employee', {
    fullName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    birthday: { type: Date },
    salary: { type: Number },
    tasks: { type: Array }
})