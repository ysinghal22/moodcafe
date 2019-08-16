const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');

const authRoute = require('./auth/authentication');
const userRoutes = require('./model/UserRoutes');

dotenv.config();

var PORT = process.env.PORT ? process.env.PORT : 3000;

//connect to database
mongoose.connect(
    `${process.env.DB_CONNECT}`,
    {useNewUrlParser: true},
    () => console.log("Connected to DB!")
);

//Middlewares

//body parser
app.use(express.json());

// authentication route middleware
app.use('/moodcafe/', authRoute);
app.use('/moodcafe/user', userRoutes);

app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
})