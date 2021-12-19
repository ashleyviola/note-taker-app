const express = require('express');
const router = express.Router();
const { v4: uuidv4} = require('uuid');
const fs = require('fs');

// create link to database file 
const { notes } = require('../../db/db.json');

// view notes 
router.get('/notes', (req,res) => {    
    res.json(notes);
});

// create new note 
router.post('/notes', (req,res) => {
    const newNote = req.body;

    let data = notes;

    newNote.id = uuidv4();

    data.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify({notes: data}),null,2);
    console.log("\nSuccessfully added new note to 'db.json' file!");
    res.json(data);
});

// delete notes 
router.delete('/notes/:id', (req, res) => {
    let noteId = req.params.id.toString();

    console.log(`\n\nDELETE note request for noteId: ${noteId}`);

    let data = notes;

    const newData = data.filter(note => note.id.toString() !== noteId);

    fs.writeFileSync('./db/db.json', JSON.stringify({notes: newData}),null,2);

    console.log(`\nSuccessfully deleted note with id: ${noteId}`);

    res.json(newData);
});

module.exports = router;