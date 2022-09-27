import refs from "./refs.js";

export function getNameFromAbbreviation(base, abbreviation) {
  // const options = {
  //   headers: new Headers({ "content-type": "application/json", owner: "5" }),
  // };

  const abbr = abbreviation ? abbreviation : "ua";
  const currLanguage = refs.currentLanguage
    ? refs.currentLanguage.getAttribute("data-value")
    : "uk";

  return fetch(`${base}/public/directions/countries?code=${abbr}`, {
    headers: {
      "Accept-Language": currLanguage,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error(err));
}
