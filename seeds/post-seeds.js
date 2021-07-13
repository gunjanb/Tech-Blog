const { Post } = require("../models");

const postData = [
  {
    title: "Why MVC is so important",
    content:
      "MVC allows developers to maintain a true seperation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic",
    user_id: 1,
  },
  {
    title: "Autentication Vs Authorization",
    content:
      "There is a difference between authentication and authorization. Authentication means confirming your own identitiy, whereas authorization means being allowed access to the system",
    user_id: 2,
  },
  {
    title: "Object-Relational Mapping",
    content:
      "I have really loved learning about ORMs.Its really simplified the way I create queries in SQL",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
