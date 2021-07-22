const deleteCommentHandler = async (event) => {
  event.preventDefault();

  const current_user_id = document
    .querySelector("#userId")
    .getAttribute("data-id");

  if (event.target.hasAttribute("data-id")) {
    const deleteData = event.target.getAttribute("data-id");
    var deleteDataArr = deleteData.split(",");
    var comment_user = deleteDataArr[0];
    var comment_id = deleteDataArr[1];
    if (current_user_id === comment_user) {
      const response = await fetch(`/api/comments/${comment_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.reload();
        // location.href = location.href;
      } else {
        alert("Failed to delete comment.");
      }
    } else {
      $("#exampleModal").modal("show");
      // alert("You cant delete this comment as  not owned by you");
    }
  }
};

document.querySelectorAll(".delete-btn").forEach((item) => {
  item.addEventListener("click", deleteCommentHandler);
});
