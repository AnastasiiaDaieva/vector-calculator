import refs from "./refs.js";

const { form, select } = refs;

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
        console.log(response);
        return response.json();
      }
    })
    .catch((err) => console.error(err));
}

async function createList() {
  const countries = await fetchCountries();
  console.log(countries);

  for (const country of countries) {
    const option = document.createElement("option");
    option.value = country.cca2;
    option.innerText = country.translations.rus.common;
    select.appendChild(option);
  }
}

createList();
select.addEventListener("change", function () {
  select.value = this.value;
  console.log("You selected: ", select.value);
});

const dropdownList = document.querySelector(".languages-dropdown");
const currentLanguage = document.querySelector(".current-language");

currentLanguage.addEventListener("mouseover", showDropdown);
currentLanguage.addEventListener("blur", hideDropdown);

function showDropdown() {
  dropdownList.classList.add("show");
}
function hideDropdown() {
  dropdownList.classList.remove("show");
}
