export function translateUnit(unit) {
  switch (unit) {
    case "kg":
      return "кг";
    case "cm":
      return "см";
    case "lb":
      return "фунт";
    case "in":
      return "дюйм";
    default:
      console.log("uncl unit", unit);
      return unit;
  }
}
