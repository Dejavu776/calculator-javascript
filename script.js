let calcDisplay = document.querySelector(".calc-display");
const btnWrapper = document.querySelector(".calc-key");

class Calculator {
  #clickValue = "";
  #displayValue = "";
  #memoryValue = "";
  #operantValue = "";

  constructor() {
    this._getButtonValue();
  }

  _main() {
    const operants = ['+','-','*','/','=']; 

    if (operants.includes(this.#clickValue)){
      this._compute();
    } 

    //render display value
    if ((!(operants.includes(this.#clickValue))) &&  (!(this.#clickValue === 'delete'))) {
      this._displayValue();
    }

    //delete all variables
    if ((this.#clickValue === 'delete')){
      this._delete();
    } 
  }


  //control state variables before compute
  _compute() {
    //check if the value is higher than the allowed number size
    if ((this.#memoryValue === "") && (this.#displayValue === "")) {
      this._checkValue()
      calcDisplay.textContent = "E"
    }

    //there is no previous number
    if ((this.#memoryValue === "") && (!(this.#displayValue === ""))) {
      this.#memoryValue = this.#displayValue
      this.#displayValue = ""
      console.log("save value to memory")
      this._checkValue()
    }

    //changes the last selected operator
    if ((!(this.#memoryValue === "")) && ((this.#displayValue === ""))) {
      (!(this.#clickValue === '=')) ? this.#operantValue = this.#clickValue : null
      this._checkValue()
    }


    //both numbers are saved
    if ((!(this.#memoryValue === "")) && (!(this.#displayValue === ""))) {
      this._checkValue()
      this.#displayValue = this._computeLogic(+this.#memoryValue, +this.#displayValue, this.#operantValue)
      this._afterCompute()
    }
  }


  _computeLogic(value1,value2,operant) {
    return operant ==='+' ? value1 + value2 
    : operant ==='-' ? value1 - value2 
    : operant ==='*' ? value1 * value2
    : operant ==='/' ? value1 / value2
    : null
  }
  

  //render a numeric value on the display
  _displayValue() {
    if ((this._numberOfDigits(this.#displayValue) < 9) &&
    (!(this.#clickValue === "."))){
      this.#displayValue = this.#displayValue.concat("", this.#clickValue)
      this.#displayValue = this._deleteZeroNumbers(this.#displayValue)
      calcDisplay.textContent = this.#displayValue;
    }

    if ((this._numberOfDigits(this.#displayValue) < 9) &&
    ((this.#clickValue === "."))){
      this.#displayValue = this.#displayValue.concat("", this.#clickValue);
      calcDisplay.textContent = this.#displayValue;
    }
  }

  //sends information about the pressed button (etc. 2, 5 or =)
  _getButtonValue() {
    btnWrapper.addEventListener("click", (btn) => {
      const buttonId = document.getElementById(btn.target.id).id;
      let value = buttonId.substring(buttonId.indexOf("_") + 1);
      this.#clickValue = value;
      this._main();
    });
  }


  //returns the length of the number
  _numberOfDigits(inputValue) {
    inputValue = inputValue.toString()
    let numberLength = inputValue.replace(".", "").length;
    return numberLength;
  }


  //checks that the number does not start with zeros etc. 0005235.525 and transform ->5235.525
  _deleteZeroNumbers(inputValue){
    inputValue = inputValue.toString()
    if (!(inputValue.includes('.'))){
      inputValue = Number.parseFloat(inputValue);
      inputValue = inputValue.toString()
      return inputValue
    } 
    
    if (inputValue.includes('.')) {
      return inputValue
    }
  }


//catch some compute Errors
  _computeError(inputValue) {
    if (this._numberOfDigits(inputValue) > 9) {
      if ((inputValue > 999999999)|| (inputValue < 0.00000001)) {
        inputValue = "E";
        return inputValue
      } else {
        inputValue = inputValue.toPrecision(9)
        return inputValue
      }
    } else if (!(Number.isFinite(inputValue))){
      return inputValue
    } else {
      return inputValue
    }
  }

  //when the AC key is pressed, delete all variables
  _delete() {
    this.#clickValue = "";
    this.#displayValue = "";
    this.#memoryValue = "";
    this.#operantValue = "";
    calcDisplay.textContent = "0";
  }


  //reconfiguring variables in fields after calculation
  _afterCompute(){
    this.#displayValue = this._computeError(this.#displayValue)
    calcDisplay.textContent = this.#displayValue
    this.#memoryValue = this.#displayValue
    this.#displayValue = ""
    this.#operantValue = this.#clickValue
    this._checkValue()
  }

  //debugging method
  _checkValue() {
    console.log(`hodnota memoryValue je ${this.#memoryValue},`,`hodnota displayValue je ${this.#displayValue},`,`hodnota operantValue je ${this.#operantValue}`)
  }
}

const calc = new Calculator();