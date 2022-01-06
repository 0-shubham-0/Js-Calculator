class Calculator{
    constructor(previousText,currentText){
        this.previousText=previousText;
        this.currentText=currentText;
        this.clear();
    }
    clear(){
        this.currentOperand='';
        this.previousOperand='';
        this.operation=undefined;
    }
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand+=number
    }
    chooseOperation(operation){
        if(this.currentOperand===''&&this.previousOperand==='')return
        if(this.previousOperand!==''){
            this.compute()
        }
        if(this.previousOperand!==''){
            this.operation=operation
            this.previousOperand=this.previousOperand.toString().slice(0,-1)+operation
            this.currentOperand=''
        }
        if (this.currentOperand!==''){
        this.operation=operation
        this.previousOperand=this.currentOperand+operation
        this.currentOperand=''
        }
        
    }
    compute(){
        let com
        const prev =parseFloat(this.previousOperand)
        const cur = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(cur)) return
        switch(this.operation){
            case '+':
                com=prev+cur
                break
            case '-':
                com=prev-cur
                break
            case '/':
                com=prev/cur
                break
            case '*':
                com=prev*cur
                break
            default:
                return
        }
        this.currentOperand=com
        this.operation=undefined
        this.previousOperand='';
    }
    updateDisplay(){
        this.currentText.innerText = this.currentOperand
        this.previousText.innerText = this.previousOperand
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const ACButton = document.querySelector('[data-AC]');
const previousText = document.querySelector('[data-previous]');
const currentText = document.querySelector('[data-current]');

const calculator = new Calculator(previousText,currentText);


numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerHTML);
        console.log(button.innerText)
        calculator.updateDisplay();
    })
})
operatorButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerHTML);
        console.log(button.innerText)
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', button=>{
    calculator.compute()
    calculator.updateDisplay()
})

ACButton.addEventListener('click', button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click' ,button=>{
    calculator.delete()
    calculator.updateDisplay()
})