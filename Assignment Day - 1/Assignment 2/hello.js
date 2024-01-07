// REFERENCE DOCUMENT
let referenceObject = {
  title: "", // String
  duration: 8, // Number
  plannedFrom: "2024-01-04T06:03:34.915+00:00", // Date
  plannedTo: "2024-01-04T06:03:34.915+00:00", // Date
  stakeholders: ["personA", "personB", "personC"], // Array
  status: { // Object
    workItem: "Task", // String
    status: 'Approved', // String
    category: 'Completed', // String
    mailTrigger: true // Boolean
  },
  active: true // Boolean
};

// FUNCTION TO VALIDATE INPUT OBJECT
function validateInput(inputObject) {
  for (let key in referenceObject) {
    if (!(key in inputObject)) {
      console.log(`Error: ${key} not present`);
    } else if (typeof inputObject[key] !== typeof referenceObject[key]) {
      console.log(`Error: ${key} should be of datatype ${typeof referenceObject[key]} but it was ${typeof inputObject[key]}`);
    }
  }
}

// TEST WITH DIFFERENT OBJECTS
let testObject1 = {
  duration: "8", // Incorrect datatype for duration
  plannedFrom: "2024-01-04T06:03:34.915+00:00",
  plannedTo: "2024-01-04T06:03:34.915+00:00",
  stakeholders: ["personA", "personB", "personC"],
  status: {
    workItem: "Task",
    status: 'Approved',
    category: 'Completed',
    mailTrigger: true
  },
  active: true
};

let testObject2 = {
  title: "Prepare document",
  duration: 8,
  plannedFrom: "2024-01-04T06:03:34.915+00:00",
  plannedTo: "2024-01-04T06:03:34.915+00:00",
  stakeholders: ["personA", "personB", "personC"],
  // status key is missing
  active: true
};

validateInput(testObject1);
validateInput(testObject2);
