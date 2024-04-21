const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Midle ware ...(what does that mean...)
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');   //posts is a JS file that just contains routes & defines posts

app.use('/api/posts', posts);       //server will run on /api/posts  EX localhost:5000/api/posts

//Handle Production
if(process.env.NODE_ENV === 'production') {
    //Set static folder (where the app is being loaded from)
    app.use(express.static(__dirname + '/public/'));

    //Handle SPA - for different page redirects b/c this is SPA so there is only really one page
        //NOTE: this must be below the const posts declaration and app.use
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));  //for any route, go to index.html
}

const port = process.env.PORT || 5000       //I think this means either remote port OR localHost:5000 if running on local PC

app.listen(port, () => console.log(`Server started on port ${port}`));