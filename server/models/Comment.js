const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: String,
  likes: Number,
  dislikes: Number,
  author: String,
  imgProfile: String,
  image: String,
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
