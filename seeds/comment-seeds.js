const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Nice One 1",
    user_id: 1,
    post_id: 2,
  },
  {
    comment_text: "Nice One 2",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "Nice One3",
    user_id: 3,
    post_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
