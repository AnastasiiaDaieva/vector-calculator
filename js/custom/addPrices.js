export default function addPrices(options, prices) {
  return options.map((x, i) => {
    const withPrice = {
      ...x,
      price: prices[i].price,
      maxWeight: prices[i].maxWeight,
      weightType: prices[i].weightType,
    };
    return withPrice;
  });
}
