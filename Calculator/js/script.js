class Calculator {
   constructor(currentOperandTextElement, previousOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.readyToReset = false;
      this.clear();
   }

   clear() {
      this.previousOperand = '';
      this.currentOperand = '';
      this.operation = undefined;
      this.readyToReset = false;
   }

   delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
   }

   appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) {
         return;
      }
      this.currentOperand = this.currentOperand.toString() + number.toString();
   }

   chooseOperation(operation) {
      if (operation === '') {
         return;
      }
      if (this.currentOperand !== '' && this.previousOperand !== '') {
         this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
   }

   compute() {
      let computation;
      let prev = parseFloat(this.previousOperand);
      let current = parseFloat(this.currentOperand);

      if (isNaN(prev) || isNaN(current)) {
         return;
      }

      switch (this.operation) {
         case '+':
            computation = prev + current;
            break;
         case '-':
            computation = prev - current;
            break;
         case '÷':
            computation = prev / current;
            break;
         case '×':
            computation = prev * current;
            break;
         case '^':
            computation = prev ** current;
            break;

         default:
            return;
      }
      this.readyToReset = true;
      this.currentOperand = +computation.toFixed(5);
      this.operation = undefined;
      this.previousOperand = '';
   }

   sqrt() {
      const prev = parseFloat(this.currentOperand);
      if (prev < 0) {
         this.currentOperand = 'err!';
      }
      this.currentOperand = Math.sqrt(prev);
   }

   min(minus) {
      if (!this.currentOperand) {
         return;
      }
      this.currentOperand = 0 - this.currentOperand;
   }

   getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
         integerDisplay = '';
      } else {
         integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0
         });
      }
      if (decimalDigits != null) {
         return `${integerDisplay}.${decimalDigits}`;
      } else {
         return integerDisplay;
      }
   }

   updateDisplay() {
      if (isNaN(this.currentOperand)) {
         this.currentOperandTextElement.innerText = 'error!';
      } else {
         this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
         if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
         } else {
            this.previousOperandTextElement.innerText = '';
         }
      }
   }
}

const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const sqrtButton = document.querySelector('[data-sqrt]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const minButton = document.querySelector('[data-min]');
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButton.forEach(button => {
   button.addEventListener('click', () => {
      if (calculator.previousOperand === "" &&
         calculator.currentOperand !== "" &&
         calculator.readyToReset) {
         calculator.currentOperand = "";
         calculator.readyToReset = false;
      }

      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
   });
});

operationButton.forEach(button => {
   button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
   });
});

equalsButton.addEventListener('click', button => {
   calculator.compute();
   calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
   calculator.clear();
   calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
   calculator.delete();
   calculator.updateDisplay();
});

sqrtButton.addEventListener('click', button => {
   calculator.sqrt();
   calculator.updateDisplay();
});

minButton.addEventListener('click', button => {
   calculator.min('-');
   calculator.updateDisplay();
});



