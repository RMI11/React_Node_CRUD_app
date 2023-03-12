const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require('./db.js');
const employeeRoutes = require('./controllers/employee.controller');
const taskRoutes = require('./controllers/task.controller');

const app = express()

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json())

app.use('/api/employees', employeeRoutes)
app.use('/api/tasks', taskRoutes)


connectDb()
    .then(() => {
        console.log('Connected to DB!');
        app.listen(3000,() => console.log('server started at 3000'));
    })
    .catch(err => console.log(err))