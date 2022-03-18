const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  addFriend,
  deleteUser
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:id/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .put(addFriend);

module.exports = router;