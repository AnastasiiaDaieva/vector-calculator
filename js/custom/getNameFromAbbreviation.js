export function getNameFromAbbreviation(base, abbreviation) {
  // const options = {
  //   headers: new Headers({ "content-type": "application/json", owner: "5" }),
  // };
  return fetch(`${base}/public/directions/countries?code=${abbreviation}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error(err));
}
