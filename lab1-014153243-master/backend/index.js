const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const app = express();
var mongoose = require("mongoose");

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
const CONNECTION_URL =
    "mongodb+srv://root:root@grubhub-b4ptc.mongodb.net/grubhub?retryWrites=true&w=majority";


mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true); //issue with a depricated- found it
// mongoose.set("poolSize", 10);
mongoose
    .connect(CONNECTION_URL, { useNewUrlParser: true, poolSize: 10 })
    .then(() => console.log("Connected Successfully to MongoDB"))
    .catch(err => console.error(err));

app.use("/test", (req, res) => res.send('Hello World!'));
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(8082, () => {
    console.log("GraphQL server started on port 8082");
})