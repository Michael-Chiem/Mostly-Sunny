// server.js
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;

const notesRoutes = require('./routes/notesRoutes');
const indexRoutes = require('./routes/indexRoutes');

const publicPath = path.join(__dirname, 'public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.use('/', indexRoutes);
app.use('/', notesRoutes);

app.listen(PORT, () =>
    console.log(`Listening for requests on port ${PORT}! 🏎️`)
);
