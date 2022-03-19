const router = require('express').Router();
const {
  addThought,
  getThoughtById,
  getAllThoughts,
  updateThought,
  deleteThought,
  deleteAllThoughts,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// api/thoughts
router
  .route('/')
  .post(addThought)
  .delete(deleteAllThoughts)
  .get(getAllThoughts);

// api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// api/thoughts/:thoughtId/:reactionId
router
  .route('/:thoughtId/:reactionId')
  .delete(removeReaction);

module.exports = router;