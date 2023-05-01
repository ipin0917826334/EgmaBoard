const express = require('express');
const router = express.Router();
const topicsController = require('../controllers/topicsController');

router.get('/', topicsController.getTopics);
router.post('/', topicsController.createTopic);
router.get('/board', topicsController.getBoard);
router.post('/board', topicsController.createBoardTopic);
router.delete('/board/:id', topicsController.deleteBoard);
router.delete('/board/:id/:noteId', topicsController.deleteNote);
router.get('/:id', topicsController.getTopicById);
router.put('/board/:topicId/notes/:noteId',topicsController.saveNote);
router.post('/board/:topicId/notes', topicsController.addNote);
router.put('/board/:id', topicsController.updateNote);


module.exports = router;
