export default function getDaysEnding(number) {
  const lastTwoDigits = String(number).slice(-2);

  if (
    lastTwoDigits === "11" ||
    lastTwoDigits === "12" ||
    lastTwoDigits === "13" ||
    lastTwoDigits === "14"
  ) {
    return "дней";
  } else {
    const lastDigit = String(number).slice(-1);
    switch (lastDigit) {
      case "1":
        return "день";
      case "2" || "3" || "4":
        return "дня";
      default:
        return "дней";
    }
  }
}
