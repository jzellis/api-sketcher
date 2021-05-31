const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')
const routes = require('./routes');
const mongoose = require('mongoose');

var mongoDB = "{{mongoURL}}";
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors())
app.use(express.static('static'))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.set('json spaces', 2)
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use('/', routes);
let server;
server = app.listen({{port}}, () => {
  console.log(`Listening to port {{port}}`);
});