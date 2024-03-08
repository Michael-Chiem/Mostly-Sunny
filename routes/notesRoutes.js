const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dbFilePath = path.join(__dirname, '../db/db.json'); 

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/api/notes', (req, res) => {
    const jsonData = fs.readFileSync(dbFilePath, 'utf8');
    const notes = JSON.parse(jsonData);
    res.json(notes);
});

router.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: Math.floor(Math.random() * 10000),
    }

    const jsonData = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');

    const notes = JSON.parse(jsonData);

    notes.push(newNote);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));

    res.json(newNote);
});

router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    console.log(noteId)


    const jsonData = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    let notes = JSON.parse(jsonData);
    notes = notes.filter(n => n.id != noteId);


    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));

    res.json("successfully deleted note");
});

module.exports = router;
