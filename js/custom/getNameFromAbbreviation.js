import refs from "./refs.js";

export function getNameFromAbbreviation(base, abbreviation, locale) {
  console.log(locale);
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
