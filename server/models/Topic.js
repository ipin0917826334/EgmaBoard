const dynamoose = require("dynamoose");

const TopicSchema = new dynamoose.Schema({
  _id: String,
  title: String,
  description: String,
  likes: Number,
  dislikes: Number,
  author: String,
  commentCount: {
    type: Number,
    default: 0,
  },
});

const Topic = dynamoose.model("Topic", TopicSchema);
module.exports = Topic;
