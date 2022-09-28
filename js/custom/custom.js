import refs from "./refs.js";
import scrollTo from "./scrollTo.js";
import buildTable from "./buildTable.js";
import buildTableNew from "./buildTableNew.js";
import fetchCountries from "./fetchCountries.js";
import { translateUnit } from "./translateUnit.js";
import { BASE_URL } from "./variables.js";
import { getColor } from "./getColor.js";
import { getNameFromAbbreviation } from "./getNameFromAbbreviation.js";
import sendData from "./sendData.js";
import { setLocale, translateByKey } from "./translation.js";

const {
  form,
  select,
  calcResult,
  resetForm,
  sizeLabels,
  currentLanguage,
  labelWeight,
  labelValue,
  html,
  headerBody,
  collapsableMenu,
  menuLinks,
} = refs;
let directions = [];
let currentDirection;

console.log("parent", window.parent.location);
console.log("window location", window.location);
const params = new URLSearchParams(window.location.search);
const languageParam = params.get("lang") || "uk";
const ownerParam = params.get("owner") || "6";

async function handleSubmit(e) {
  e.preventDefault();
  calcResult.innerHTML = "";
  const data = new FormData(e.target);

  const request = Object.fromEntries(data.entries());

  console.log({ request });
  const { formDirection } = request;
  const getChosenDirection = directions.find(({ id }) => id == formDirection);
  console.log(getChosenDirection);

  const getPrices = sendData(request);

  const calcData = await Promise.resolve(getPrices);
  // console.log(calcData);
  const getCountryName = await getNameFromAbbreviation(
    BASE_URL,
    currentDirection.countryTo,
    languageParam
  );
  buildTableNew(calcData, request, currentDirection, getCountryName);

  if (calcData.withDimensions) {
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

  if (calcData.brokerFeeValue) {
    console.log(
      "adding event listener",
      document.querySelector(".priceNotification")
    );
    const containers = document.querySelectorAll(".promptContainer");

    containers.forEach((container) => {
      container.addEventListener("mouseover", function () {
        container.querySelector(".pricePrompt").classList.remove("displayNone");
      });
      container.addEventListener("mouseout", function () {
        container.querySelector(".pricePrompt").classList.add("displayNone");
      });
    });
  }

  setLocale(ownerParam, languageParam);

  calcResult.classList.add("show-flex");
  calcResult.scrollIntoView({
    behavior: "smooth",
  });
}

document.addEventListener("change", function () {
  labelWeight.textContent = currentDirection
    ? translateUnit(currentDirection.weightUnit).toLowerCase()
    : "";
  labelValue.textContent = currentDirection
    ? currentDirection.serviceCurrency
    : "";

  sizeLabels.forEach(
    (label) =>
      (label.textContent = currentDirection
        ? translateUnit(currentDirection.sizeUnit.toLowerCase())
        : "")
  );
});

async function createList() {
  const countries = await fetchCountries(BASE_URL);
  directions = countries;

  if (directions.length > 1) {
    const option = document.createElement("option");
    option.value = "";
    option.setAttribute("localization-key", "calculator_receiver_placeholder");
    option.textContent = translateByKey("calculator_receiver_placeholder");
    select.appendChild(option);
    currentDirection = {};
  } else if (directions.length === 1) {
    console.log(countries);

    currentDirection = countries[0];
    labelWeight.textContent = translateUnit(
      currentDirection.weightUnit
    ).toLowerCase();
    labelValue.textContent = currentDirection.serviceCurrency;

    sizeLabels.forEach(
      (label) =>
        (label.textContent = translateUnit(
          currentDirection.sizeUnit.toLowerCase()
        ))
    );
  }
  console.log(select);

  for (const direction of directions) {
    const getCountry = await getNameFromAbbreviation(
      BASE_URL,
      direction.countryTo,
      languageParam
    );
    // console.log(getCountry);
    const option = document.createElement("option");
    option.value = direction.id;
    option.textContent = getCountry[Object.keys(getCountry)[0]];
    select.appendChild(option);
  }
}

createList();

select.addEventListener("change", function () {
  select.value = this.value;
  currentDirection = directions.find(({ id }) => select.value == id);
  console.log(currentDirection);
  currentDirection.weightUnit = translateUnit(currentDirection.weightUnit);
  currentDirection.sizeUnit = translateUnit(currentDirection.sizeUnit);
});

form.addEventListener("submit", handleSubmit);

resetForm.addEventListener("click", function () {
  calcResult.innerHTML = "";
  form.reset();
});

getColor(ownerParam, "main");

document.addEventListener("DOMContentLoaded", () => {
  setLocale(ownerParam, languageParam);
});
