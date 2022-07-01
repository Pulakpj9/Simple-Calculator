/* --------------------------------- Declaration of all global variable ------------------------------------------ */

var str = "";
var ans = 0;
const operators = ["+", "-", "x", "/", "^"];
const operands = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9","π","(", ")"];

/* --------------------------------- Functions Used to create string and covert them to correct form -------------- */

function isValidInString(c) {                      // function check whether a letter is valid to be added in string or not.
  if (
    (str.length == 0 && operators.includes(c)) ||
    (operators.includes(c) && operators.includes(str[str.length - 1])) ||
    (!operators.includes(c) && !operands.includes(c))
  ) {
    return false;
  } else {
    return true;
  }
}

function inputString(s) {                          // Function to add character into string after validating it.
  if (isValidInString(s)) {
    str += s;
    document.getElementById("inputsection").innerHTML = str;
    document.getElementById("inputsection").style.color = "white";
    document.getElementById("inputsection").style.fontSize = "4vh";
    document.getElementById("function-4").style.color = "green";
  } else {
    alert("Invalid");
  }
}

function converstionOfStringToCorrectForm(){       // Function to covert string to correct form

  let tempStr='';

  for(let i=0;i<str.length;i++){
      if(str[i]=='x'){
          tempStr+='*';
      }
      else if(str[i]=='^'){
          tempStr+="**";
      }
      else if(str[i]=='π'){
          tempStr+="3.14";
      }
      else{
          tempStr+=str[i];
      }
  }

  return tempStr;
}


/* -------------------------------- Functions used for keys ---------------------------- */

function backSpace() {                             // Function to add backspace functionality  
  str = str.substr(0, str.length - 1);
  document.getElementById("inputsection").innerHTML = str;
  if (str.length == 0) {
    document.getElementById("function-4").style.color = "black";
  } else {
    document.getElementById("function-4").style.color = "green";
  }
  stringCalculation(converstionOfStringToCorrectForm());
}

function clearScreen() {                           // Function to reset all values
  ans = 0;
  str = "";
  document.getElementById("answersection").innerHTML = "";
  document.getElementById("inputsection").innerHTML = "";
  document.getElementById("function-4").style.color = "black";
  document.getElementById("inputsection").style.color = "white";
  document.getElementById("inputsection").style.fontSize = "4vh";
}

function areBracketsBalance() {                    // Function to check brackets are balance to know to add required bracket 
  let leftBracketCount = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] == "(") {
      leftBracketCount++;
    } else if (str[i] == ")") {
      leftBracketCount--;
    }
  }

  if (leftBracketCount == 0) {
    return true;
  } else {
    return false;
  }
}

function brackets() {                              // Function to add brackets by checking valid bracket to add
  if (operators.includes(str[str.length - 1]) || str.length == 0) {
    str += "(";
  } else if (areBracketsBalance()) {
    str += "x(";
  } else if (operands.includes(str[str.length - 1])) {
    str += ")";
  }
  document.getElementById("function-4").style.color = "green";
  document.getElementById("inputsection").innerHTML = str;
}

function validDecimal() {                          // function to check whether we can add decimal or not
  let i = str.length - 1;
  while (!operators.includes(str[i]) && i >= 0) {
    if (str[i] == ".") {
      return false;
    }
    i--;
  }
  return true;
}

function decimalExperession() {                    // function to add decimal
  if (!operands.includes(str[str.length - 1]) && validDecimal()) {
    console.log(str[str.length - 1]);
    str += "0.";
  } else if (validDecimal()) {
    str += ".";
  }

  document.getElementById("inputsection").innerHTML = str;
  document.getElementById("inputsection").style.color = "white";
  document.getElementById("inputsection").style.fontSize = "4vh";
}

function finalAnswer() {                           // function to print final answer
  stringCalculation(converstionOfStringToCorrectForm());
  document.getElementById("answersection").innerHTML = "";
  document.getElementById("inputsection").innerHTML = ans;
  document.getElementById("inputsection").style.color = "green";
  document.getElementById("inputsection").style.fontSize = "8vh";
  str = "";
  str += ans;
}

/* ------------------------------------------ Functions to evaluate the string ---------------------------------- */

function stringCalculation(s){

    if(operands.includes(str[str.length-1])){
        ans=eval(s);
        document.getElementById("answersection").innerHTML = ans;
    }
    else{
        document.getElementById("answersection").innerHTML = "";
    }
}

/* --------------------------------- At initial keeping backspace key hidden ------------------------------------- */

document.getElementById("function-4").style.color = "black";

/* -------------------------------- Adding functionality to keys on occurance of on click event on keys ---------- */

document.querySelectorAll(".key").forEach((item) => {            // Adding functionality of all keys except backspace key
  item.addEventListener("click", (event) => {
    if (operators.includes(item.id)) {                           // Adding functionality to all operators key
      inputString(item.id);
      document.getElementById("answersection").innerHTML = "";
    } else if (operands.includes(item.id)) {                     // Adding functionality to all operands key
      inputString(item.id);
      stringCalculation(converstionOfStringToCorrectForm());
    } else if (item.id == ".") {                                 // Adding functionality to decimal key
      decimalExperession();
    } else if (item.id == "clearKey") {                          // Adding functionality to clear key
      clearScreen();
    } else if (item.id == "equalsKey") {                         // Adding functionality to equals to key
      finalAnswer();
    } else if (item.id == "bracketsKey") {                       // Adding functionality to brackets key
      brackets();
    }
  });
});

document.getElementById("function-4").addEventListener("click", () => {  // Adding backspace functionality to backspacekey
  backSpace(str);
});

/* -------------------------------- Adding functionality to keys on occurance of keydown event ------------------ */

window.addEventListener("keydown", function (event) {         // Adding functionality to all keys on key press
  
  if (operators.includes(event.key)) {                        // Adding functionality to all operators key on operator key press
    inputString(event.key);
    document.getElementById("answersection").innerHTML = "";  
  }else if (event.key == '*') {                               // Adding 'x' operator keydown operation while on press of '*' key
    inputString("x");
    document.getElementById("answersection").innerHTML = "";  
  } else if (operands.includes(event.key)) {                  // Adding functionality to all operands key on operand key press
    inputString(event.key);
    stringCalculation(converstionOfStringToCorrectForm());
  } else if (event.key == "Backspace") {                      // Adding backspace functionality on backspace key press
    backSpace();
  } else if (event.key == "Delete") {                         // Adding ClearScreen functionality on "Delete" key press
    clearScreen();
  } else if (event.key == ".") {                              // Adding functionality to decimal key on decimal key press
    decimalExperession();
  } else if (event.key == "Enter") {                          // Adding functionality to enter key on enter key press
    finalAnswer();
  }
});