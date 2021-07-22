const updateCommentHandler = async (event) => {
  event.preventDefault();

  const current_user_id = document
    .querySelector("#userId")
    .getAttribute("data-id");

  if (event.target.hasAttribute("data-id")) {
    const commentData = event.target.getAttribute("data-id");
    var commentDataArr = commentData.split(",");
    var comment_user = commentDataArr[0];
    var comment_id = commentDataArr[1];
    if (current_user_id === comment_user) {
      const response = await fetch(`/comment/update/${comment_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace(`/comment/update/${comment_id}`);
      } else {
        alert("Failed to render form.");
      }
    } else {
      $("#exampleModal").modal("show");
      // alert("You cant modify comment as not owned by you.");
    }
  }
};

document.querySelectorAll(".update-btn").forEach((item) => {
  item.addEventListener("click", updateCommentHandler);
});
