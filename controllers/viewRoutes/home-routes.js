const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const { Op } = require("sequelize");

// when app runs home page displays all blog posts
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
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
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("homepost", {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /login  -- render login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// GET /signup -- render signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

//GET /post/id --render single post by id along with comments  asssociated with it
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "content", "created_at"],
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
          attributes: ["id", "name"],
        },
      ],
    });

    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    // serialize the data
    const post = dbPostData.get({ plain: true });
    // pass data to template
    res.render("singlepost", {
      post,
      currentuser: req.session.user_id,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET /comment/update/id --render update form for comment
router.get("/comment/update/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "comment_text", "user_id", "post_id"],
    });

    if (!dbCommentData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    // serialize the data
    const commentData = dbCommentData.get({ plain: true });
    // pass data to template
    res.render("updatecomment", {
      commentData,
      currentuser: req.session.user_id,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /search/search-text -- render the page with serach content
router.get("/search/:searchtext", async (req, res) => {
  try {
    console.log("In sercah route", req.params.searchtext);
    const dbSearchData = await Post.findAll({
      // limit: 5,
      where: {
        content: {
          [Op.like]: "%" + req.params.searchtext + "%",
        },
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
    if (!dbSearchData) {
      res
        .status(404)
        .json({ message: "No post found with this search criteria" });
      return;
    }
    const posts = dbSearchData.map((post) => post.get({ plain: true }));
    res.render("homepost", { posts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
