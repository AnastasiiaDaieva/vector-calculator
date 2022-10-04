import { BASE_WITH_API } from "./variables.js";

export async function getColor(websiteId, coloredElementClass) {
  try {
    const data = await fetch(`${BASE_WITH_API}/websites/${websiteId}`);
    const json = await data.json();

    document.querySelector(`.${coloredElementClass}`).style.backgroundColor =
      json.mainColor;
  } catch (error) {
    console.log(error);
  }
}
