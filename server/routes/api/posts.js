//holds routers - could be in index.js - this is just to be cleaner

const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts      - defining request sent on backend
router.get('/', async (req, res) => {                //  '/' is ACTUALLY referencing /api/posts b/c in index.js this is passed in on script call
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});      

//Add Post    - defining request sent on backend
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();   //send status 201 that all is well and post was created - //recall 200's level is good stuff
});

// Delete Post  - defining request sent on backend  
router.delete('/:id', async (req, res) => {             //  /:id  the route of the id of the post we want to delete
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection() {        //async await is a way of handling promises
    //pass in database link (can find on MongoDB site: https://cloud.mongodb.com/v2/6621c8f55c512424a49bfcb3#/security/database/users   )

    const client = await mongodb.MongoClient.connect('mongodb+srv://emt101:emt101@vue-express-app.xyemsje.mongodb.net/?retryWrites=true&w=majority&appName=vue-express-app', {
        useNewUrlParser: true
    });
    
    return client.db('vue-express-app').collection('posts');
}

module.exports = router;    //export the router