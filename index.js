"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const routes = require('./routes/candidate-routes');
const HttpError = require('./models/http-error');

const app = express();

//app.use(express.json());

app.use(bodyParser.json());

app.use(routes); // app.use('/candidates', routes); if a prefix was needed

// app.post("/candidates", function (req, res, next) {});

// app.get("/candidates", );

app.use((req, res, next) => {
    const error = new HttpError('Could not found this route.', 404);
    // Just throw it, since it is async
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headersSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown errror occurrerd'})
})

app.listen(process.env.HTTP_PORT || 3000);