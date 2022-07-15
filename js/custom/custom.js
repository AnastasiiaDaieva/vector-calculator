import refs from "./refs.js";
import { showDropdown, hideDropdown } from "./dropdown.js";
import scrollTo from "./scrollTo.js";
import buildTable from "./buildTable.js";
import fetchCountries from "./fetchCountries.js";
import { weightConverter, measurementConverter } from "./converter.js";
import { BASE_URL } from "./variables.js";

const {
  form,
  select,
  currentLanguage,
  calcResult,
  calculatorAnchor,
  resetForm,
  overlay,
  howItWorksAnchor,
  faqsAnchor,
  calcMenuAnchor,
} = refs;
let deliveryOptions = [];
export let tableOptions = [];

async function handleSubmit(e) {
  e.preventDefault();
  calcResult.innerHTML = "";
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
  const arrangedData = {
    country,
    weight: weightConverter(weight, weightUnit),
    height: measurementConverter(height, measurementUnit),
    length: measurementConverter(length, measurementUnit),
    width: measurementConverter(width, measurementUnit),
    weightUnit,
  };
  // console.log("converted and passed", arrangedData.weight);
  const dataSets = rates.map((rate) => {
    const newData = { ...arrangedData, rate: rate };
    return newData;
  });
  // console.log(dataSets);
  const getPrices = dataSets.map((item) =>
    sendData(item)
      .then((response) => {
        // console.log(response);
        let result;
        if (!response.message) {
          result = {
            price: response.price,
            weightType: response.withDimensions,
          };
        } else {
          result = {
            maxWeight: response.data.maxWeight,
            weightType: response.data.withDimensions,
          };
        }
        return result;
      })
      .catch((error) => {
        console.log("ERROR", error);
      })
  );
  const resolve = await Promise.all(getPrices);
  buildTable(deliveryOptions, resolve, country, arrangedData);
  document
    .querySelector(".withDimensionsNotification")
    .addEventListener("mouseover", function () {
      document.querySelector(".weightPrompt").classList.remove("displayNone");
    });
  document
    .querySelector(".withDimensionsNotification")
    .addEventListener("mouseout", function () {
      document.querySelector(".weightPrompt").classList.add("displayNone");
    });
  calcResult.classList.add("show-flex");
  calcResult.scrollIntoView({
    behavior: "smooth",
  });
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

    const json = await response.json();

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
});
form.addEventListener("submit", handleSubmit);
currentLanguage.addEventListener("mouseover", showDropdown);
currentLanguage.addEventListener("blur", hideDropdown);
document
  .querySelector(".languages-dropdown")
  .addEventListener("mouseout", hideDropdown);
overlay.addEventListener("click", hideDropdown);
resetForm.addEventListener("click", function () {
  calcResult.innerHTML = "";
  tableOptions = [];
  form.reset();
});
calculatorAnchor.addEventListener("click", scrollTo);
howItWorksAnchor.addEventListener("click", scrollTo);
faqsAnchor.addEventListener("click", scrollTo);
calcMenuAnchor.addEventListener("click", scrollTo);
