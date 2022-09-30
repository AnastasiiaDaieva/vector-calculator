import { BASE_URL } from "./variables.js";
import refs from "./refs.js";
const {
  select,
  senderSelect,
  calcWeight,
  calcHeight,
  calcWidth,
  calcLength,
  calcContentValue,
} = refs;

let translations = {};

async function fetchTranslationbyId(websiteId, language) {
  const data = await fetch(`${BASE_URL}/public/websites/${6}/translations`, {
    headers: {
      "Accept-Language": language,
    },
  });
  if (!data.ok) {
    console.log(`Could not fetch translations for locale ${language}`);
  }
  const json = await data.json();
  // console.log(json);
  return json;
}

async function setLocale(websiteId, language) {
  translations = await fetchTranslationbyId(6, language);

  translatePage();
}

function translatePage() {
  document.querySelectorAll("[localization-key]").forEach((element) => {
    let key = element.getAttribute("localization-key");

    let translation = translations[key];
    if (translation) {
      element.textContent = translation;
    } else {
      return;
    }
  });

  select.placeholder = translateByKey("calculator_receiver_placeholder");
  select.setAttribute(
    "data-msg-required",
    translateByKey("calculator_receiver_warning")
  );

  senderSelect.placeholder = translateByKey("calculator_sender_placeholder");

  senderSelect.setAttribute(
    "data-msg-required",
    translateByKey("calculator_sender_warning")
  );

  calcWeight.placeholder = translateByKey("calculator_weight_placeholder");
  calcWeight.setAttribute(
    "data-msg-required",
    translateByKey("calculator_weight_warning")
  );

  calcHeight.placeholder = translateByKey("calculator_height_placeholder");

  calcWidth.placeholder = translateByKey("calculator_width_placeholder");

  calcLength.placeholder = translateByKey("calculator_length_placeholder");

  calcContentValue.placeholder = translateByKey("calculator_value_placeholder");
  calcContentValue.setAttribute(
    "data-msg-required",
    translateByKey("calculator_value_warning")
  );
}

function translateByKey(key) {
  let translation = translations[key];
  return translation;
}

export { fetchTranslationbyId, translateByKey, translatePage, setLocale };
