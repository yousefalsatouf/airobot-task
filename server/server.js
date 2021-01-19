const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema= require('./schema/LocationsSchema')
const mongoose= require('mongoose')
const cors= require('cors')
const morgan = require('morgan'); // to show request in the terminal
const parser = require("body-parser"); // ex take data from the front side to the back side
const dotenv = require("dotenv");
const app = express();
app.use(cors())
dotenv.config();
const port = process.env.PORT || 5000
const url = process.env.DATABASE_ACCESS
const drawRoute = require('./routes/LeafletDraws')


// connect to DB ...
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, 
     (err) => {
       if (err) console.log("Error connection to the db");
       else console.log("Connection succeed to the db");
     });

app.use(morgan("dev")); // just to see it in the terminal..
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use('/draws', drawRoute)


app.get("/", (req, res) => {
     res.send("Server running ....");
 });


 // Error Handling

 
 app.use( (err, req, res, next)  =>{
     console.error(err.message);
     if (!err.statusCode) err.statusCode = 500;
     res.status(err.statusCode).send(err.message);
 });

 // graphQL API ...
app.use('/graphql', graphqlHTTP({
     schema,
     graphiql: true
}));

app.listen(port, () => {
     console.log(`Listen on port ${port}`);
})