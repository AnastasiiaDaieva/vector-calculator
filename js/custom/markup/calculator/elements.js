const resultHeading =
  '<h2 class="font-weight-bold text-7 line-height-2 text-color-dark result-heading" localization-key="calculator_result_heading">Варіанти доставки</h2>';

const resultContainer = (options) => {
  return `<div class="result-container">${options}</div>`;
};

const descriptionPassage = (direction, weight, contentValue) => {
  return `<div class="passageOptions"><p class="mb-0">${direction} ${weight}</p> ${contentValue}</div>`;
};

const passageDirection = (countryTo) => {
  return `<span localization-key="calculator_direction">Напрямок</span><span>:</span> <span> США - ${countryTo}.</span>`;
};

const passageContentValue = (contentValue) => {
  return `<p><span localization-key="calculator_content_value">Вартість вмісту</span> - ${contentValue}.</p>`;
};

export {
  resultHeading,
  resultContainer,
  descriptionPassage,
  passageDirection,
  passageContentValue,
};