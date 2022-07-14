export function weightConverter(weight, unit) {
  if (unit === "кг") {
    // console.log("converted weight original", weight);
    return weight;
  } else {
    // console.log(
    //   "converted weight from lbs",
    //   Math.round(weight * 0.45359237 * 10) / 10
    // );
    return Math.round(weight * 0.45359237 * 10) / 10;
  }
}

export function measurementConverter(item, unit) {
  if (unit === "см") {
    // console.log("converted original", item);
    return item;
  } else {
    // console.log("converted from inches", Math.round(item * 2.54));
    return Math.round(item * 2.54);
  }
}
