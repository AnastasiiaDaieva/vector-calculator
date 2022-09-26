import refs from "./refs.js";

export function getNameFromAbbreviation(base, abbreviation) {
  // const options = {
  //   headers: new Headers({ "content-type": "application/json", owner: "5" }),
  // };
  return fetch(`${base}/public/directions/countries?code=${abbreviation}`, {
    headers: {
      "Accept-Language": refs.currentLanguage.getAttribute("data-value"),
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error(err));
}
