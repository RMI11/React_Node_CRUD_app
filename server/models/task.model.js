const mongoose = require('mongoose');

module.exports = mongoose.model('Task', {
    title: { type: String },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    status: { type: String },
    dueDate: { type: Date },
    notes: { type: String },
})