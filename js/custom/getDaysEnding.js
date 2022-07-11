export default function getDaysEnding(number) {
  const eleven = String(number).slice(-2);

  if (eleven === "11") {
    return "дней";
  } else {
    const lastDigit = String(number).slice(-1);
    switch (lastDigit) {
      case "1":
        return "день";
        break;
      case "2" || "3" || "4":
        return "дня";
        break;
      default:
        return "дней";
    }
  }
}
