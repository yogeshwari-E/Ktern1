// VARIABLES
// Declare variables using 'let' keyword
let variable1 = 10;
let variable2 = "Hello, World!";
const constantVariable = 3.14;

// DATATYPES
// Different data types in JavaScript
let numberType = 42;           // Number
let stringType = "Hello";      // String
let booleanType = true;         // Boolean
let arrayType = [1, 2, 3];      // Array
let objectType = {             // Object (JSON)
    key1: "value1",
    key2: "value2"
};

// IF-ELSE
let condition = true;

if (condition) {
    console.log("Condition is true");
} else {
    console.log("Condition is false");
}

// SWITCH CASE
let switchVariable = "case2";

switch (switchVariable) {
    case "case1":
        console.log("This is case 1");
        break;
    case "case2":
        console.log("This is case 2");
        break;
    default:
        console.log("This is the default case");
}

// FOR LOOP
for (let i = 0; i < 5; i++) {
    console.log("Iteration number:", i);
}

// WHILE LOOP
let counter = 0;

while (counter < 5) {
    console.log("While loop iteration:", counter);
    counter++;
}

// LOOP THROUGH JSON OBJECT (DICTIONARIES)
for (let key in objectType) {
    console.log("Key:", key, "Value:", objectType[key]);
}

// FUNCTION DEFINITION
function addNumbers(a, b) {
    return a + b;
}

let result = addNumbers(2, 3);
console.log("Result of adding numbers:", result);

// ASYNC-AWAIT FUNCTIONS
async function fetchData() {
    try {
        let response = await fetch('https://www.kaartech.com/');
        let data = await response.json();
        console.log("Fetched data:", data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call async function
fetchData();
