const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: [1, "Why so few thoughts?"],
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJson: {
      virtuals: true,
      getters: true,
    },
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})
