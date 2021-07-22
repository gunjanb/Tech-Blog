async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document
    .querySelector('textarea[name="comment"]')
    .value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // document.location.reload();
      // window.location.reload();
      location.href = location.href;
      // document.location.replace(`/post/${post_id}`);
      // window.location.reload();
      // const response = await fetch(`/post/${post_id}`, {
      //   method: "get",
      //   headers: { "Content-Type": "application/json" },
      // });
      // if (response.ok) {
      //   window.location.reload();
      // }
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".commentForm")
  .addEventListener("submit", commentFormHandler);
