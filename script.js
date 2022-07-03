class Calculator {
    constructor(previosOperandText, currentOperandText) {
        this.previosOperandText = previosOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.previosOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString(); //need refactoring
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previosOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previosOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const previous = parseFloat(this.previosOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '*':
                computation = previous * current;
                break;
            case '÷':
                computation = previous / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previosOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) integerDisplay = ''
        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null)
            return `${integerDisplay}.${decimalDigits}`;
        else
            return integerDisplay;
    }
    updateDisplay() {
        this.currentOperandText.innerText =
            this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previosOperandText.innerText =
                `${this.getDisplayNumber(this.previosOperand)} ${this.operation}`;
        }
        else this.previosOperandText.innerText = '';
    }
}

const numbersBtn = document.querySelectorAll('[data-number]');
const operationsBtn = document.querySelectorAll('[data-operation]');
const allCrearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const previosOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previosOperandText, currentOperandText);

numbersBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationsBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allCrearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})