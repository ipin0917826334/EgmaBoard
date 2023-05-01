const dynamoose = require("dynamoose");

const BoardSchema = new dynamoose.Schema({
  _id: String,
  name: String,
  notes: {
    type: Array,
    schema: {
      _id: String,
      date: Number,
      content: String,
      type: String,
    },
  },
});

const Topic = dynamoose.model('Board', BoardSchema);

module.exports = Topic;