import refs from "./refs.js";
import { showDropdown, hideDropdown } from "./dropdown.js";
import scrollToCalculator from "./scrollToCalculator.js";
import buildTable from "./buildTable.js";
import fetchCountries from "./fetchCountries.js";
import { BASE_URL } from "./variables.js";
import addPrices from "./addPrices.js";

const { form, select, currentLanguage, table, calculatorAnchor } = refs;
let deliveryOptions = [];
export let tableOptions = [];

function handleSubmit(e) {
  e.preventDefault();
  document.querySelector(".tableBody").innerHTML = "";
  tableOptions = [];
  const data = new FormData(e.target);

  const request = Object.fromEntries(data.entries());

  // console.log({ request });
  const {
    country,
    weight,
    weightUnit,
    height,
    length,
    width,
    measurementUnit,
  } = request;
  const getList = deliveryOptions.find((item) => item.countryTo === country);
  const rates = getList.deliveryTypes.map(({ rate }) => rate.id);
  const arrangedData = { country, weight, height, length, width };
  const dataSets = rates.map((rate) => {
    const newData = { ...arrangedData, rate: rate };
    return newData;
  });
  // console.log(dataSets);
  let prices = [];
  const getPrices = dataSets.map((item) =>
    sendData(item).then((response) => {
      console.log("resp", response);
      const result = response.price || response.message;
      return result;
    })
  );

  console.log("prices", getPrices);
  buildTable(deliveryOptions, getPrices, country);
  table.classList.add("show-table");
}

async function sendData(data) {
  try {
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
    // const notification = `<div>Максимально допустимый вес - 30 кг</div>`;
    // console.log(notification);

    // if (response.status === 500) {
    //   controllers.insertAdjacentElement("beforestart", notification);
    //   return;
    // }
    const json = await response.json();
    // console.log("weight", data.weight);

    console.log(json);

    return json;
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function createList() {
  const countries = await fetchCountries(BASE_URL);
  // console.log(countries);
  deliveryOptions = countries;
  // console.log("options", deliveryOptions);
  for (const country of countries) {
    const option = document.createElement("option");
    option.value = country.countryTo;
    option.innerText = country.countryTo;
    select.appendChild(option);
  }
}

createList();

select.addEventListener("change", function () {
  select.value = this.value;

  // console.log("You selected: ", select.value);
});
form.addEventListener("submit", handleSubmit);
currentLanguage.addEventListener("mouseover", showDropdown);
currentLanguage.addEventListener("blur", hideDropdown);
calculatorAnchor.addEventListener("click", scrollToCalculator);
