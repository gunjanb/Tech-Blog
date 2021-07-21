async function searchFormHandler(event) {
  event.preventDefault();

  const search = document.querySelector('input[name="search-text"]').value;
  console.log("In serch js file", search);
  if (search) {
    const response = await fetch(`/search/${search}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("in js render");
      document.location.replace(`/search/${search}`);
    } else {
      console.log("in js error");
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#search-form")
  .addEventListener("submit", searchFormHandler);
