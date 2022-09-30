import refs from "./refs.js";
import scrollTo from "./scrollTo.js";
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
  labelWeight,
  labelValue,
} = refs;

let directions = [];
let currentDirection;

const params = new URLSearchParams(window.location.search);
const languageParam = params.get("lang") || "uk";
const ownerParam = params.get("owner") || "6";
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

  const calcData = await Promise.resolve(getPrices);
  // console.log(calcData);
  const getCountryName = await getNameFromAbbreviation(
    BASE_URL,
    currentDirection.countryTo,
    languageParam
  );
  buildTableNew(
    calcData,
    request,
    currentDirection,
    getCountryName,
    languageParam
  );

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
  sendHeight();

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

  for (const direction of directions) {
    const getCountry = await getNameFromAbbreviation(
      BASE_URL,
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
const calcInputs = document.querySelectorAll(".calc-input ");
calcInputs.forEach((input) =>
  input.addEventListener("click", function () {
    document.querySelector(".shipment").scrollIntoView({
      behavior: "smooth",
    });
  })
);

sendHeight();
