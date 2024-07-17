const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require('http');

const app = express();

const server = http.createServer(app);


app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


dotenv.config();
const LOCALPORT = process.env.LOCALPORT;

const CONNECTION = process.env.MONGODB_CONNECTION;
mongoose
    .connect(CONNECTION)
    .then(() => {
        app.listen(LOCALPORT, () => console.log(`Listening at Port ${LOCALPORT}`));
    })
    .catch((error) => {
        console.log(`${error} did not connect`);
    });

// Entry point
app.get('/hello', (req, res) => {
    // handle request logic
    res.send('Hello, this is my entry point')
});


module.exports = app;
