import refs from "./refs.js";
import getDaysEnding from "./getDaysEnding.js";
import { BASE_URL } from "./variables.js";
import { getNameFromAbbreviation } from "./getNameFromAbbreviation.js";

const { calcResult } = refs;

export default function buildTable(
  calcData,
  formData,
  currentDirection,
  countryName
) {
  console.log("calcData", calcData);
  console.log("formData", formData);
  console.log("currentDirection", currentDirection);

  const heading = document.createElement("h2");
  heading.classList.add(
    "font-weight-bold",
    "text-7",
    "line-height-2",
    "text-color-dark",
    "result-heading"
  );
  heading.textContent = "Варианты доставки";

  const passage = document.createElement("p");

  passage.classList.add("passageOptions");

  passage.textContent = `Направление: США - ${
    countryName[Object.keys(countryName)[0]]
  }. Вес - ${calcData.resultWeight} ${calcData.weightUnit}.`;
  const resultCont = document.createElement("div");
  resultCont.classList.add("result-container");
  console.log("wd", calcData.withDimensions);
  if (calcData.withDimensions === true) {
    const brackets = document.createElement("span");
    brackets.textContent = " (объёмный)";
    const iconWeightType = document.createElement("img");
    iconWeightType.classList.add("withDimensionsNotification");

    iconWeightType.setAttribute("src", "img/icons/question-mark.svg");
    iconWeightType.setAttribute("alt", "prompt");
    iconWeightType.setAttribute("height", "10px");
    iconWeightType.setAttribute("width", "10px");

    const prompt = document.createElement("span");
    prompt.classList.add("weightPrompt", "displayNone");
    prompt.textContent = "Вес посчитан на основе габаритов посылки.";

    passage.append(brackets, iconWeightType, prompt);
  } else {
    console.log(calcData.withDimensions);
  }

  const contentValueText = document.createElement("p");
  contentValueText.textContent = `Стоимость содержимого - ${formData.contentValue} ${currentDirection.serviceCurrency}.`;

  passage.append(contentValueText);

  const items = calcData.rates.map((option) => {
    const { title, deliveryTime, price, maxWeight, logoUrl } = option;
    // console.log("opt", option);

    const tableOption = document.createElement("div");
    const imgCont = document.createElement("div");
    const img = document.createElement("img");
    const infoCont = document.createElement("div");

    const method = document.createElement("h4");

    const titleText = title;
    const imgSrc = logoUrl
      ? `https://logistic.ndv.net.ua/${logoUrl}`
      : "./img/logos/up-logo.png";
    img.setAttribute("src", imgSrc);
    img.setAttribute("alt", titleText);

    tableOption.classList.add("result-option");
    imgCont.classList.add(
      "feature-box-icon",
      "custom-feature-box-icon-size-1",
      "top-0"
    );
    img.classList.add("icon-globe", "icons", "position-relative", "info-img");
    infoCont.classList.add("feature-box-info", "mb-5");
    method.classList.add(
      "font-weight-bold",
      "line-height-1",
      "custom-font-size-1",
      "mb-1"
    );

    method.textContent = titleText;
    imgCont.appendChild(img);
    infoCont.appendChild(method);

    if (!price) {
      const notificationEl = document.createElement("span");

      notificationEl.classList.add("result-notification");

      notificationEl.textContent = `Максимально допустимый вес - ${maxWeight} ${calcData.weightUnit}.`;
      infoCont.appendChild(notificationEl);
    } else {
      const time = document.createElement("p");
      const timeStatic = document.createElement("span");
      const timeDynamic = document.createElement("span");

      const priceEl = document.createElement("p");
      const priceStatic = document.createElement("span");
      const priceDynamic = document.createElement("span");

      timeStatic.textContent = "длительность доставки";
      timeDynamic.textContent = `${deliveryTime} ${getDaysEnding(
        deliveryTime
      )} - `;

      priceStatic.textContent = "стоимость доставки";
      priceDynamic.textContent = `${price} ${currentDirection.serviceCurrency} - `;

      const customFee = document.createElement("p");

      if (calcData.brokerFeeValue) {
        const customFeeStatic = document.createElement("span");
        const customFeeDynamic = document.createElement("span");

        customFeeStatic.textContent = `таможенный сбор`;
        customFeeDynamic.textContent = `${calcData.brokerFeeValue} ${currentDirection.serviceCurrency} - `;

        customFee.classList.add("custom-text-color-grey-1", "mb-1");
        customFeeDynamic.classList.add("dynamic-values-fontweight");
        customFee.append(customFeeDynamic, customFeeStatic);
      }

      time.classList.add("custom-text-color-grey-1", "mb-1");
      priceEl.classList.add("custom-text-color-grey-1", "mb-1");

      timeDynamic.classList.add("dynamic-values-fontweight");
      priceDynamic.classList.add("dynamic-values-fontweight");

      time.append(timeDynamic, timeStatic);
      priceEl.append(priceDynamic, priceStatic);
      if (calcData.brokerFeeValue) {
        infoCont.append(time, priceEl, customFee);
      } else {
        infoCont.append(time, priceEl);
      }
    }

    tableOption.append(imgCont, infoCont);

    return tableOption;
  });
  resultCont.append(...items);
  calcResult.append(heading, passage, resultCont);
}
