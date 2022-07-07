export default function addPrices(options, prices) {
  return options.map((x, i) => {
    console.log("prices", prices);
    console.log("options", options);
    const withPrice = { ...x, price: prices[i] };
    return withPrice;
  });
}
