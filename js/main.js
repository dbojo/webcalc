// Query the DOM for buttons and forms.
const buttons = document.querySelectorAll('.btn-num, .btn-op');
const equalsBtn = document.querySelector('.btn-eq');
const deleteBtn = document.querySelector('.btn-del');
const clearBtn = document.querySelector('.btn-cl');
const historyBtn = document.querySelector('.btn-hist');
const clearHistoryBtn = document.querySelector('#hist-btn-cl');
const signBtn = document.querySelector('.btn-sign');
const display = document.querySelector('#display');

let displayVal = '';
let operand1 = '';
let operand2 = '';
let operator = '';
let errorState = false;
let prevExpression = '';
let displayHist = true;

// Iterate over each number and operator button.
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonVal = button.getAttribute('data-num');
        handleInput(buttonVal);
    });
});

// Function to check if the calculator is in an error state.
function checkErrorState() {
    if (errorState) {
        alert("Please clear the calculator.");
        return true;
    } 
    return false;
}

// Function to handle input (both button clicks and keyboard input).
function handleInput(input) {
    if (checkErrorState()) return;

    // Check if the input is a number, operator, or special key.
    if (!isNaN(input) || input === '.' || '+-*/'.includes(input)) {
        // Update display and handle operand/operator logic.
        if (input === '+' || input === '-' || input === '*' || input === '/') {
            if (operand1 !== '' && operand2 === '') { // Check if the first operand is present and the second is not.
                operator = input; // Set the operator.
            } else if (operand1 !== '' && operand2 !== '') { // Check if both operands and the operator are present.
                equals(); // Evaluate the current expression.
                operator = input; // Set the next operator.
            } else if (input === '-' && displayVal === '') {
                operator = ''; // Allow negative sign only if display is empty.
            }
        } else {
            if (operator === '') operand1 += input; // Add characters to the first operand.
            else operand2 += input; // Add characters to the second operand.
        }
        updateDisplay(input);
    } 
    else if (input === 'Enter') equals();
    else if (input === 'Backspace') {
        displayVal = displayVal.slice(0, -1);
        display.value = displayVal;
    } 
    else if (input === 'c') clear();
}

// Function to update the display with the provided value.
function updateDisplay(value) {
    if (checkErrorState()) return;

    // Limit the display to 13 digits for brevity.
    if (displayVal.length >= 13) displayVal = displayVal.slice(0, 13);
    else displayVal += value;
    display.value = displayVal;
}

// Function to handle keyboard input.
function handleKeyboardInput(event) {
    const key = event.key;
    event.preventDefault(); // Prevent default behavior for certain keys
    if (key === ' ') return; // No spaces.
    handleInput(key);
}

// Function to evaluate the expression in the display.
function evaluateExpression() {
    // Ugly, but check if operand1 should be negative.
    if (displayVal.charAt(displayVal.indexOf(operand1) - 1) === '-') operand1 = '-' + operand1;

    // Convert operands to numbers.
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);

    // Evaluate the expression based on the operator.
    let result;
    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            if (operand2 !== 0) result = operand1 / operand2;
            else {
                display.value = "Error";
                errorState = true;
                return null;
            }
            break;
    }

    // Error case. Display 'Error' and return null.
    if (isNaN(result) || result === Infinity) {
        display.value = "Error";
        errorState = true;
        return null;
    }

    display.value = result;

    operand1 = Math.abs(result); // Set up the next operand to be this result.
    operand2 = '';
    operator = '';

    return result;
}

// Function to clear the calculator.
function clear() {
    operand1 = '';
    operand2 = '';
    operator = '';
    displayVal = '';
    display.value = displayVal;
    errorState = false;
}

// Function for when the equals button or 'Enter' is pressed, 
// or if there's part of a longer calculation to evaluate.
function equals() {
    if (checkErrorState()) return;

    const expression = displayVal; // Get the current expression.
    if (prevExpression != expression) {
        displayVal = displayVal.toString();
        const result = evaluateExpression();
        if (result === null) return; // Don't do anything if we got an error.
        addToHistory(result); // Add the result to the history.
        prevExpression = expression; // Update the previous expression.
        displayVal = result.toString(); // Reset the display value after evaluation.
    }
}

// Function to add an entry to the history list.
function addToHistory(entry) {
    if (entry !== null) { // Make sure we have something to add to the history.
        const history = document.querySelector('#list');
        const historyItem = document.createElement('div');
        historyItem.textContent = entry.length > 13 ? entry.slice(0, 13) : entry;
        historyItem.addEventListener('click', handleHistoryClick); // Add event listener for history items.
        history.appendChild(historyItem);
    }
}

// Function to handle clicking on a history entry.
function handleHistoryClick(event) {
    // Check if the calculator is in a state ready to accept a new number.
    if ('+-*/'.includes(displayVal.charAt(displayVal.length - 1))) {
        const clickedValue = event.target.textContent;
        if (operand1) operand2 = clickedValue;
        else operand1 = clickedValue;
        displayVal += clickedValue; // Append the clicked value to the display value.
        display.value = displayVal;
    }
}

// Function to clear the history of calculations.
function clearHistory() {
    const historyList = document.querySelector('#list');
    historyList.innerHTML = ''; // Remove all child elements.
    prevExpression = ''; // Clear the previous expression.
}

// Keyboard support.
document.addEventListener('keydown', handleKeyboardInput);

// Evaluate the expression in the display upon clicking the equals button.
equalsBtn.addEventListener('click', equals);

// Delete the last character upon clicking the delete button.
deleteBtn.addEventListener('click', () => {
    if (checkErrorState()) return;
    displayVal = displayVal.slice(0, -1);
    display.value = displayVal;
});

// Clear the value(s) in the display upon clicking the clear button.
clearBtn.addEventListener('click', clear);

// Clear the history of calculations.
clearHistoryBtn.addEventListener('click', clearHistory);

// Change the sign of single values only.
signBtn.addEventListener('click', () => {
    if (checkErrorState()) return;
    if (displayVal == 0) return;

    // Convert displayVal to a string before our check.
    displayVal = displayVal.toString();

    // Check if the display contains only one number.
    if (displayVal && !displayVal.includes('+') && !displayVal.slice(1).includes('-') && 
        !displayVal.includes('*') && !displayVal.includes('/')) {
        
        // Change the sign of the number.
        if (displayVal.startsWith('-')) displayVal = displayVal.slice(1);
        else displayVal = '-' + displayVal;
        display.value = displayVal;
    } else { // Give an error if the display contains an expression.
        display.value = "Error";
        errorState = true;
    }
});

// Toggle showing the calculator history upon clicking the history button.
historyBtn.addEventListener('click', () => {
    const history = document.querySelector('#history');

    // Animation for showing/hiding history, with delays for smooth transitions.
    if (displayHist) {
        history.style.display = 'flex';
        setTimeout(() => {
            history.classList.add('show');
        }, 10);
    } else {
        history.classList.remove('show');
        setTimeout(() => {
            history.style.display = 'none';
        }, 500);
    }
    displayHist = !displayHist;
});