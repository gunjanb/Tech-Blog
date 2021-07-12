const { Post } = require("../models");

const postData = [
  {
    title: "Blog1",
    content: "My first blog",
    user_id: 1,
  },
  {
    title: "Blog2",
    content: "My 2nd blog",
    user_id: 2,
  },
  {
    title: "Blog3",
    content: "My 3rd blog",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
