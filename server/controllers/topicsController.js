const Topic = require('../models/Topic');
const Board = require('../models/Board');
const { v4: uuidv4 } = require('uuid');
const myUuid = uuidv4();

exports.getTopics = async (req, res) => {
  const topics = await Topic.scan().exec();
  res.json(topics);
};
exports.getBoard = async (req, res) => {
  const boards = await Board.scan().exec();
  res.json(boards);
  console.log(boards);
};

exports.createTopic = async (req, res) => {
  const { title, description, author, posts, likes, dislikes } = req.body;

  const topic = new Topic({
    _id: uuidv4(),
    title,
    description,
    author,
    likes,
    dislikes
  });
  await topic.save();

  res.json(topic);
};

exports.createBoardTopic = async (req, res) => {
  const newBoard = new Board(req.body);
  await newBoard.save();
  res.json(newBoard);
};

exports.getTopicById = async (req, res) => {
  const topic = await Topic.get(req.params.id);
  res.json(topic);
};

exports.updateNote = async (req, res) => {
  console.log(req.body.notes);
  const updatedTopic = await Board.update({ _id:req.params.id }, { notes: req.body.notes });
  console.log(req.params.id);
  res.json(updatedTopic);
};
exports.saveNote = async (req, res) => {
  try {
    console.log("SUS11")
    const { topicId, noteId, } = req.params;
    const content = req.body;
    console.log(content);

    const board = await Board.findById(topicId);
    if (!board) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    const noteIndex = board.notes.findIndex((note) => note.id == noteId);
    if (noteIndex === -1) {
      return res.status(404).json({ message: 'Note not found' });
    }
    board.notes[noteIndex] = noteToSave;
    await board.save();

    res.json(board.notes[noteIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.deleteBoard = async (req, res) => {
  await Board.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
exports.addNote = async (req, res) => {
  try {
    const { topicId } = req.params;
    const newNote = req.body;

    if (!newNote.content || !newNote.type) {
      return res.status(400).json({ message: 'Content and type are required' });
    }

    const board = await Board.get(topicId);
    if (!board) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    const noteId = board.notes.length + 1;
    newNote.id = noteId;
    board.notes.push(newNote);
    await board.save();

    res.json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// exports.deleteNote = async (req, res) => {
//   const topic = await Board.findById(req.params.id);
//   topic.notes = topic.notes.filter((note) => note.id !== req.params.noteId);
//   await newBoard.notes.findByIdAndDelete(req.params.noteId);
//   res.sendStatus(204);
// };

exports.deleteNote = async (req, res) => {
  try {
    // Find the topic by its ID
    const topic = await Board.findById(req.params.id);

    // Filter the notes to remove the specific note using its ID
    topic.notes = topic.notes.filter((note) => note._id.toString() !== req.params.noteId);

    // Save the updated topic to the database
    await topic.save();

    // Send a success status
    res.sendStatus(204);
  } catch (error) {
    // Handle any errors and send a proper response
    console.error("Error deleting note:", error);
    res.status(500).send("Error deleting note");
  }
};