import refs from "./refs.js";
import getDaysEnding from "./getDaysEnding.js";
import {
  descriptionPassage,
  passageContentValue,
  passageDirection,
  resultContainer,
  resultHeading,
} from "./markup/calculator/elements.js";
import {
  passageWeight,
  weightPrompt,
} from "./markup/calculator/passageWeight.js";
import {
  brokerFeePrompt,
  deliveryTypeInfo,
  deliveryTypeLogo,
  deliveryTypeMaxWeight,
} from "./markup/calculator/resultOption.js";

const { calcResult } = refs;

export default function buildTableNew(
  calcData,
  formData,
  currentDirection,
  countryName
) {
  // console.log("calcData", calcData);
  // console.log("formData", formData);
  // console.log("currentDirection", currentDirection);

  // heading
  calcResult.insertAdjacentHTML("beforeend", resultHeading);

  // description passage
  const direction = passageDirection(countryName[Object.keys(countryName)[0]]);

  const weightPromptHtml = (withDimensions) => {
    if (withDimensions) {
      return weightPrompt();
    } else {
      return "";
    }
  };

  const weight = passageWeight(
    `${calcData.resultWeight} ${calcData.weightUnit}`,
    weightPromptHtml(calcData.withDimensions)
  );

  const contentValue = passageContentValue(
    `${formData.contentValue} ${currentDirection.serviceCurrency}`
  );

  calcResult.insertAdjacentHTML(
    "beforeend",
    descriptionPassage(direction, weight, contentValue)
  );

  // result options

  const resultOption = (arrayItem) => {
    const { title, deliveryTime, price, maxWeight, logoUrl } = arrayItem;

    // deliveryTypeLogo
    const imgSrc = logoUrl ? logoUrl : "./img/logos/up-logo.png";

    const logo = deliveryTypeLogo(imgSrc, title);
    let option = "";
    if (!price) {
      option = deliveryTypeMaxWeight(
        title,
        `${maxWeight} ${calcData.weightUnit}`
      );

      return `<div class="result-option">${logo}${option}</div>`;
    } else {
      //deliveryTypeInfo

      // brokerFeePromptHtml
      const brokerFeePromptHtml = (brokerFeeValue) => {
        if (brokerFeeValue) {
          return brokerFeePrompt(price, brokerFeeValue);
        } else {
          return "";
        }
      };

      // option
      const timeLine = `${deliveryTime} ${getDaysEnding(deliveryTime)}`;

      const priceLine = `${price + calcData.brokerFeeValue} ${
        currentDirection.serviceCurrency
      }`;

      option = deliveryTypeInfo(
        title,
        priceLine,
        timeLine,
        brokerFeePromptHtml(calcData.brokerFeeValue)
      );

      return `<div class="result-option">${logo} ${option}</div>`;
    }
  };

  const options = calcData.rates.map(resultOption).join("");

  calcResult.insertAdjacentHTML("beforeend", resultContainer(options));
}
