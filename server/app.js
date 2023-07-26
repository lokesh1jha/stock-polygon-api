// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");
const { restClient } = require('@polygon.io/client-js');
const apiKey = "tj4VvpVexJbKebDlDuaKHDu7puAlGwv8";
const app = express();

const cors = require('cors');
const { getStockData } = require('./stockDataService');
app.use(cors());
app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', async (req, res) => {
    const { tickerSymbol, date } = req.body;
   if(!tickerSymbol || !date) {
         return res.status(400).json({message : "Invalid request"});
    }
    const requiredResponse = await getStockData(tickerSymbol, date);
    if(!requiredResponse) {
        return res.status(400).json({message : "Invalid request"});
    }
    res.status(200).json({data : requiredResponse});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));