require('dotenv').config();

const port = process.env.PORT || 3000;
const express = require('express');
const socket = require('socket.io');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const app = new express();

require('./models/chat.model');

// ROUTES


// Middleware
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json

const expressServer = app.listen(port, () => console.log('Server is running on port ' + port));
const io = socket(expressServer);

const Home = require('./routes/Home');
Home(app, io);