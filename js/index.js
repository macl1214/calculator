let num1 = "0";
let num2 = "";
let operator = "";
let result = "";
let computedResult = false;
let input = num1;
let output = "";

/** Initialize display */
display();

/** Event Listeners */
const numButtons = document.querySelectorAll(".number-btn");
const opButtons = document.querySelectorAll('.operator-btn');
const equalsButton = document.querySelector('.equals-btn');
const clearButton = document.querySelector(".clear-btn");

numButtons.forEach(btn => btn.addEventListener('click', (e) => {
  assignVal(e);
  display();
}));
opButtons.forEach(btn => btn.addEventListener('click', (e) => {
  assignOp(e);
  display();
}));
equalsButton.addEventListener('click', (e) => {
  attemptOperation(e);
  display();
});
clearButton.addEventListener('click', () => {
  clear();
  display();
});

/** Event Listener helper functions */
function assignVal(e) {
  const val = e.target.id;

  if (computedResult) {
    clear();
    computedResult = false;
  }

  if (operator === "") {
    if (num1 === "0") {
      num1 = val;
      input = num1;
    } else {
      num1 += val;
      input += val;
    }
  } else {
    num2 += val;
    input += val;
  }

  display();
}

function assignOp(e) {
  const op = e.target.id;

  computedResult = false;

  if (result !== "") {
    reassignVals();
  }

  if (num2 === "") {
    if (operator !== "") {
      replaceOpInInput(op);
    }

    operator = op;
  }

  let symbol = getOpSymbol(op);
  input += ` ${symbol} `;
}

function replaceOpInInput(op) {
  let regex = /\s[^\w\d\s]\s/i;
  
  input = input.replace(regex, '');
}

function getOpSymbol(op) {
  let symbol = "";

  switch (op) {
    case "add": 
      symbol =  "+";
      break;
    case "subtract":
      symbol = "-";
      break;
    case "multiply":
      symbol = "*";
      break;
    case "divide":
      symbol = "/";
      break;
  }

  return symbol;
}

function attemptOperation() {
  
  if (operator !== "" && num2 === "") {
    output = "ERROR";
    return;
  }
  
  input += " = ";
  computedResult = true;

  if (operator === "") {
    result = num1;
  } else {
    result = operate(operator, num1, num2);
  }
  
  output = result;
}

function reassignVals() {

  num1 = output;
  operator = "";
  num2 = "";

  output = "";
  input = num1;
}

function clear() {
  num1 = "0";
  num2 = "";
  
  operator = "";
  result = "";

  input = num1;
  output = "";
}

function display() {
  const inputEl = document.querySelector(".input");
  const outputEl = document.querySelector(".output");

  inputEl.textContent = input;
  outputEl.textContent = output;
}

/** Operation functions */
function add(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  if (n2 === 0) {
    throw new Error("Cannot divide by zero");
  }

  return n1 / n2;
}

function operate(operator, n1, n2) {

  switch(operator) {
    case "add":
      return add(n1, n2);
    case "subtract":
      return subtract(n1, n2);
    case "multiply":
      return multiply(n1, n2);
    case "divide":
      return divide(n1, n2);
    default:
      throw new Error("Unknown operator");
  }
}