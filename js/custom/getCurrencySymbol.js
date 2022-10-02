export function getCurrencySymbol(base, currency) {
  return fetch(
    `${base}/public/directions/currencies?code=${currency}&symbol=true`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((err) => console.error(err));
}
