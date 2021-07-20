async function editPostHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const blogtitle = document.querySelector('input[name="post-title"]').value;
  const blogcontent = document.querySelector(
    'textarea[name="post-content"]'
  ).value;

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      blogtitle,
      blogcontent,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-post")
  .addEventListener("submit", editPostHandler);
