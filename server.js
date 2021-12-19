// dependencies 
const express = require('express');
const fs = require('fs');
const path = require('path');

// create an express server 
const app = express();

// set route 
const PORT = process.env.PORT || 3001;

// create link to database file 
const savedNotes = require('./db/db');

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



// function to create new note 
function createNewNote (body, notesArray){
    const newNote = body;
    notesArray.push(newNote);
    
    fs.writeFileSync(
        path.join(__dirname, '../note-taker-app/db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return newNote;
};

// function to validate new note
function validateNote (note){
    if(!note.title || typeof note.title !== 'string'){
        return false;
    }
    if(!note.text || typeof note.text !== 'string'){
        return false;
    }
    return true;
};

// function to delete notes 
function deleteNote (id, notesArray){
    for (let i = 0; i < notesArray.length; i++){
        let note = notesArray[i];
        if(note.id == id){
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null ,2)
            );
            break;
        }
    }
}
// view notes 
app.get('/api/notes', (req,res) => {
    res.json(savedNotes)
});

// create new note 
app.post('/api/notes', (req,res) => {
    req.body.id = savedNotes.length.toString();
    if(!validateNote(req.body)){
        res.status(400).send('Please include all necessary information for note.')
    } else {
        const newNote = createNewNote(req.body, savedNotes)
        res.json(newNote);
    }
});

app.delete('/api/notes', (req, res) => {
    deleteNote(req.params.id, savedNotes);
    res.json(savedNotes);
})
app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}.`);
});