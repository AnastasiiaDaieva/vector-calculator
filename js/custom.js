import refs from "./refs.js";

const { form, select, tableHead, dropdownList, currentLanguage, table } = refs;
console.log(tableHead);
let deliveryOptions = [];
let tableOptions = [];
let chosenCountry = "";
console.log(chosenCountry);
form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  document.querySelector("tbody")?.remove();
  console.log(e.target.elements);
  const data = new FormData(e.target);

  const request = Object.fromEntries(data.entries());

  console.log({ request });
  const {
    country,
    weight,
    weightUnit,
    height,
    length,
    width,
    measurementUnit,
  } = request;
  const arrangedData = { country, weight, rate: 1 };
  chosenCountry = country;
  const price = await sendData(arrangedData);
  console.log(price);
  buildTable(deliveryOptions, price);
  table.classList.add("show-table");
}

async function sendData(data) {
  const response = await fetch(`${BASE_URL}/public/delivery_rate/calc`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "content-Type": "application/json",
      owner: "5",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  const json = await response.json();
  console.log(json);

  return json;
}

const BASE_URL = "https://logistic.ndv.net.ua/api";
function fetchCountries() {
  const options = {
    headers: new Headers({ "content-type": "application/json", owner: "5" }),
  };
  return fetch(`${BASE_URL}/public/directions`, options)
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
  deliveryOptions = countries;
  console.log("options", deliveryOptions);
  for (const country of countries) {
    const option = document.createElement("option");
    option.value = country.countryTo;
    option.innerText = country.countryTo;
    select.appendChild(option);
  }
}

function buildTable(deliveryOptions, deliveryPrice) {
  const getList = deliveryOptions.find(
    (item) => item.countryTo === chosenCountry
  );
  console.log("list", getList);
  getList.deliveryTypes.map(({ title, deliveryTime }) =>
    tableOptions.push({ title, deliveryTime })
  );
  const body = document.createElement("tbody");

  const items = tableOptions.map((option) => {
    const row = document.createElement("tr");
    const { title, deliveryTime } = option;
    const method = document.createElement("td");
    const time = document.createElement("td");
    const price = document.createElement("td");
    method.innerText = title;
    time.innerText = deliveryTime;
    price.innerText = deliveryPrice.price;
    row.appendChild(method);
    row.appendChild(time);
    row.appendChild(price);

    body.appendChild(row);
    console.log(body);
    return row;
  });

  tableHead.append(...items);
}

createList();
select.addEventListener("change", function () {
  select.value = this.value;

  console.log("You selected: ", select.value);
});

currentLanguage.addEventListener("mouseover", showDropdown);
currentLanguage.addEventListener("blur", hideDropdown);

function showDropdown() {
  dropdownList.classList.add("show");
}
function hideDropdown() {
  dropdownList.classList.remove("show");
}
