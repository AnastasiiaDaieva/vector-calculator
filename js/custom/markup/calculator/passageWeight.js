const passageWeight = (weight, weightPromptHtml) => {
  return `<span localization-key="calculator_result_weight">Вага</span><span> - ${weight}.</span> ${weightPromptHtml}`;
};

const weightPrompt = () => {
  return `<span localization-key="calculator_result_weight_with_dimensions"> (об'ємна)</span > <img class="withDimensionsNotification" src="img/icons/question-mark.svg" alt="prompt" height="10px" width="10px"/><span localization-key="calculator_result_weight_prompt" class="weightPrompt displayNone">Вага вирахувана на основі габаритів пакунка.</span>`;
};

export { passageWeight, weightPrompt };
