const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://test123:test123@cluster0.0beidae.mongodb.net/employee_tasks?retryWrites=true&w=majority';


module.exports = () => {
   return mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
}