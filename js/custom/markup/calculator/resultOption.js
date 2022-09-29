const resultOption = (logo, option) => {
  return `<div class="result-option">${logo} ${option}</div>`;
};

const deliveryTypeLogo = (src, alt) => {
  return `<div class="feature-box-icon custom-feature-box-icon-size-1 top-0"><img src="https://logistic.ndv.net.ua/${src}" alt=${alt} class="icon-globe icons position-relative info-img"/></div>`;
};

const deliveryTypeInfo = (title, price, time, days, brokerFeePromptHtml) => {
  return `<div class="feature-box-info mb-5"><h4 class="font-weight-bold line-height-1 custom-font-size-1 mb-1">${title}</h4><p class="custom-text-color-grey-1 mb-1"><span class="dynamic-values-fontweight">${time}</span><span class="dynamic-values-fontweight" localization-key="calculator_result_deliveryDays"> ${days}</span> -</span><span localization-key="calculator_result_time_static"> длительность доставки</span></p><div class="custom-text-color-grey-1 mb-1 priceElement"><span class="dynamic-values-fontweight">${price} -</span><span localization-key="calculator_result_price_static"> стоимость доставки</span> ${brokerFeePromptHtml} </div></div>`;
};

const brokerFeePrompt = (basicFee, brokerFee) => {
  return `<div class="promptContainer"><img class="priceNotification" src="img/icons/gen005.svg" alt="prompt" height="20px" width="20px"/><div class="pricePrompt displayNone"><p class="custom-text-color-grey-1 mb-1"><span>${basicFee} -</span><span localization-key="calculator_result_price_static"> стоимость доставки</span></p><p class="custom-text-color-grey-1 mb-1"><span class="dynamic-values-fontweight">${brokerFee} -</span><span localization-key="calculator_result_custom_fee_static"> таможенный сбор</span></p></div></div>`;
};

const deliveryTypeMaxWeight = (title, maxWeight) => {
  return `<div class="feature-box-info mb-5"><h4 class="font-weight-bold line-height-1 custom-font-size-1 mb-1">${title}</h4><span class="result-notification"><span localization-key="calculator_result_max_weight">Максимально допустимый вес</span> - ${maxWeight}.</span></div>`;
};
export {
  deliveryTypeLogo,
  resultOption,
  deliveryTypeInfo,
  brokerFeePrompt,
  deliveryTypeMaxWeight,
};
