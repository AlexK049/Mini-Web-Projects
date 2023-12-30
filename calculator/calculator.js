/****************************************************
 * Keyboard Handling
 ****************************************************/
document.addEventListener('keydown', function(event) {
    const key = event.key;
    let keyId = '';
    switch (key) {
        case 'c':
            keyId = 'clear';
            break;
        case '%':
            keyId = 'modulo';
            break;
        case '^':
            keyId = 'power';
            break;
        case '/':
            keyId = 'divide';
            break;
        case 'x':
        case '*':
            keyId = 'multiply';
            break;
        case '-':
            keyId = 'subtract';
            break;
        case '+':
            keyId = 'add';
            break;
        case '.':
            keyId = 'modulo';
            break;
        case 'Enter':
        case '=':
            keyId = 'equals';
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            keyId = key;
            break;
        default:
            return;
    }
    document.getElementById(keyId).click();
});

/****************************************************
 * Button Handling
 ****************************************************/
const buttons = document.querySelectorAll('button');
// Add click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', function() {
    buttonClickHandler(button);
  });
});
function buttonClickHandler(button) {
    buttons.forEach(b => b.classList.remove('operatorSelected'));

    //early return if the calculator is in an error state and clear isn't pressed
    if (currentState == CalculatorState.ERROR && button.id != 'clear') return;

    const value = button.innerText;
    
    if (button.classList.contains('operator')) {
        button.classList.add('operatorSelected');
        handleOperator(value);
    } else if (button.classList.contains('number')) {
        handleNumber(value)
    } else if (button.id == 'clear') {
        handleClear();
    } else if (button.id == 'equals') {
        handleEquals();
    } else if (button.id == 'negate') {
        handleNegate();
    } else if (button.id == 'decimal') {
        handleDecimal();
    } else if (button.id == 'clearHistoryBtn') {
        clearHistory();
    }
}

/****************************************************
 * Handle Inputs
 ****************************************************/
function handleNumber(value) {
    switch (currentState) {
        case CalculatorState.RESULT:
            currentState = CalculatorState.BASE_OPERAND;
            operand1 = value;
            setDisplay(operand1);
            break;
        case CalculatorState.BASE_OPERAND:
            operand1 = operand1 == '0' ? value : operand1 == '-0' ? `-${value}` : operand1 + value;
            setDisplay(operand1);
            break;
        case CalculatorState.NEXT_OPERAND:
            operand2 = operand2 == '0' ? value : operand2 == '-0' ? `-${value}` : operand2 + value;
            setDisplay(operand2);
            break;
        case CalculatorState.OPERATOR:
            currentState = CalculatorState.NEXT_OPERAND;
            operand2 = value;
            setDisplay(value);
    }
}

function handleOperator(value) {
    if (currentState == CalculatorState.NEXT_OPERAND) {
        performCalculationSteps();
    }
    //set the operator to the new value after we calculate so that we don't calculate with the wrong operator
    operator = value;
    currentState = CalculatorState.OPERATOR;
}

function handleClear() {
    currentState = CalculatorState.BASE_OPERAND;
    operand1 = '0';
    operand2 = '0';
    operator = '';
    setDisplay('0');
}

function handleEquals() {
    currentState = CalculatorState.RESULT;
    performCalculationSteps();
}

function handleNegate() {
    if (currentState == CalculatorState.BASE_OPERAND || currentState == CalculatorState.RESULT) {
        operand1 = operand1.startsWith('-') ? operand1.slice(1) : '-' + operand1;
        setDisplay(operand1);
    } else if (currentState == CalculatorState.NEXT_OPERAND) {
        operand2 = operand2.startsWith('-') ? operand2.slice(1) : '-' + operand2;
        setDisplay(operand2);
    } else if (currentState == CalculatorState.OPERATOR) {
        currentState = CalculatorState.NEXT_OPERAND;
        operand2 = '-0';
        setDisplay(operand2);
    }
}

function handleDecimal() {
    if (currentState == CalculatorState.BASE_OPERAND) {
        if (operand1.includes('.')) return;
        operand1 += '.';
        setDisplay(operand1);
    } else if (currentState == CalculatorState.NEXT_OPERAND) {
        if (operand1.includes('.')) return;
        operand2 += '.';
        setDisplay(operand2);
    } else if (currentState == CalculatorState.OPERATOR || currentState == CalculatorState.RESULT) {
        currentState = CalculatorState.NEXT_OPERAND;
        operand2 = '0.';
        setDisplay(operand2);
    }
}


/****************************************************
 * State Machine
 ****************************************************/
const CalculatorState = {
    BASE_OPERAND: 'BASE_OPERAND',
    OPERATOR: 'OPERATOR',
    NEXT_OPERAND: 'NEXT_OPERAND',
    RESULT: 'RESULT',
    ERROR: 'ERROR'
};
const Operator = {
    MULTIPLY: 'MULTIPLY',
    DIVIDE: 'DIVIDE',
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT',
    POWER: 'POWER'
}
let currentState = CalculatorState.BASE_OPERAND;
let operand1 = '0';
let operator;
let operand2 = '';


/****************************************************
 * UI Control
 ****************************************************/
function setDisplay(value) {
    document.getElementById('inputDisplay').value = value;
}

function addToHistory(result) {
    //add item to list
    const historyList = document.getElementById('historyList');
    const historyItem = document.createElement('li');
    historyItem.textContent = result;
    historyList.appendChild(historyItem);
    historyItem.addEventListener('click', () => {
        if (currentState == CalculatorState.BASE_OPERAND && operand1 == '0') {
            handleNumber(historyItem.textContent);
        }
    });
    historyItem.scrollIntoView();

    //show clear history button
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    clearHistoryBtn.style.visibility = 'visible';
}

function clearHistory() {
    //clear history
    const historyList = document.getElementById('historyList');
    while (historyList.firstChild) {
        historyList.removeChild(historyList.firstChild);
    }

    //hide clear history button
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    clearHistoryBtn.style.visibility = 'hidden';
}


/****************************************************
 * Calculation
 ****************************************************/
function performCalculationSteps() {
    //calculate result
    const result = calculate();

    //check if the result is valid
    if (isNaN(result) || !Number.isFinite(result)) {
        setDisplay('ERROR');
        currentState = CalculatorState.ERROR;
        return;
    }

    //set operand state and visual state of calculator
    operand1 = result.toString();
    operand2 = '';
    setDisplay(result.toString());
    addToHistory(result.toString());
}

function calculate() {
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '÷':
            return num1 / num2;
        case '^':
            return Math.pow(num1, num2);
        case 'mod':
            return num1 % num2;
    }
}
