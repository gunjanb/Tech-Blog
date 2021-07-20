const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// POST /api/comments  -create a comment
router.post("/", withAuth, async (req, res) => {
  try {
    const dbCommentData = Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/comments/id -delete comment by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbCommentData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    res.json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT /api/posts/id -update comment with id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.update(
      {
        comment_text: req.body.commentText,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!dbCommentData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
