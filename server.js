// dependencies 
const express = require('express');

// create an express server 
const app = express();

// set route 
const PORT = process.env.PORT || 3001;

const notes = require('./db/db.json');

app.get('/notes', (req,res) => {
    res.json(notes)
})

app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}.`);
});