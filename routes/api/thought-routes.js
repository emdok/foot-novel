const router = require('express').Router();
const {
  addThought,
  getThoughtById,
  getAllThoughts,
  updateThought,
  deleteThought
} = require('../../controllers/thought-controller');

// api/thoughts
router
  .route('/')
  .post(addThought)
  .get(getAllThoughts);

// api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;