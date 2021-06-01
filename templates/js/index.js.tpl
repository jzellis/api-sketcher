const express = require('express'),
  bodyParser = require('body-parser')
  app = express(),
  cors = require('cors'),
  routes = require('./routes'),
  mongoose = require('mongoose'),
  {schema, root} = require("./schema/graphql/schema.js"),
  { graphqlHTTP } = require('express-graphql'),
  { buildSchema } = require('graphql');


var mongoDB = "{{mongoURL}}";
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors())
app.use(express.static('../static'))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.set('json spaces', 2)
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use('/', routes);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
let server;
server = app.listen({{port}}, () => {
  console.log(`Listening to port {{port}}`);
});