const passageWeight = (weight, weightTypeHtml, weightPromptHtml) => {
  return `<div class="weightLine_container"><p class="custom-text-color-grey mb-1"><span class="dynamic-values-fontweight">${weight}</span> - ${weightTypeHtml}${weightPromptHtml}</p> </div>`;
};

const weightType = (withDimensions) => {
  if (withDimensions) {
    return `<span  localization-key="calculator_result_volumetric_weight">объёмный вес</span>`;
  } else {
    return `<span localization-key="calculator_result_factual_weight">фактический вес</span>`;
  }
};

const weightPrompt = () => {
  return `<p class="weightPrompt__container mb-1"><img class="withDimensionsNotification" src="img/icons/question-mark.svg" alt="prompt" height="10px" width="10px"/><span localization-key="calculator_result_weight_prompt" class="weightPrompt displayNone">Вес посчитан на основе габаритов посылки.</span></p>`;
};

export { passageWeight, weightPrompt, weightType };
