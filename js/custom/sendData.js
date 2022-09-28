import { BASE_URL } from "./variables.js";

export default async function sendData(formData) {
  try {
    const response = await fetch(`${BASE_URL}/public/delivery_rate/calc`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "content-Type": "application/json",
        owner: "6",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ ...formData, direction: formData.formDirection }),
    });

    const json = await response.json();
    // console.log(json);

    return json;
  } catch (error) {
    console.log("ERROR", error);
  }
}
