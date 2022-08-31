import refs from "./refs.js";
import scrollTo from "./scrollTo.js";
import buildTable from "./buildTable.js";
import fetchCountries from "./fetchCountries.js";
import { translateUnit } from "./translateUnit.js";
import { BASE_URL } from "./variables.js";
import { getNameFromAbbreviation } from "./getNameFromAbbreviation.js";

const {
  form,
  select,
  calcResult,
  calculatorAnchor,
  resetForm,
  howItWorksAnchor,
  faqsAnchor,
  calcMenuAnchor,
  calcWeight,
  calcHeight,
  calcWidth,
  calcLength,
  calcContentValue,
} = refs;
let directions = [];
let currentDirection = {};

async function handleSubmit(e) {
  e.preventDefault();
  calcResult.innerHTML = "";
  const data = new FormData(e.target);

  const request = Object.fromEntries(data.entries());

  console.log({ request });
  const { formDirection, weight, height, length, width, contentValue } =
    request;
  const getChosenDirection = directions.find(({ id }) => id == formDirection);
  console.log(getChosenDirection);

  const getPrices = sendData(getChosenDirection.id, weight, contentValue);

  const calcData = await Promise.resolve(getPrices);
  // console.log(calcData);
  buildTable(calcData, request, currentDirection);

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

  calcResult.classList.add("show-flex");
  calcResult.scrollIntoView({
    behavior: "smooth",
  });
}

async function sendData(direction, weight, contentValue) {
  try {
    const response = await fetch(`${BASE_URL}/public/delivery_rate/calc`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "content-Type": "application/json",
        owner: "6",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ direction, weight, contentValue }),
    });

    const json = await response.json();
    console.log(json);

    return json;
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function createList() {
  const countries = await fetchCountries(BASE_URL);
  // console.log(countries);

  directions = countries;

  for (const direction of directions) {
    const getCountry = await getNameFromAbbreviation(
      BASE_URL,
      direction.countryTo
    );
    // console.log(getCountry);
    const option = document.createElement("option");
    option.value = direction.id;
    option.textContent = `США → ${getCountry[Object.keys(getCountry)[0]]}`;
    select.appendChild(option);
  }
}

createList();

select.addEventListener("change", function () {
  select.value = this.value;
  currentDirection = directions.find(({ id }) => select.value == id);
  // console.log(currentDirection);
  currentDirection.weightUnit = translateUnit(currentDirection.weightUnit);
  currentDirection.sizeUnit = translateUnit(currentDirection.sizeUnit);

  calcWeight.placeholder =
    select.value === "" ? "Вес" : `Вес (${currentDirection.weightUnit})`;
  calcHeight.placeholder =
    select.value === "" ? "Высота" : `Высота (${currentDirection.sizeUnit})`;
  calcLength.placeholder =
    select.value === "" ? "Длина" : `Длина (${currentDirection.sizeUnit})`;
  calcWidth.placeholder =
    select.value === "" ? "Ширина" : `Ширина (${currentDirection.sizeUnit})`;
  calcContentValue.placeholder =
    select.value === ""
      ? "Стоимость"
      : `Стоимость (${currentDirection.taxFreeLimitCurrency})`;
});
form.addEventListener("submit", handleSubmit);
resetForm.addEventListener("click", function () {
  calcResult.innerHTML = "";
  form.reset();
});
calculatorAnchor.addEventListener("click", scrollTo);
howItWorksAnchor.addEventListener("click", scrollTo);
faqsAnchor.addEventListener("click", scrollTo);
calcMenuAnchor.addEventListener("click", scrollTo);
