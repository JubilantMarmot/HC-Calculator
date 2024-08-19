function appendToDisplay(value) {
    let display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    let display = document.getElementById('display');
    display.value = '';
}

function calculate() {
    let display = document.getElementById('display');
    try {
        let result = parseExpression(display.value);
        display.value = result;
    } catch (e) {
        display.value = 'Error';
    }
}

function parseExpression(expr) {
  // THIS is JUST for testing! This is not good to use and wont work with sin cos and tan!
    return eval(expr);
}
