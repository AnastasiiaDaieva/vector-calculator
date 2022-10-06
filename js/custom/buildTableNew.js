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
  weightType,
} from "./markup/calculator/passageWeight.js";
import {
  brokerFeePrompt,
  deliveryTypeInfo,
  deliveryTypeLogo,
  deliveryTypeMaxWeight,
} from "./markup/calculator/resultOption.js";
import { translateUnit } from "./translateUnit.js";
import { numberWithSeparator } from "./numberWithSeparator.js";

const { calcResult } = refs;

export default async function buildTableNew(
  calcData,
  formData,
  currencySymbol,
  countryName,
  languageParam
) {
  console.log("calcData", calcData);
  // console.log("formData", formData);
  // console.log("currentDirection", currentDirection);

  // heading
  calcResult.insertAdjacentHTML("beforeend", resultHeading);

  // description passage
  const direction = passageDirection(countryName[Object.keys(countryName)[0]]);

  const contentValue = passageContentValue(
    `${numberWithSeparator(formData.contentValue)}${currencySymbol}`
  );

  calcResult.insertAdjacentHTML(
    "beforeend",
    descriptionPassage(direction, contentValue)
  );

  // result options

  const resultOption = (arrayItem) => {
    const {
      title,
      deliveryTime,
      price,
      maxWeight,
      logoUrl,
      withDimensions,
      weightUnit,
      resultWeight,
    } = arrayItem;
    console.log(arrayItem);

    // deliveryTypeLogo
    const imgSrc = logoUrl ? logoUrl : "./img/logos/up-logo.png";

    const logo = deliveryTypeLogo(imgSrc, title);
    let option = "";
    if (!price) {
      option = deliveryTypeMaxWeight(
        title,
        `${maxWeight} ${translateUnit(weightUnit)}`
      );

      return `<div class="result-option">${logo}${option}</div>`;
    } else {
      //deliveryTypeInfo

      // brokerFeePromptHtml
      const brokerFeePromptHtml = (brokerFeeValue, currency) => {
        if (brokerFeeValue) {
          return brokerFeePrompt(price, brokerFeeValue, currency);
        } else {
          return "";
        }
      };

      // option

      const weightPromptHtml = (withDimensions) => {
        if (withDimensions) {
          return weightPrompt();
        } else {
          return "";
        }
      };

      const weight = passageWeight(
        `${resultWeight} ${translateUnit(weightUnit)}`,
        weightType(withDimensions),
        weightPromptHtml(withDimensions)
      );

      const priceLine = `${price + calcData.brokerFeeValue}${currencySymbol}`;

      option = deliveryTypeInfo(
        title,
        weight,
        numberWithSeparator(priceLine),
        deliveryTime,
        getDaysEnding(deliveryTime, languageParam),
        brokerFeePromptHtml(calcData.brokerFeeValue, currencySymbol)
      );

      return `<div class="result-option">${logo} ${option}</div>`;
    }
  };

  const options = calcData.rates.map(resultOption).join("");

  calcResult.insertAdjacentHTML("beforeend", resultContainer(options));
}
