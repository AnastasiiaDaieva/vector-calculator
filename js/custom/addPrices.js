export default function addPrices(options, prices) {
  return options.map((x, i) => {
    const withPrice = { ...x, price: prices[i].price };
    return withPrice;
  });
}
