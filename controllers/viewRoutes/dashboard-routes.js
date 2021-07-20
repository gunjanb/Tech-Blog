const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//  GET /dashboard - get all the posts by user logged in
router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "content", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    let username = req.session.username;
    username = username[0].toUpperCase() + username.slice(1).toLowerCase();
    // serialize data before passing to template
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    // render template and pass through db data
    res.render("dashboard", {
      posts,
      username: username,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /addform  - render addpost form for user
router.get("/addform", (req, res) => {
  res.render("addpost");
});

// GET /edit/id  --render a particular post in edit post form for user to edit
router.get("/edit/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "content", "title", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    //serialize the data
    const post = dbPostData.get({ plain: true });
    //pass data to template
    res.render("editpost", {
      post,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
