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
    let tokens = expr.match(/[\d\.]+|[+\-*/()^]|sin|cos|tan|sqrt/g);
    let output = [];
    let operators = [];
    const precedence = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3};

    function applyOperator(op, b, a) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            case '^': return Math.pow(a, b);
        }
    }

    function evaluateFunction(func, value) {
        switch (func) {
            case 'sin': return Math.sin(value);
            case 'cos': return Math.cos(value);
            case 'tan': return Math.tan(value);
            case 'sqrt': return Math.sqrt(value);
        }
    }

    for (let token of tokens) {
        if (!isNaN(token)) {
            output.push(parseFloat(token));
        } else if (['+', '-', '*', '/', '^'].includes(token)) {
            while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        } else if (['sin', 'cos', 'tan', 'sqrt'].includes(token)) {
            operators.push(token);
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                output.push(operators.pop());
            }
            operators.pop();
            if (operators.length && ['sin', 'cos', 'tan', 'sqrt'].includes(operators[operators.length - 1])) {
                output.push(operators.pop());
            }
        }
    }

    while (operators.length) {
        output.push(operators.pop());
    }

    let stack = [];
    for (let token of output) {
        if (typeof token === 'number') {
            stack.push(token);
        } else if (['sin', 'cos', 'tan', 'sqrt'].includes(token)) {
            let value = stack.pop();
            stack.push(evaluateFunction(token, value));
        } else {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(applyOperator(token, b, a));
        }
    }

    if (stack.length !== 1) {
        throw new Error('Invalid expression');
    }

    return stack[0];
}
