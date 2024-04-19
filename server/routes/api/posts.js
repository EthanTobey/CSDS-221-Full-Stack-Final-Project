//holds routers - could be in index.js - this is just to be cleaner

const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});      //ACTUALLY referencing /api/posts b/c in index.js this is passed in on script call

//Add Post

// Delete Post

async function loadPostsCollection() {        //async await is a way of handling promises
    //pass in database link (can find on MongoDB site: https://cloud.mongodb.com/v2/6621c8f55c512424a49bfcb3#/security/database/users   )

    const client = await mongodb.MongoClient.connect('mongodb+srv://emt101:emt101@vue-express-app.xyemsje.mongodb.net/?retryWrites=true&w=majority&appName=vue-express-app', {
        useNewUrlParser: true
    });
    
    return client.db('vue-express-app').collection('posts');
}

module.exports = router;    //export the router