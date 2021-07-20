async function newPostHandler(event) {
  event.preventDefault();

  const blogtitle = document.querySelector('input[name="post-title"]').value;
  const blogcontent = document.querySelector(
    'textarea[name="post-content"]'
  ).value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      blogtitle,
      blogcontent,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".add-post").addEventListener("submit", newPostHandler);
