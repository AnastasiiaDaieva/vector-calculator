const form = document.querySelector("#js-form");
console.log(form);
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  console.log(e.target.elements);
  const data = new FormData(e.target);

  const request = Object.fromEntries(data.entries());

  console.log({ request });
}

const BASE_URL = "https://restcountries.com/v3.1";
function fetchCountries() {
  return fetch(`${BASE_URL}/all`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error(err));
}

fetchCountries().then((data) => {
  console.log(data);
});
