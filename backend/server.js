const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
var router = express.Router();
const cors = require('cors');

// Connect to database
connectDB();

const app = express();
app.use(cors());

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH, OPTIONS");
  next();
};
const jsonParser = bodyParser.json({ limit: '50mb' }); // Increase JSON payload size limit to 50mb
const urlencodedParser = bodyParser.urlencoded({ limit: '50mb', extended: true }); // Increase URL-encoded payload size limit to 50mb
app.use(jsonParser);
app.use(urlencodedParser);

app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to the Used Stuff Platform" })
})

// Use routes as a module (see index.js)
require('./routes')(app, router);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
console.log('Server running on port ' + PORT);
