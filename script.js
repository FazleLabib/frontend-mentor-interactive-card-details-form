// Common container for input elements
const formContainer = document.getElementById("form");

// Card output constants
const cardNum = document.getElementById("card-number");
const cardName = document.getElementById("cardholder-name");
const cardMonth = document.getElementById("card-month");
const cardYear = document.getElementById("card-year");
const cardCVC = document.getElementById("show-cvc");

// Form input constants
const username = document.getElementById("name");
const number = document.getElementById("number");
const expMonth = document.getElementById("exp-month");
const expYear = document.getElementById("exp-year");
const cvc = document.getElementById("cvc");

// Error-validation constants
const emptyName = document.getElementById("empty-cname");
const emptyNumber = document.getElementById("empty-cnum");
const emptyExp = document.getElementById("empty-exp");
const emptyCVC = document.getElementById("empty-cvc");
const formatName = document.getElementById("format-cname");
const formatNum = document.getElementById("format-cnum");
const formatExp = document.getElementById("format-exp");
const invalidExp = document.getElementById("invalid-month");
const formatCVC = document.getElementById("format-cvc");

// Buttons
const submitBtn = document.getElementById("submit");

// Divs
const formDiv = document.getElementById("form-input");
const successDiv = document.getElementById("success");


// Constants for default values
const DEFAULT_CARD_NUMBER = "0000 0000 0000 0000";
const DEFAULT_CARD_NAME = "Jane Appleseed";
const DEFAULT_CARD_MONTH = "00";
const DEFAULT_CARD_YEAR = "00";
const DEFAULT_CARD_CVC = "000";

// Functions to update card output
function updateCardNumber(value) {
    cardNum.innerHTML = value || DEFAULT_CARD_NUMBER;
}
  
function updateCardName(value) {
    cardName.innerHTML = value || DEFAULT_CARD_NAME;
}
  
function updateCardMonth(value) {
    cardMonth.innerHTML = value || DEFAULT_CARD_MONTH;
}
  
function updateCardYear(value) {
    cardYear.innerHTML = value || DEFAULT_CARD_YEAR;
}
  
function updateCardCVC(value) {
    cardCVC.innerHTML = value || DEFAULT_CARD_CVC;
}

// Event listener for form input
formContainer.addEventListener("input", (event) => {
    const inputElement = event.target;
    switch (inputElement.id) {
      case "number":
        updateCardNumber(inputElement.value.replace(/(\w{4})(?=\w)/g, '$1 '));
        break;
      case "name":
        updateCardName(inputElement.value);
        break;
      case "exp-month":
        updateCardMonth(inputElement.value);
        break;
      case "exp-year":
        updateCardYear(inputElement.value);
        break;
      case "cvc":
        updateCardCVC(inputElement.value);
        break;
    }
});

// shows success card if all information is valid
function displaySuccess(event) {
    event.preventDefault();

    let error = checkErrors();

    console.log(successDiv);
    if (error[0] || error[1]) {
        successDiv.style.display = "none";
        formDiv.style.display = "flex";
    } else {
        successDiv.style.display = "flex";
        formDiv.style.display = "none";
    }


}

// checks for format and invalid inputs
function checkErrors() {
    const nameValue = username.value;
    const numberValue = number.value;
    const monthValue = expMonth.value;
    const yearValue = expYear.value;
    const cvcValue = cvc.value;    

    emptyFlags = checkEmpty(nameValue, numberValue, monthValue, yearValue, cvcValue);

    let invalidName = false;
    let invalidNum = false;
    let invalidMonth = false;
    let invalidYear = false;
    let invalidCVC = false;

    const alphaPattern = /[^a-zA-Z\s]/; // matches if string has only alphabets and spaces
    const numPattern = /^\d+$/; //matches only numbers

    if (!emptyFlags[0]) {
        if (alphaPattern.test(nameValue)) {
            formatName.style.display = 'block';
            invalidName = true;
        } else {
            formatName.style.display = 'none';
            invalidName = false;
        }
    } else{
        formatName.style.display = 'none';
    }

    if (!emptyFlags[1]) {
        if (!numPattern.test(numberValue)) {
            formatNum.style.display = 'block';
            invalidNum = true;
        } else {
            formatNum.style.display = 'none';
            invalidNum = false;
        }
    } else{
        formatNum.style.display = 'none';
    }

    if (!emptyFlags[2]) {
        if (!numPattern.test(monthValue) || parseInt(monthValue) > 12) {
            if (!numPattern.test(monthValue)) {
                formatExp.style.display = 'block';
                invalidExp.style.display = 'none';
                invalidMonth = true;
            } else {
                formatExp.style.display = 'none';
                invalidExp.style.display = 'block';
                invalidMonth = true;
            }
        } else {
            formatExp.style.display = 'none';
            invalidExp.style.display = 'none';
            invalidMonth = false;
        }
    } else {
        formatExp.style.display = 'none';
        invalidExp.style.display = 'none';
    }

    if (!emptyFlags[3]) {
        if (!numPattern.test(yearValue)) {
            formatExp.style.display = 'block';
            invalidYear = true;
        } else {
            formatExp.style.display = 'none';
            invalidYear = false;
        }
    } else {
        formatExp.style.display = 'none';
    }

    if (!emptyFlags[4]) {
        console.log("entered");
        if (!numPattern.test(cvcValue)) {
            formatCVC.style.display = 'block';
            invalidCVC = true;
        } else {
            formatCVC.style.display = 'none';
            invalidCVC = false;
        }        
    } else {
        formatCVC.style.display = 'none';
    }


    let invalidFlags = [invalidName, invalidNum, invalidMonth, invalidYear, invalidCVC]

    return [emptyFlags.some(Boolean), invalidFlags.some(Boolean)];
}

// Checks if input field is empty
function checkEmpty(nameValue, numberValue, monthValue, yearValue, cvcValue) {

    let nameFlag = displayEmptyMessage(emptyName, nameValue === "");
    let numFlag = displayEmptyMessage(emptyNumber, numberValue === "");
    let expiryFlag = displayEmptyMessage(emptyExp, monthValue === "" || yearValue === "");
    let cvcFlag = displayEmptyMessage(emptyCVC, cvcValue === "");

    return [nameFlag, numFlag, expiryFlag, expiryFlag, cvcFlag];
}

function displayEmptyMessage(emptyElement, isEmpty) {
    if (isEmpty) {
        emptyElement.style.display = 'block';
        return true;
    } else {
        emptyElement.style.display = 'none';
        return false;
    }
}


submitBtn.addEventListener("click", displaySuccess);