const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Creating Express Server
const app = express();
const port = process.env.PORT || 5000;

// MiddleWare
app.use(cors());
app.use(express.json());    // Allowing us to Parse JSON

const uri = process.env.ATLAS_URI;  //DataBase URI
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

//Listening server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});