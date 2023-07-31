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

    //choose right math operation
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

      this.#operantValue = this._changeOperant(this.#clickValue)

      console.log("uložení hodnoty do paměti")
      this._checkValue()
    }

    //changes the last selected operator
    if ((!(this.#memoryValue === "")) && ((this.#displayValue === ""))) {
      this.#operantValue = this._changeOperant(this.#clickValue)
      this._checkValue()
    }


    //both numbers are saved
    if ((!(this.#memoryValue === "")) && (!(this.#displayValue === ""))) {
      this._checkValue()
      this._computeLogic()

    }
  }

  //choose right mathematic operation
  _computeLogic(){
    if (this.#operantValue==='+'){
      this.#displayValue = this._plus(+this.#memoryValue,+this.#displayValue)
      this._afterCompute()
    }

    if (this.#operantValue==='-'){
      this.#displayValue = this._minus(+this.#memoryValue,+this.#displayValue)
      this._afterCompute()
    }

    if (this.#operantValue==='*'){
      this.#displayValue = this._multiplicate(+this.#memoryValue,+this.#displayValue)
      this._afterCompute()
    }

    if (this.#operantValue==='/'){
      this.#displayValue = this._divide(+this.#memoryValue,+this.#displayValue)
      this._afterCompute()
    }
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
    console.log(this.#displayValue,this.#memoryValue)
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
    //console.log(typeof inputValue);
    inputValue = inputValue.toString()
    let numberLength = inputValue.replace(".", "").length;
    return numberLength;
  }

  //checks that the number does not start with zeros etc. 0005235.525
  _deleteZeroNumbers(inputValue){
    inputValue = Number.parseFloat(inputValue);
    inputValue = inputValue.toString()
    return inputValue
  }

  //generate "E" value if 
  _lenghtError(inputValue) {
    if (this._numberOfDigits(inputValue) > 9) {
      console.log(inputValue,typeof inputValue)
      inputValue = "E";
      return inputValue
    } else{
      return inputValue
    }
  }

  _plus(value1,value2) {
    let outputValue  = value1 + value2
    return outputValue
  }

  _minus(value1,value2) {
    let outputValue = value1 - value2
    return outputValue
  }

  _multiplicate(value1,value2) {
    let outputValue = value1 * value2
    return outputValue
  }

  _divide(value1,value2) {
    let outputValue = value1/value2
    return outputValue
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
    this.#displayValue = this._lenghtError(this.#displayValue)
    calcDisplay.textContent = this.#displayValue
    this.#memoryValue = this.#displayValue
    this.#displayValue = ""
    this.#operantValue = this.#clickValue
    this._checkValue()
  }

  //change operant if not "="
  _changeOperant(inputValue) {
    if (!(inputValue === '=')){
      let outputValue = inputValue
      return outputValue
    }
  }

  //debugging method
  _checkValue() {
    console.log(`hodnota memoryValue je ${this.#memoryValue},`,`hodnota displayValue je ${this.#displayValue},`,`hodnota operantValue je ${this.#operantValue}`)
  }
}

const calc = new Calculator();