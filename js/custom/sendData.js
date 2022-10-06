import { BASE_WITH_API } from "./variables.js";

export default async function sendData(formData, owner) {
  try {
    const response = await fetch(`${BASE_WITH_API}/public/delivery_rate/calc`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "content-Type": "application/json",
        owner: owner,
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
