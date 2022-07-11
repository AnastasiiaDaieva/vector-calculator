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
  // console.log(deliveryPrices);
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

  passage.textContent = `Направление: США - ${dataForPassage.country}. Вес ${dataForPassage.weight} кг.`;
  const resultCont = document.createElement("div");
  resultCont.classList.add("result-container");

  const getList = deliveryOptions.find(
    (item) => item.countryTo === chosenCountry
  );
  getList.deliveryTypes.map(({ title, deliveryTime }) =>
    tableOptions.push({ title, deliveryTime })
  );

  const tableOptionsWithPrices = addPrices(tableOptions, deliveryPrices);

  // console.log("with prices", tableOptionsWithPrices);

  const items = tableOptionsWithPrices.map((option) => {
    const { title, deliveryTime, price } = option;

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

    method.textContent = titleText;
    imgCont.appendChild(img);
    infoCont.appendChild(method);

    if (isNaN(price)) {
      const notificationEl = document.createElement("span");
      notificationEl.classList.add("result-notification");
      notificationEl.textContent = `Максимально допустимый вес - ${getNotificationWeight(
        price
      )} кг`;
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

      infoCont.appendChild(time);
      infoCont.appendChild(priceEl);
    }

    tableOption.append(imgCont, infoCont);

    return tableOption;
  });
  resultCont.append(...items);
  calcResult.append(heading, passage, resultCont);
}
