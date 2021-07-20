const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// POST /api/post/    add new blogpost
router.post("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.blogtitle,
      content: req.body.blogcontent,
      user_id: req.session.user_id,
    });
    res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/posts/1  -delete a post by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    console.log(dbPostData);
    res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT /api/posts/1   -update post by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.update(
      {
        title: req.body.blogtitle,
        content: req.body.blogcontent,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
