// dependencies 
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4} = require('uuid');
// create an express server 
const app = express();

// set route 
const PORT = process.env.PORT || 3001;

// create link to database file 
const { notes } = require('./db/db');

//parse incoming data 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// make public folder files readily availabile 
app.use(express.static('public'));

// launch index.html 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// launch notes.html 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// view notes 
app.get('/api/notes', (req,res) => {    
    res.json(notes);
});


// // create new note 
app.post('/api/notes', (req,res) => {
    const newNote = req.body;

    let data = notes;

    newNote.id = uuidv4();

    data.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify({notes: data}),null,2);
    console.log("\nSuccessfully added new note to 'db.json' file!");
    res.json(data);
});


app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}.`);
});