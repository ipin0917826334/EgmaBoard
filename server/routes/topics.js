const express = require('express');
const router = express.Router();
const topicsController = require('../controllers/topicsController');

router.get('/', topicsController.getTopics);
router.post('/', topicsController.createTopic);
router.get('/:id', topicsController.getTopicById);
router.post('/:id/posts', topicsController.createComment);
router.put('/comments/:comment_id', topicsController.updateCommentLikesDislikes);

module.exports = router;
