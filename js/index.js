let num1 = "0";
let num2 = "";
let operator = "";
let result = "";
let message = "";

/** Event Listeners */
const numButtons = document.querySelectorAll(".number-btn");
const opButtons = document.querySelectorAll('.operator-btn');

numButtons.forEach(btn => btn.addEventListener('click', assignVal));
opButtons.forEach(btn => btn.addEventListener('click', assignOp));

/** Event Listener helper functions */
function assignVal(e) {
  const val = e.target.id;

  if (operator === "") {
    if (num1 === "0") {
      num1 = val;
    } else {
      num1 += val;
    }
  } else {
    num2 += val;
  }

  console.log(`num1:${num1} num2:${num2}`)
}

function assignOp(e) {
  const op = e.target.id;

  if (num2 === "") {
    operator = op;
  } else {
    /** 
     * num1 and num2 are set, meaning there is already an operation happening
     * In this case, get the result of the current operation and set to num1
     */ 

  }

  console.log(`num1:${num1} op:${operator} num2:${num2}`);
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