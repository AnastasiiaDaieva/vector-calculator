const test = "https://logistic.ndv.net.ua";
const real = "https://next.crauzer.com";

export const BASE_URL = real;
export const URL_API = "/api";
export const BASE_WITH_API = `${BASE_URL}${URL_API}`;
export const brokerFeeText = {
  text: "таможенный сбор",
  key: "calculator_result_custom_fee_static",
};
export const palletOversizeText = {
  text: "надбавка за превышение размера паллеты",
  key: "calculator_result_pallet_oversize_fee_static",
};
export const minPriceText = {
  text: "доплата до минимальной стоимости",
  key: "calculator_result_min_value_fee_static",
};
