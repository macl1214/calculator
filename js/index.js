let num1 = "0";
let num2 = "";
let operator = "";
let result = "";
let computedResult = false;
let input = num1;
let output = "";

const operators = ['+', '-', '*', '/'];

/** Initialize display */
display();

/** Event Listeners */
const numButtons = document.querySelectorAll(".number-btn");
const opButtons = document.querySelectorAll('.operator-btn');
const equalsButton = document.querySelector('.equals-btn');
const clearButton = document.querySelector(".clear-btn");
const decimalButton = document.querySelector(".decimal-btn");

numButtons.forEach(btn => btn.addEventListener('click', (e) => {
  assignVal(e);
  display();
}));
opButtons.forEach(btn => btn.addEventListener('click', (e) => {
  assignOp(e);
  display();
}));
equalsButton.addEventListener('click', () => {
  attemptOperation();
  display();
});
clearButton.addEventListener('click', () => {
  clear();
  display();
});

decimalButton.addEventListener('click', () => {
  addDecimal();
  display();
});

document.addEventListener('keydown', (e) => {
  assignKeys(e);
  display();
});

/** Event Listener helper functions */
function assignKeys(e) {
  const key = e.key;

  console.log(e);

  if (operators.includes(key)) {
    assignOp(key, true);
    console.log("assigned op");
  } else if (key === ".") {
    decimalButton.click();
    console.log("adding decimal");
  } else if (key === "=" || key === "Enter") {
    equalsButton.click();
    console.log("equals");
  } else if (key === "c") {
    clearButton.click();
    console.log("clearing");
  } else {
    const num = +key;

    if (Number.isInteger(num)) {
      assignVal(key, true);
      console.log("assigned num");
    } 
  }

  console.log("ignored")
}

// fromKeyboard used to check if e will be the value from 
// the keyboard or from the button 
function assignVal(key, fromKeyboard=false) {
  const val = fromKeyboard ? key : key.target.id;

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

// fromKeyboard used to check if e will be the value from 
// the keyboard or from the button 
function assignOp(key, fromKeyboard=false) {
  const op = fromKeyboard ? key : key.target.id;
  let opSymbol = "";
  
  if (fromKeyboard) {
    opSymbol = op;
  } else {
    opSymbol = getOpSymbol(op);
  }

  computedResult = false;
  
  if (result !== "") {
    reassignValues();
  }

  assertExpressionExists();

  if (num2 === "") {
    if (operator !== "") {
      
      // Clear output in case there is an error from previous input
      output = "";
      
      replaceOpInInput(opSymbol);
    }

    operator = opSymbol;
  }

  input += ` ${opSymbol} `;
}

function addDecimal() {

  if (result !== "") {
    reassignValues();
  }

  if (operator === "") {
    
    if (num1.includes(".")) {
      return;
    } else {
      num1 += "."
      input += "."
    }
  } else {
    if (num2.includes(".")) {
      return;
    } else {
      if (num2 === "" || num2 === "0") {
        num2 = "0."
        input += num2;
      } else {
        num2 += ".";
        input += ".";
      }
    }
  }
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

  if (computedResult === true) {
    return;
  }
  
  input += " = ";
  computedResult = true;

  if (operator === "") {
    result = num1;
  } else {
    result = "" + operate(operator, num1, num2);
  }
  
  output = result;
}

function reassignValues(keepResult = false) {

  num1 = result;
  operator = "";
  num2 = "";

  output = keepResult ? output : "";
  result = "";
  input = num1;
}

function assertExpressionExists() {
  if (num1 !== "" && operator !== "" && num2 !== "" && result === "") {
    
    attemptOperation();
    computedResult = false;
    reassignValues(true);
  }
}

function clear() {
  computedResult = false; 

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

function operate(operator, stringNum1, stringNum2) {

  const n1 = Number.parseFloat(stringNum1);
  const n2 = Number.parseFloat(stringNum2);

  switch(operator) {
    case "+":
      return add(n1, n2);
    case "-":
      return subtract(n1, n2);
    case "*":
      return multiply(n1, n2);
    case "/":
      return divide(n1, n2);
    default:
      throw new Error("Unknown operator");
  }
}