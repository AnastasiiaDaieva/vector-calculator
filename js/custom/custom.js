import refs from "./refs.js";
import { showDropdown, hideDropdown } from "./dropdown.js";
import scrollTo from "./scrollTo.js";
import buildTable from "./buildTable.js";
import fetchCountries from "./fetchCountries.js";
import { weightConverter, measurementConverter } from "./converter.js";
import { translateUnit } from "./translateUnit.js";
import { BASE_URL } from "./variables.js";
import { getNameFromAbbreviation } from "./getNameFromAbbreviation.js";

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
  calcWeight,
  calcHeight,
  calcWidth,
  calcLength,
} = refs;
let deliveryOptions = [];
export let tableOptions = [];
let currentOption = {};

async function handleSubmit(e) {
  e.preventDefault();
  calcResult.innerHTML = "";
  tableOptions = [];
  const data = new FormData(e.target);

  const request = Object.fromEntries(data.entries());

  console.log({ request });
  const { country, weight, height, length, width } = request;
  const getList = deliveryOptions.find((item) => item.countryTo === country);
  const rates = getList.deliveryTypes.map(({ rate }) => rate.id);
  const arrangedData = {
    country,
    weight,
    height,
    length,
    width,
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
            resultWeight: response.data.resultWeight,
          };
        }
        return result;
      })
      .catch((error) => {
        console.log("ERROR", error);
      })
  );
  const resolve = await Promise.all(getPrices);
  buildTable(
    deliveryOptions,
    resolve,
    country,
    arrangedData,
    currentOption.weightUnit,
    currentOption.sizeUnit
  );
  const findTrueWeightType = resolve.some((item) => item.weightType === true);
  if (findTrueWeightType) {
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
  }

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
  console.log(countries);

  deliveryOptions = countries;
  // console.log("options", deliveryOptions);
  for (const country of countries) {
    const getCountry = await getNameFromAbbreviation(
      BASE_URL,
      country.countryTo
    );
    // console.log(getCountry);
    const option = document.createElement("option");
    option.value = country.countryTo;
    option.textContent = `США → ${getCountry[Object.keys(getCountry)[0]]}`;
    select.appendChild(option);
  }
}

createList();

select.addEventListener("change", function () {
  select.value = this.value;
  currentOption = deliveryOptions.find(
    ({ countryTo }) => select.value === countryTo
  );
  currentOption.weightUnit = translateUnit(currentOption.weightUnit);
  currentOption.sizeUnit = translateUnit(currentOption.sizeUnit);

  calcWeight.placeholder =
    select.value === ""
      ? "Вес посылки"
      : `Вес посылки (${currentOption.weightUnit})`;
  calcHeight.placeholder =
    select.value === "" ? "Высота" : `Высота (${currentOption.sizeUnit})`;
  calcLength.placeholder =
    select.value === "" ? "Длина" : `Длина (${currentOption.sizeUnit})`;
  calcWidth.placeholder =
    select.value === "" ? "Ширина" : `Ширина (${currentOption.sizeUnit})`;
});
form.addEventListener("submit", handleSubmit);
// currentLanguage.addEventListener("mouseover", showDropdown);
// currentLanguage.addEventListener("blur", hideDropdown);
// currentLanguage.addEventListener("mouseout", hideDropdown);
// overlay.addEventListener("mouseover", hideDropdown);

// overlay.addEventListener("click", hideDropdown);
resetForm.addEventListener("click", function () {
  calcResult.innerHTML = "";
  tableOptions = [];
  form.reset();
});
calculatorAnchor.addEventListener("click", scrollTo);
howItWorksAnchor.addEventListener("click", scrollTo);
faqsAnchor.addEventListener("click", scrollTo);
calcMenuAnchor.addEventListener("click", scrollTo);
