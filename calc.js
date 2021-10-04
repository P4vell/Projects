let display = document.querySelector(".display");
const clearButton = document.getElementById("clear");
let num1;
let num2;
let operator;
let mainResult = 0;

function typeNumber(num) {
    display.textContent += num;
}

function clear() {
    display.textContent = "";
}

function clearAll() {
    display.textContent = "";
    mainResult = 0;
}

clearButton.addEventListener("click", clear);

function getNumber(oper) {
    num1 = parseFloat(display.textContent);
    clear();
    operator = oper;
}

function showResult() {
    num2 = parseFloat(display.textContent);
    clear();
    if (operator == "+") {
        mainResult += num1 + num2;
        display.textContent = mainResult;
    }
    else if (operator == "-") {
        mainResult += num1 - num2;
        display.textContent = mainResult;
    }
    else if (operator == "*") {
        mainResult += num1 * num2;
        display.textContent = mainResult;
    }
    else {
        mainResult += num1 / num2;
        display.textContent = mainResult;
    }
}