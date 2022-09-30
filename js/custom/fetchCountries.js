export default function fetchCountries(base, owner) {
  const options = {
    headers: new Headers({ "content-type": "application/json", owner: owner }),
  };
  return fetch(`${base}/public/directions`, options)
    .then((response) => {
      if (response.ok) {
        // console.log(response);

        return response.json();
      }
    })
    .catch((err) => console.error(err));
}
