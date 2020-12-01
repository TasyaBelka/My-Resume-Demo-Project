const technologiesSelect = document.querySelector('#calculator-form-technologies');
const technologiesMultiSelect = new Choices(technologiesSelect, {
  allowSearch: false,
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  removeItems: true,
  removeItemButton: true,
  editItems: false,
  duplicateItemsAllowed: false,
  delimiter: ",",
  paste: true,
  searchEnabled: false,
  searchChoices: true,
  searchResultLimit: -1,
  position: "auto",
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  placeholder: true,
  noChoicesText: "No available options",
  itemSelectText: "Click to select",
  classNames: {
    containerInner: "choices__inner technologies-input-container",
    input: "choices__input",
  },
});

calculateSum();

const calculatorForm = document.querySelector('.calculator-form');

calculatorForm.addEventListener('submit', function (event) {
  event.preventDefault();
  calculateSum();
});

function calculateSum() {
  // Selectors
  const webTypeSelect = document.querySelector('#calculator-form-website-type');
  const cart = document.querySelector('#calculator-form-input-radio-choice-cart input:checked');
  const request = document.querySelector('#calculator-form-input-radio-choice-request input:checked');

  // Values
  const webTypeValue = extractPriceFromValue(webTypeSelect.value);
  const technologiesValue = getTechnologiesSum(technologiesMultiSelect.getValue());
  const cartValue = convertCartOptionToPrice(cart.value);
  const webRequestValue = convertRequestOptionToPrice(request.value);

  const totSum = webTypeValue + technologiesValue + cartValue + webRequestValue;

  renderSum(totSum);
};

function renderSum(sum) {
  const costElement = document.querySelector('.calculator-form-tot-cost');

  costElement.textContent = 'Calculating';
  setTimeout(function() {
    costElement.textContent = sum + '$';
  }, 1000);

};

function convertCartOptionToPrice(option) {
  if (option === "Yes") {
    return 300;
  };
  return 0;
};

function convertRequestOptionToPrice(option) {
  if (option === "Yes") {
    return 500;
  };
  return 0;
};

function getTechnologiesSum(techArr) {
  let totalSum = 0;
  techArr.forEach(function (tech) {
    totalSum = totalSum + extractPriceFromValue(tech.value)
  });
  return totalSum;
};

function extractPriceFromValue(str) {
  const price = str.match(/:\d+/);
  if (price) {
    return Number(price[0].slice(1)) || 0;
  };
  return 0;
};
