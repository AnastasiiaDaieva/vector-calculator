export default function getDaysEnding(number, lang) {
  const lastTwoDigits = String(number).slice(-2);

  if (
    lastTwoDigits === "11" ||
    lastTwoDigits === "12" ||
    lastTwoDigits === "13" ||
    lastTwoDigits === "14"
  ) {
    if (lang === "ru") {
      return "дней";
    } else {
      return "днів";
    }
  } else {
    const lastDigit = String(number).slice(-1);
    switch (lastDigit) {
      case "1":
        return "день";
      case "2" || "3" || "4":
        if (lang === "ru") {
          return "дня";
        } else {
          return "дні";
        }

      default:
        if (lang === "ru") {
          return "дней";
        } else {
          return "днів";
        }
    }
  }
}
