const resultHeading =
  '<h2 class="font-weight-bold text-7 line-height-2 text-color-dark result-heading" localization-key="calculator_result_heading">Варианты доставки</h2>';

const resultContainer = (options) => {
  return `<div class="result-container">${options}</div>`;
};

const descriptionPassage = (direction, contentValue) => {
  return `<div class="passageOptions"><p class="mb-0">${direction} </p> ${contentValue}</div>`;
};

const passageDirection = (countryTo) => {
  return `<span localization-key="calculator_direction">Направление</span><span>:</span> <span > США </span> <span>-</span> <span localization-key="calculator_direction_countryTo"> ${countryTo}</span><span>.</span>`;
};

const passageContentValue = (contentValue) => {
  return `<p><span localization-key="calculator_content_value">Стоимость содержимого</span> - ${contentValue}.</p>`;
};

export {
  resultHeading,
  resultContainer,
  descriptionPassage,
  passageDirection,
  passageContentValue,
};
