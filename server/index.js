const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Midle ware ...(what does that mean...)
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');   //posts is a JS file that just contains routes & defines posts

app.use('/api/posts', posts);       //server will run on /api/posts  EX localhost:5000/api/posts

const port = process.env.PORT || 5000       //I think this means either remote port OR localHost:5000 if running on local PC

app.listen(port, () => console.log(`Server started on port ${port}`));