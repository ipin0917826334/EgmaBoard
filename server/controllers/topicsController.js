const Topic = require('../models/Topic');
const Comment = require('../models/Comment');


exports.getTopics = async (req, res) => {
  const topics = await Topic.find().populate('posts');
  res.json(topics);
};

exports.createTopic = async (req, res) => {
  const { title, description, author, posts , vehicles, likes, dislikes, start, destination } = req.body;

  const topic = new Topic({
    title,
    description,
    author,
    posts,
    likes,
    dislikes,
    start,
    destination,
    vehicles
  });
  await topic.save();

  res.json(topic);
};

exports.getTopicById = async (req, res) => {
  const topic = await Topic.findById(req.params.id).populate('posts');
  res.json(topic);
};

exports.createComment = async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();

  const topic = await Topic.findById(req.params.id);
  topic.posts.push(comment._id);
  topic.commentCount = topic.commentCount + 1;
  await topic.save();

  res.json(comment);
};
exports.updateCommentLikesDislikes = async (req, res) => {
    const commentId = req.params.comment_id;
    const update = req.body;
  
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $set: update },
        { new: true, useFindAndModify: false }
      );
      console.log(commentId+"ss"+update);
      if (!updatedComment) {
        res.status(404).json({ message: "Comment not found." });
      } else {
        res.status(200).json(updatedComment);
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating comment." });
    }
  };
  

