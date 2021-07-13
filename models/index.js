const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

//post
//fk in comment
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

//fk in post
Post.belongsTo(User, {
  foreignKey: "user_id",
});

//User
//fk in  post
User.hasMany(Post, {
  foreignKey: "user_id",
});

//fk in comment
User.hasMany(Comment, {
  foreignKey: "user_id",
});

//comment
//fk in comment
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

//fk in comment
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post, Comment };
