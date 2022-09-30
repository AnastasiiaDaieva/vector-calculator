import { BASE_URL } from "./variables.js";

export async function getColor(websiteId, coloredElementClass) {
  try {
    const data = await fetch(`${BASE_URL}/public/websites/${websiteId}`);
    const json = await data.json();

    document.querySelector(`.${coloredElementClass}`).style.backgroundColor =
      json.mainColor;
  } catch (error) {
    console.log(error);
  }
}
