// Create web server that can accept incoming HTTP requests and return a response
// 1. Initialize the project directory as a Node.js project and create package.json
// 2. Create a web server using Express.js framework
// 3. Create a route for GET /comments that returns all the comments from the database
// 4. Create a route for POST /comments that allows users to add new comments to the database
// 5. Create a route for GET /comments/:id that returns a single comment from the database
// 6. Create a route for PUT /comments/:id that allows users to update an existing comment in the database
// 7. Create a route for DELETE /comments/:id that allows users to delete an existing comment from the database
// 8. Create a route for GET /comments?postId=xxx that returns all the comments for a single post

// 1. Initialize the project directory as a Node.js project and create package.json
// npm init
// npm install express --save
// npm install body-parser --save
// npm install mongoose --save
// npm install nodemon --save-dev

// 2. Create a web server using Express.js framework
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const Post = require('./models/post');
const app = express();

// 3. Create a route for GET /comments that returns all the comments from the database
app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(comments);
    }
  });
});

// 4. Create a route for POST /comments that allows users to add new comments to the database
app.post('/comments', (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(comment);
    }
  });
});

// 5. Create a route for GET /comments/:id that returns a single comment from the database
app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else if (!comment) {
      res.status(404).send('Comment not found');
    } else {
      res.status(200).json(comment);
    }
  });
});