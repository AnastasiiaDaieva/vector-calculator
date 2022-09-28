export function getNameFromAbbreviation(base, abbreviation, locale) {
  return fetch(`${base}/public/directions/countries?code=${abbreviation}`, {
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
