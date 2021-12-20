// dependencies 
const express = require('express');
const app = express();

// set route 
const PORT = process.env.PORT || 3003;

//parse incoming data 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const apiRoute = require('./route/apiRoute/');
const htmlRoute = require('./route/htmlRoute/');

app.use('/api', apiRoute);
app.use('/', htmlRoute);


// make public folder files readily availabile 
app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}.`);
});