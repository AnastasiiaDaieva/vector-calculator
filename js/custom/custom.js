import refs from "./refs.js";
import scrollTo from "./scrollTo.js";
import buildTableNew from "./buildTableNew.js";
import fetchCountries from "./fetchCountries.js";
import { translateUnit } from "./translateUnit.js";
import { BASE_WITH_API } from "./variables.js";
import { getColor } from "./getColor.js";
import { getNameFromAbbreviation } from "./getNameFromAbbreviation.js";
import sendData from "./sendData.js";
import { setLocale, translateByKey } from "./translation.js";
import { getCurrencySymbol } from "./getCurrencySymbol.js";

const {
  form,
  select,
  calcResult,
  resetForm,
  sizeLabels,
  labelWeight,
  labelValue,
} = refs;

let directions = [];
let currentDirection;
console.log("curr", currentDirection);

const params = new URLSearchParams(window.location.search);
const languageParam = params.get("lang") || "uk";
const ownerParam = params.get("owner") || 6;
// const signUpLink = params.get("");

const parent = window.parent;
function sendHeight() {
  parent.postMessage(window.document.body.clientHeight, "*");
}

async function handleSubmit(e) {
  e.preventDefault();
  calcResult.innerHTML = "";
  const data = new FormData(e.target);

  const request = Object.fromEntries(data.entries());

  // console.log({ request });
  const { formDirection } = request;
  const getChosenDirection = directions.find(({ id }) => id == formDirection);
  // console.log(getChosenDirection);

  const getPrices = sendData(request, ownerParam);

  const { rates: calcData } = await Promise.resolve(getPrices);
  console.log("custom calcData", calcData);
  const getCountryName = await getNameFromAbbreviation(
    BASE_WITH_API,
    currentDirection.countryTo,
    languageParam
  );

  const currencySymbol = await getCurrencySymbol(
    BASE_WITH_API,
    currentDirection.serviceCurrency
  );
  console.log(currencySymbol);

  buildTableNew(
    calcData,
    request,
    currencySymbol[Object.keys(currencySymbol)[0]],
    getCountryName,
    languageParam
  );

  const weightPromptContainers = document.querySelectorAll(
    ".weightPromptContainer"
  );
  weightPromptContainers.forEach((container) => {
    container.addEventListener("mouseover", function () {
      container.querySelector(".weightPrompt").classList.remove("displayNone");
    });
    container.addEventListener("mouseout", function () {
      container.querySelector(".weightPrompt").classList.add("displayNone");
    });
  });

  const pricePromptCcontainers = document.querySelectorAll(".promptContainer");
  if (pricePromptCcontainers)
    pricePromptCcontainers.forEach((container) => {
      container.addEventListener("mouseover", function () {
        container.querySelector(".pricePrompt").classList.remove("displayNone");
        sendHeight();
      });
      container.addEventListener("mouseout", function () {
        container.querySelector(".pricePrompt").classList.add("displayNone");
        sendHeight();
      });
    });

  setLocale(ownerParam, languageParam);

  calcResult.classList.add("show-flex");
  sendHeight();

  calcResult.scrollIntoView({
    behavior: "smooth",
  });
}

document.addEventListener("change", function () {
  console.log(currentDirection);
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
  const countries = await fetchCountries(BASE_WITH_API, ownerParam);
  directions = countries;

  if (directions.length > 1) {
    const option = document.createElement("option");
    option.value = "";
    option.setAttribute("localization-key", "calculator_receiver_placeholder");
    option.textContent = translateByKey("calculator_receiver_placeholder");
    select.appendChild(option);
    currentDirection = {};
  } else if (directions.length === 1) {
    currentDirection = countries[0];
    console.log(labelValue);
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

  for (const direction of directions) {
    const getCountry = await getNameFromAbbreviation(
      BASE_WITH_API,
      direction.countryTo,
      languageParam
    );
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
  currentDirection.weightUnit = translateUnit(currentDirection.weightUnit);
  currentDirection.sizeUnit = translateUnit(currentDirection.sizeUnit);
});

form.addEventListener("submit", handleSubmit);

resetForm.addEventListener("click", function () {
  calcResult.innerHTML = "";
  form.reset();
});

getColor(ownerParam, "shipment");

document.addEventListener("DOMContentLoaded", () => {
  setLocale(ownerParam, languageParam);
});

sendHeight();
