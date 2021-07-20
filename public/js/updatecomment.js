const updateCommentHandler = async (event) => {
  event.preventDefault();

  const current_user_id = document
    .querySelector(".userId")
    .getAttribute("data-id");

  const commentText = document.querySelector('textarea[name="comment"]').value;
  const commentid = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const commentData = document
    .querySelector(".update-btn")
    .getAttribute("data-id");

  var commentDataArray = commentData.split(",");
  var comment_user = commentDataArray[0];
  var comment_postId = commentDataArray[1];
  if (current_user_id === comment_user) {
    const response = await fetch(`/api/comments/${commentid}`, {
      method: "PUT",
      body: JSON.stringify({
        commentText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      location.replace(`/post/${comment_postId}`);
    } else {
      alert("Failed to update comment.");
    }
  } else {
    alert("You cannot update comment as it not belongs to u");
  }
};

document
  .querySelector(".update-comment")
  .addEventListener("submit", updateCommentHandler);
