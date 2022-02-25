const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

const metricsController = require('./controller/metricsController');

app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/resource', metricsController);

app.listen(8000, () => console.log("server is running on port 8000"));
