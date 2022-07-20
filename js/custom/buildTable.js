import refs from "./refs.js";
import { tableOptions } from "./custom.js";
import { getNotificationWeight } from "./getNotificationWeight.js";
import addPrices from "./addPrices.js";
import getDaysEnding from "./getDaysEnding.js";

const { calcResult } = refs;

export default function buildTable(
  deliveryOptions,
  deliveryPrices,
  chosenCountry,
  dataForPassage
) {
  // console.log("deliveryOptions", deliveryOptions);
  // console.log("deliveryPrices", deliveryPrices);
  // console.log("chosenCountry", chosenCountry);
  // console.log("dataForPassage", dataForPassage);

  const getList = deliveryOptions.find(
    (item) => item.countryTo === chosenCountry
  );
  getList.deliveryTypes.map(({ title, deliveryTime }) =>
    tableOptions.push({ title, deliveryTime })
  );
  const tableOptionsWithPrices = addPrices(tableOptions, deliveryPrices);
  // console.log("tableOptionsWithPrices", tableOptionsWithPrices);

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

  const weightForUser = (resultWeight, unit) => {
    const getWeight = resultWeight ? resultWeight : dataForPassage.weight;

    if (unit === "кг") {
      return `${getWeight} кг`;
    } else if (unit === "фт") {
      const convert = Math.round(getWeight / 0.45359237);
      return `${convert} фт`;
    } else {
      console.log(unit);
    }
  };

  passage.classList.add("passageOptions");

  const findResultWeight = deliveryPrices.find((item) => item.resultWeight);
  // console.log(findResultWeight);

  passage.textContent = `Направление: США - ${
    dataForPassage.country
  }. Вес ${weightForUser(
    findResultWeight?.resultWeight,
    dataForPassage.weightUnit
  )}.`;
  const resultCont = document.createElement("div");
  resultCont.classList.add("result-container");
  // console.log("tableOptionsWithPrices", tableOptionsWithPrices);
  const weightType = tableOptionsWithPrices.some((item) => item.weightType);
  // console.log(weightType);
  if (weightType === true) {
    const iconWeightType = document.createElement("img");
    iconWeightType.classList.add("withDimensionsNotification");

    iconWeightType.setAttribute("src", "img/icons/question-mark.svg");
    iconWeightType.setAttribute("alt", "prompt");
    iconWeightType.setAttribute("height", "10px");
    iconWeightType.setAttribute("width", "10px");

    const prompt = document.createElement("span");
    prompt.classList.add("weightPrompt", "displayNone");
    prompt.textContent = "Вес посчитан на основе габаритов посылки.";

    passage.append(iconWeightType, prompt);
  } else {
    console.log(weightType);
  }

  const items = tableOptionsWithPrices.map((option) => {
    const { title, deliveryTime, price, maxWeight } = option;
    console.log("opt", option);

    const tableOption = document.createElement("div");
    const imgCont = document.createElement("div");
    const img = document.createElement("img");
    const infoCont = document.createElement("div");

    const method = document.createElement("h4");

    const titleText = title === "Море" ? "Нова Пошта" : "УкрПошта";
    const imgSrc =
      title === "Море" ? "./img/icons/np-logo.svg" : "./img/logos/up-logo.png";
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
    const convertMaxWeight = (maxWeight, unit) => {
      if (unit === "фт") {
        return Math.floor(maxWeight * 2.2);
      } else {
        return maxWeight;
      }
    };
    method.textContent = titleText;
    imgCont.appendChild(img);
    infoCont.appendChild(method);
    // console.log("price", price);
    if (!price) {
      const notificationEl = document.createElement("span");
      notificationEl.classList.add("result-notification");
      notificationEl.textContent = `Максимально допустимый вес - ${convertMaxWeight(
        maxWeight,
        dataForPassage.weightUnit
      )} ${dataForPassage.weightUnit}`;
      infoCont.appendChild(notificationEl);
    } else {
      const time = document.createElement("p");
      const timeStatic = document.createElement("span");
      const timeDynamic = document.createElement("span");

      const priceEl = document.createElement("div");
      const priceStatic = document.createElement("span");
      const priceDynamic = document.createElement("span");

      timeStatic.textContent = "Длительность доставки ";
      timeDynamic.textContent = `${deliveryTime} ${getDaysEnding(
        deliveryTime
      )}`;
      priceStatic.textContent = "Стоимость доставки ";
      priceDynamic.textContent = `$${price}`;
      time.classList.add("custom-text-color-grey-1", "mb-1");
      priceEl.classList.add("custom-text-color-grey-1", "mb-1");
      timeDynamic.classList.add("dynamic-values-fontweight");
      priceDynamic.classList.add("dynamic-values-fontweight");

      time.append(timeStatic, timeDynamic);
      priceEl.append(priceStatic, priceDynamic);

      infoCont.append(time, priceEl);
    }

    tableOption.append(imgCont, infoCont);

    return tableOption;
  });
  resultCont.append(...items);
  calcResult.append(heading, passage, resultCont);
}
