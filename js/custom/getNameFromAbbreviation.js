import refs from "./refs.js";

export function getNameFromAbbreviation(base, abbreviation, locale) {
  // const options = {
  //   headers: new Headers({ "content-type": "application/json", owner: "5" }),
  // };

  const abbr = abbreviation ? abbreviation : "ua";

  return fetch(`${base}/public/directions/countries?code=${abbr}`, {
    headers: {
      "Accept-Language": locale,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error(err));
}
