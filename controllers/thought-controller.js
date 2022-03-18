const { User, Thought } = require('../models');

const thoughtController = {
  // add a thought to a user
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

  // get a single thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  // update a single thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // remove a thought by ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;