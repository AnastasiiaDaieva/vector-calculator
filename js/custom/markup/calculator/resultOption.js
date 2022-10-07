import { numberWithSeparator } from "../../numberWithSeparator.js";
import {
  palletOversizeText,
  brokerFeeText,
  minPriceText,
  BASE_URL,
} from "../../variables.js";

const resultOption = (logo, option) => {
  return `<div class="result-option">${logo} ${option}</div>`;
};

const deliveryTypeLogo = (src, alt) => {
  return `<div class="feature-box-icon custom-feature-box-icon-size-1 top-0"><img src="${BASE_URL}${src}" alt=${alt} class="icon-globe icons position-relative info-img"/></div>`;
};

const deliveryTypeInfo = (
  title,
  weight,
  price,
  time,
  days,
  feeDetailsPromptHtml
) => {
  return `<div class="feature-box-info mb-5"><h4 class="font-weight-bold line-height-1 custom-font-size-1 mb-1">${title}</h4>${weight}<p class="custom-text-color-grey-1 mb-1"><span class="dynamic-values-fontweight">${time}</span><span class="dynamic-values-fontweight" localization-key="calculator_result_deliveryDays"> ${days}</span> -</span><span localization-key="calculator_result_time_static"> длительность доставки</span></p><div class="custom-text-color-grey-1 mb-1 priceElement"><span class="dynamic-values-fontweight">${price} -</span><span localization-key="calculator_result_price_static"> стоимость доставки</span> ${feeDetailsPromptHtml} </div></div>`;
};

const feeDetailsPrompt = (price, currency) => {
  const { minPriceFee, brokerFee, deliveryPrice, palletOversizeFee } = price;
  const brokerFeeHtml = feePromptLine(brokerFee, currency, brokerFeeText);
  const minPriceFeeHtml = feePromptLine(minPriceFee, currency, minPriceText);

  const palletOversizeFeeHtml = feePromptLine(
    palletOversizeFee,
    currency,
    palletOversizeText
  );

  if (brokerFee || minPriceFee || palletOversizeFee) {
    return `<div class="promptContainer"><img class="priceNotification" src="img/icons/gen005.svg" alt="prompt" height="20px" width="20px"/><div class="pricePrompt displayNone"><p class="custom-text-color-grey-1 mb-1"><span class="dynamic-values-fontweight" >${
      numberWithSeparator(deliveryPrice) + currency
    } -</span><span localization-key="calculator_result_price_static"> стоимость доставки</span></p>${brokerFeeHtml}${minPriceFeeHtml}${palletOversizeFeeHtml}</div></div>`;
  } else {
    return "";
  }
};

const feePromptLine = (addFee, currency, text) => {
  if (addFee) {
    return `<p class="custom-text-color-grey-1 mb-1"><span class="dynamic-values-fontweight">${
      numberWithSeparator(addFee) + currency
    } -</span><span localization-key=${text.key}> ${text.text}</span></p>`;
  } else {
    return "";
  }
};

const brokerFeeForDetailsPrompt = (brokerFee, currency) => {
  if (brokerFee) {
    return `<p class="custom-text-color-grey-1 mb-1"><span class="dynamic-values-fontweight">${
      numberWithSeparator(brokerFee) + currency
    } -</span><span localization-key="calculator_result_custom_fee_static"> таможенный сбор</span></p>`;
  } else {
    return "";
  }
};

const minPriceFeeForDetailsPrompt = (minPriceFee, currency) => {
  if (minPriceFee) {
    return `<p class="custom-text-color-grey-1 mb-1"><span class="dynamic-values-fontweight">${
      numberWithSeparator(minPriceFee) + currency
    } -</span><span localization-key="calculator_result_min_value_fee_static"> доплата до минимальной стоимости</span></p>`;
  } else {
    return "";
  }
};

const deliveryTypeMaxWeight = (title, maxWeight) => {
  return `<div class="feature-box-info mb-5"><h4 class="font-weight-bold line-height-1 custom-font-size-1 mb-1">${title}</h4><span class="result-notification"><span localization-key="calculator_result_max_weight">Максимально допустимый вес</span> - ${maxWeight}.</span></div>`;
};
export {
  deliveryTypeLogo,
  resultOption,
  deliveryTypeInfo,
  feeDetailsPrompt,
  deliveryTypeMaxWeight,
};
