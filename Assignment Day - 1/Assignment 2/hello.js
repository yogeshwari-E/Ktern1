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
    // console.log((typeof referenceObject[key]), referenceObject[key] )
    
    if (!(key in inputObject)) {
      
      console.log(`Error: ${key} not present`);
    }
    else if (key === 'stakeholders') {
      if (!Array.isArray(inputObject[key])) {
        console.log(`Error: ${key} should be of datatype Array but it was ${typeof inputObject[key]}`);
      } else {
        // Validate each item in the array
        inputObject[key].forEach((item, index) => {
          if (typeof item !== 'string') {
            console.log(`Error: ${key}[${index}] should be of datatype String but it was ${typeof item}`);
          }
        });
      }
    } 
    else if (key === 'status') {
      if (typeof inputObject[key] !== 'object') {
        console.log(`Error: ${key} should be of datatype Object but it was ${typeof inputObject[key]}`);
      } else {
        // Validate each property in the nested object
        const statusReference = referenceObject[key];
        for (const prop in statusReference) {
          if (!(prop in inputObject[key])) {
            console.log(`Error: ${key}.${prop} not present`);
          } else if (typeof inputObject[key][prop] !== typeof statusReference[prop]) {
            console.log(`Error: ${key}.${prop} should be of datatype ${typeof statusReference[prop]} but it was ${typeof inputObject[key][prop]}`);
          }
        }
      }
    } 
    else if (key === 'plannedFrom' || key === 'plannedTo') {
      // Check if the value is a valid date
      if (typeof inputObject[key] !== 'string' || isNaN(Date.parse(inputObject[key]))) {
        console.log(`Error: ${key} should be of datatype Date but it was ${typeof inputObject[key]}`);
      }
    } 
     else if (typeof inputObject[key] !== typeof referenceObject[key]) {
      console.log(`Error: ${key} should be of datatype ${typeof referenceObject[key]} but it was ${typeof inputObject[key]}`);
    }
  }
}

// TEST WITH DIFFERENT OBJECTS
let testObject1 = {
  duration: "8", // Incorrect datatype for duration
  plannedFrom: "Hello",
  plannedTo: "2024-01-04T06:03:34.915+00:00",
  stakeholders: ["personA", {}, "personC"],
  status: {
    workItem: "Task",
    status: 'Approved',
    category: 8,
    mailTrigger: true
  },
  active: true
};

let testObject2 = {
  title: "Prepare document",
  duration: 8,
  plannedFrom: "hello",
  plannedTo: "2024-01-04T06:03:34.915+00:00",
  stakeholders: ["personA", "personB", "personC"],
  // status key is missing
  active: true
};

validateInput(testObject1);
// validateInput(testObject2);
