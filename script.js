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
    let tokens = expr.match(/\d+|\D+/g);
    let output = [];
    let operators = [];

    const precedence = {'+': 1, '-': 1, '*': 2, '/': 2};

    function applyOperator(op, b, a) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
        }
    }

    for (let token of tokens) {
        if (!isNaN(token)) {
            output.push(parseFloat(token));
        } else if (['+', '-', '*', '/'].includes(token)) {
            while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    }

    while (operators.length) {
        output.push(operators.pop());
    }

    let stack = [];
    for (let token of output) {
        if (typeof token === 'number') {
            stack.push(token);
        } else {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(applyOperator(token, b, a));
        }
    }

    return stack[0];
}
