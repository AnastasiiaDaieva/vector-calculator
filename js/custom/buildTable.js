import refs from "./refs.js";
import { tableOptions } from "./custom.js";

const { tableBody } = refs;

export default function buildTable(
  deliveryOptions,
  deliveryPrices,
  chosenCountry
) {
  // console.log(deliveryPrices);
  const getList = deliveryOptions.find(
    (item) => item.countryTo === chosenCountry
  );
  getList.deliveryTypes.map(({ title, deliveryTime }) =>
    tableOptions.push({ title, deliveryTime })
  );
  // console.log("tableOptionsB", tableOptions);

  const addPrices = (options, prices) => {
    return options.map((x, i) => {
      console.log("prices", prices);
      console.log("options", options);
      const withPrice = { ...x, price: prices[i] };
      return withPrice;
    });
  };

  const tableOptionsWithPrices = addPrices(tableOptions, deliveryPrices);

  console.log("with prices", tableOptionsWithPrices);

  const items = tableOptions.map((option) => {
    console.log(option);
    const row = document.createElement("tr");
    const { title, deliveryTime, deliveryPrice } = option;
    const method = document.createElement("td");
    const time = document.createElement("td");
    const price = document.createElement("td");
    method.innerText = title;
    time.innerText = `${deliveryTime} дней`;
    price.innerText = `$${deliveryPrice}`;
    row.appendChild(method);
    row.appendChild(time);
    row.appendChild(price);

    return row;
  });

  tableBody.append(...items);
}
