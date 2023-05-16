const body = document.querySelector('body');
const title = document.querySelector("#title");
const containerCalc = document.querySelector("#container");

const displayCalc = document.querySelector("display");
const buttonsContainer = document.querySelector("buttons");


const allButtons = buttonsContainer.querySelectorAll("input");
const buttonNumbers = buttonsContainer.querySelectorAll(".number");
const operatorNumber = buttonsContainer.querySelectorAll(".operator");
const clearAllButton = buttonsContainer.querySelectorAll('.clearButton');

const displayTop = document.querySelector('#display-top');
const displayBottom = document.querySelector('#display-bottom');
const displayRecords = document.querySelector("#displayRecords");

const equalButton = document.querySelector("#equal");

const clearHistoryButton = document.querySelector("#clearHistory");

let operations = [];
let index = 0;
let tempOperation = '';
let result = undefined;
let tempResult = undefined;
let singleOperationState = false;
let records = [];
let triedToDivideBy0 = false;
let displayRecordsState = false;
let defaultThemes = ['default', 'universe', 'onePiece', 'elegant'];
let actualTheme = 'default';

function extractInfoAndAddObjToRecords(toExtractFrom) { //Prendendo info, creando oggetto e push to records
    let firstNumber = toExtractFrom[0];
    let secondNumber = toExtractFrom[2];
    let operand = toExtractFrom[1];
    let resultToStore = result;

    const objectCreated = new operationRecord(firstNumber, secondNumber, operand, resultToStore);
    records.push(objectCreated);
}

function operationRecord(numberA, numberB, operand, result) { //Creando oggeto operation to ease the addition to the array 
    this.numberA = numberA;
    this.numberB = numberB;
    this.operand = operand;
    this.result = result;
}

document.addEventListener('DOMContentLoaded', firstLaunch());

function firstLaunch() {
    applyStyle('default');
}

allButtons.forEach(button => {
    button.addEventListener("click", () => {
        manageAction(button);
    });
})

clearHistoryButton.addEventListener('click', () => {
    deleteHistoryDisplay();
});

function deleteHistoryDisplay() {
    removeRecordDisplay();
    displayRecords.appendChild(clearHistoryButton);
    manageClear('AC');
    records = [];
}

function manageResult(result) { //Deleting and setting variables to their default set!, and addding result to array
    clearArray(operations);
    index = 0;
    operations[index] = result;
    result = undefined;
}

function clearArray(arrayToClean) { //Cleaning opeartions array to start a new operation
    operations = [];
}

function setRecordDisplay() {
    for (let i = 0; i < records.length; i++) {
        let div = document.createElement("div");
        div.textContent = `${records[i].numberA} ${records[i].operand} ${records[i].numberB} = ${records[i].result}`;
        displayRecords.appendChild(div);
    }
    displayRecords.appendChild(clearHistoryButton);
}

function removeRecordDisplay() {
    while (displayRecords.firstChild) {
        displayRecords.removeChild(displayRecords.firstChild);
    }
}

function manageStyle(nameTheme) {
    let themeToApply = undefined;
    if (nameTheme) {
        themeToApply = nameTheme;
    } else {
        while (true) {
            themeToApply = generateRandomIndex(defaultThemes);
            if (themeToApply !== actualTheme) {
                break;
            }
        }

    }
    removeStyle(actualTheme);
    applyStyle(themeToApply);
}

function removeStyle(themeToRemove) {
    if (themeToRemove === 'default') {
        defaultRemove();
    } else if (themeToRemove === 'universe') {
        universeRemove();
    } else if (themeToRemove === 'onePiece') {
        onePieceRemove();
    } else if (themeToRemove === 'elegant') {
        elegantRemove();
    }
}

function universeTheme() { //Container, buttons, title and background! Maybe the display history too! Later I guess
    defaultTheme();
    body.classList.add("universeBack");
    containerCalc.classList.add("universeContainer");
    displayCalc.classList.add('universeDisplay');
    displayCalc.classList.add('displayBorders');
    title.classList.add("universeTitle");
    buttonsContainer.classList.add("buttonsUniverse");
    buttonsContainer.classList.add("buttonsBorders");
    displayRecords.style.borderRadius = '20px 0px 0px 20px';

    if (displayRecordsState) {
        containerCalc.style.borderRadius = "0px 20px 20px 0px";
    } else {
        containerCalc.classList.add("containerBorders");
    }

    /*for (let i = 0; i < allButtons.length; i++) { //Aggiungendo classi agi bottoni rendeva il programma obsoleto!
        allButtons[i].classList.add('universeButtons');
        allButtons[i].classList.add('buttonsBorders');
    }*/
    equalButton.style.borderRadius = '15px';
    equalButton.classList.add("equalUniverse");
    displayRecords.classList.add("displayRecordsUniverse");
}
/////////////////////////////Manca anime theme and universe, elegant el display record//////////////////////////////////////
function universeRemove() {
    body.classList.remove("universeBack");
    containerCalc.classList.remove("universeContainer");
    displayCalc.classList.remove('universeDisplay');
    displayCalc.classList.remove('displayBorders');
    title.classList.remove("universeTitle");
    buttonsContainer.classList.remove("buttonsUniverse");
    buttonsContainer.classList.remove("buttonsBorders");

    if (displayRecordsState) {
        displayRecords.style.borderRadius = '20px 0px 0px 20px';
        containerCalc.style.borderRadius = "0px 20px 20px 0px";
    } else {
        containerCalc.classList.remove("containerBorders");
        displayRecords.style.borderRadius = '0px';
    }
    equalButton.classList.remove("equalUniverse");
    displayRecords.classList.remove("displayRecordsUniverse");
}

function onePieceTheme() {
    body.classList.add("onePieceBack");
    containerCalc.classList.add("onePieceContainer");
    displayCalc.classList.add('onePieceDisplay');
    displayTop.classList.add("displayTopOnePiece");
    buttonsContainer.classList.add('buttonsOnePiece');
    title.classList.add('titleOnePiece');
    displayRecords.classList.add("displayRecordsOnePiece");
}

function onePieceRemove() {
    body.classList.remove("onePieceBack");
    containerCalc.classList.remove("onePieceContainer");
    displayCalc.classList.remove('onePieceDisplay');
    displayTop.classList.remove("displayTopOnePiece");
    buttonsContainer.classList.remove('buttonsOnePiece');
    title.classList.remove('titleOnePiece');
    displayRecords.classList.remove("displayRecordsOnePiece");
}

function elegantTheme() {
    body.classList.add("elegantBack");
    containerCalc.classList.add('elegantThemeContainer');
    buttonsContainer.classList.add('elegantThemeButtons');
    title.classList.add('elegantTitle');
    buttonsContainer.classList.add('buttonsElegant');
    displayCalc.classList.add('elegantDisplay');
    displayRecords.classList.add('displayRecordsElegant');
    title.classList.add('elegantTitle');
}

function elegantRemove() {
    body.classList.remove("elegantBack");
    containerCalc.classList.remove('elegantThemeContainer');
    buttonsContainer.classList.remove('elegantThemeButtons');
    title.classList.remove('elegantTitle');
    buttonsContainer.classList.remove('buttonsElegant');
    displayCalc.classList.remove('elegantDisplay');
    displayRecords.classList.remove('displayRecordsElegant');
    title.classList.remove('elegantTitle');
}

function applyStyle(theme) { //Later
    if (theme === 'default') {
        defaultTheme();
    } else if (theme === 'universe') {
        universeTheme();
    } else if (theme === 'onePiece') {
        onePieceTheme();
    } else if (theme === 'elegant') {
        elegantTheme();
    }
    actualTheme = theme;
}

function defaultTheme() { //Default theme, less to do!
    title.classList.add('defaultTitle');
    buttonsContainer.classList.add("buttonsDefault");
}

function defaultRemove() { //Default theme, less to do!
    title.classList.remove('defaultTitle');
    buttonsContainer.classList.remove("buttonsDefault");

}

function generateRandomIndex(array) {
    return array[Math.floor(Math.random() * array.length)];
}


function manageAction(action) {
    const actionClassName = action.className.toString();
    const actionValueButton = action.value.toString();
    if (actionClassName === 'extraButton') { //Check for ! or ? 
        console.log('caaaaaaaaaaaaaaaa2');
        if (actionValueButton === "!") {
            if (displayRecordsState) {
                console.log('caaaaaaaaaaaaaaaa');

                displayRecordsState = false;
                displayRecords.classList.remove('recordsMoveOn');
                removeRecordDisplay();
            } else {
                displayRecords.classList.add('recordsMoveOn');
                displayRecordsState = true;
                setRecordDisplay();
            }
        }

        if (actionValueButton === "?") {
            manageStyle();
        }
        return;
    }

    if (triedToDivideBy0) { //Manage divison by 0
        if (actionValueButton === 'DEL') {
            manageClear('DEL');
            printBottom(operations[1]);
            printTop(getCopyOperation(operations));
        } else {
            manageClear('AC');
        }
        triedToDivideBy0 = false;
        return;
    }

    if (actionValueButton === '=') { //Manage result triggered by =
        if (operations.length < 2) {
            return;
        }
        if (singleOperationState) {
            result = resultRequested('single');
            singleOperationState = false;
        } else {
            result = resultRequested('multi'); //Il result di tipo torna qua!
        }
        extractInfoAndAddObjToRecords(operations);
        manageResult(result);
        printTop(operations[index]);
        printBottom('');

        removeRecordDisplay(); //To avoid duplicate results
        setRecordDisplay();//To write results on displa historu

        return;
    }

    if (actionClassName === 'clearButton') { //If a clear button is pressed trigger this
        manageClear(actionValueButton); //KIND OF clear
    }


    if (singleOperationState && operations.length === 2 && actionClassName !== "number") { // Hacer que el result de los singles operations sean tratados como multi operations
        result = tempResult;
        tempResult = undefined;
        singleOperationState = false;
        extractInfoAndAddObjToRecords(operations);
        manageResult(result);
        printBottom(operations[index]);
    }

    if (operations.length >= 3 && actionClassName !== "number") { //Once the array has three elements operate to get a result
        result = tempResult;
        tempResult = undefined;
        extractInfoAndAddObjToRecords(operations);
        manageResult(result);
        printBottom(operations[index]);

        removeRecordDisplay(); //To avoid duplicate results
        setRecordDisplay();//To write results on displa historu
    }


    if (actionClassName === "number" || actionClassName === "operator") {
        if (actionClassName === "number") {
            if (tempOperation !== '' && operations[index] !== undefined) { //Para cellar el symbol operator
                //operations.pop();
                //index++; //Si no hay index++ in operator!
                operations[index] = tempOperation;
                index++;
                tempOperation = "";
            }

            if (operations[index] !== undefined) { //Se nell'index c'è smth concatena!
                let temp = operations[index];
                operations[index] = temp.concat(actionValueButton);
            }

            if (operations[index] === undefined) {  //Se non c'è nnt in index, assegna elemento!
                operations[index] = actionValueButton;
            }

        }
        if (actionClassName === "operator") {
            if (operations[0] === undefined && actionValueButton !== "x" && actionValueButton !== "%" && actionValueButton !== "." && actionValueButton !== "÷") { //Se nell'index no hay nada, permite el symbolo inicial!
                operations[index] = actionValueButton;
                printBottom(operations[index]); //Permitir que se puede ver el symbolo inicial si existe
                if (actionValueButton === "√" || actionValueButton === "^") {/////////here
                    index++;
                    singleOperationState = true;
                }
                return;
            }

            tempOperation = actionValueButton; //Permite que se pueda apretar diferentes symbolos

            index++;
            if (operations[index - 1] === "+" || operations[index - 1] === "-" || operations[index - 1] === "x" || operations[index - 1] === "÷" || operations[index - 1] === "%" || operations[index - 1] === "." || operations[index - 1] === "^" || operations[index - 1] === "√") {
                index--; //Para que solo no haya symbolos repetidos
            }
            operations[index] = tempOperation;
        }
    }
    printTop(getCopyOperation(operations)); //Stampiamo sopra i numeri che digitiamo, anche gli operatori

    if (singleOperationState && operations.length === 2) { //Risultati per le singole operaizoni!
        tempResult = resultRequested('single');
        printBottom(tempResult);
        return;
    }

    if (actionClassName === 'number' && operations.length >= 3) { //Este para que despues de 2 + 2 al inserir un symbolo calcule un temp resultado
        tempResult = resultRequested('multi');
        if (tempResult === 'Infinity') { //Do not allow to divide by 0!
            printBottom('Cannot divide by 0!');
            triedToDivideBy0 = true;
            return;
        } else {
            printBottom(tempResult);
        }
    }

    if (operations.length < 3) {
        printBottom(operations[index]); //Imprimir los que digitamos
    }
}

/***********************************/
function printTop(toPrint) {
    let toDisplay = '';
    if (Array.isArray(toPrint)) { //Si de emprimir es array concat
        for (let i = 0; i < toPrint.length; i++) {
            if (toPrint[i] === undefined) {
                continue;
            }
            toDisplay += toPrint[i];
        }
    } else { //Si es normal assegnazione a toDispplay
        toDisplay = toPrint;
    }
    displayTop.textContent = toDisplay;
}

function printBottom(toPrint) {
    displayBottom.textContent = toPrint;
}
/***********************************/
function getCopyOperation(arrayToCopy) {
    let copyArray = operations.slice();
    return copyArray;
}
/***********************************/
function resultRequested(triggeredBy) {
    let toCalculate = getNumbersAndOperator();
    let resultToReturn = undefined;

    if (triggeredBy === 'single') {
        let operator = toCalculate[0].toString();
        let number = Number(toCalculate[1]);
        resultToReturn = manageSingleOperation(operator, number);
    }

    if (triggeredBy === "multi") {
        let firstNumber = Number(toCalculate[0]);
        let operand = toCalculate[1].toString();
        let secondNumber = Number(toCalculate[2]);
        resultToReturn = operate(firstNumber, secondNumber, operand);
    }

    return resultToReturn.toString(); //Transform it to string! ///
}

function getNumbersAndOperator() { // get operands in integers
    let toReturn = [];

    for (let i = 0; i < operations.length; i++) {
        toReturn[i] = operations[i];
    }
    return toReturn;
}
/***********************************/
function manageSingleOperation(operator, number) {

    if (operator == "√") {
        return square(number);
    } else if (operator == '^') {
        return power(number, 2);
    }
}

function manageClear(kindOf) { //Creating subString, removing last element of string
    if (operations.length === 0) {
        return;
    } else if (kindOf === "DEL") {
        let temp = operations[index];
        operations[index] = temp.substring(0, temp.length - 1);
    } else if (kindOf === "AC") {
        clearArray(operations);
        result = undefined;
        index = 0;
        printBottom('');
        printTop("");
    }
}
/***********************************/
function operate(numberA, numberB, operation) {
    let tempResult = '';

    switch (operation) {
        case "+":
            tempResult = add(numberA, numberB);
            break;
        case "-":
            tempResult = subtract(numberA, numberB);
            break;
        case "x":
            tempResult = multiply(numberA, numberB);
            break;
        case "÷":
            tempResult = divide(numberA, numberB);
            break;
        case "%":
            tempResult = percentage(numberA, numberB);
            break;
        case "^":
            tempResult = power(numberA, numberB);
            break;
    }
    return tempResult;
}
/**********************************************************************/
function add(a, b) { return a + b; }

function subtract(a, b) { return a - b; }

function multiply(a, b) { return a * b; }

function divide(a, b) { return a / b; }

function percentage(a, b) {
    const percentage = (a * b) / 100;
    return Math.floor(percentage);
}

function power(elevato, number) {
    return Math.pow(elevato, number);
}

function square(number) {
    return Math.sqrt(number);
}
/**********************************/