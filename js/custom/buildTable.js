import refs from "./refs.js";
import { tableOptions } from "./custom.js";
import { getNotificationWeight } from "./getNotificationWeight.js";
import addPrices from "./addPrices.js";

const { calcResult } = refs;

export default function buildTable(
  deliveryOptions,
  deliveryPrices,
  chosenCountry
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
    const tableOption = document.createElement("div");
    const imgCont = document.createElement("div");
    const img = document.createElement("img");
    const infoCont = document.createElement("div");
    const { title, deliveryTime, price } = option;
    const method = document.createElement("h4");
    const time = document.createElement("p");
    const priceEl = document.createElement("p");

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
    time.classList.add("custom-text-color-grey-1", "mb-1");
    priceEl.classList.add("custom-text-color-grey-1", "mb-1");

    method.textContent = titleText;
    priceEl.textContent = isNaN(price) ? "-" : `Стоимость доставки $${price}`;
    time.textContent = isNaN(price)
      ? "-"
      : `Длительность доставки ${deliveryTime} дней`;

    imgCont.appendChild(img);
    infoCont.appendChild(method);
    infoCont.appendChild(time);
    infoCont.appendChild(priceEl);
    if (isNaN(price)) {
      const notificationEl = document.createElement("span");
      notificationEl.textContent = `Максимально допустимый вес - ${getNotificationWeight(
        price
      )} кг`;
      infoCont.appendChild(notificationEl);
    }
    tableOption.append(imgCont, infoCont);

    return tableOption;
  });
  resultCont.append(...items);
  calcResult.append(heading, resultCont);
}
