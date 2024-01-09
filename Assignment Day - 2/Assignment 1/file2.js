import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

// Sample data
const studentsArray = [
    {
        id: 1,
        name: "Arun",
        english: 45,
        maths: 50,
        science: 70,
        computer: 80
    }
];

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

let lastUsedId = 1; 
// API to add a new student
app.post('/addNewStudent', (req, res) => {
    const newStudent = req.body;
    
    // Validate the input structure
    if (!validateStudent(newStudent)) {
        //exits if in case of invalid input
        return res.status(400).json({ error: 'Invalid student details' });

    }
    newStudent.id = ++lastUsedId;
    // Add the new student to the array if the input is valid
    studentsArray.push(newStudent);
    res.status(201).json({ message: `student added successfully with ID ${lastUsedId}`});
});

// API to get all students
app.get('/getAllStudents', (req, res) => {
    res.json(studentsArray);
});

// API to get a student by ID
app.get('/getStudentByID/:id', (req, res) => {
    const studentId = parseInt(req.params.id);

    // Find the student with the given ID
    const student = studentsArray.find(student => student.id === studentId);

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// API to delete a student by ID
app.delete('/deleteStudentByID/:id', (req, res) => {
    const studentId = parseInt(req.params.id);

    // Find the index of the student with the given ID
    const index = studentsArray.findIndex(student => student.id === studentId);

    if (index !== -1) {
        // Delete the student if found
        studentsArray.splice(index, 1);
        res.json({ message: `Student deleted successfully with the ID ${studentId}` });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// API to update a student by ID
app.put('/updateStudentByID/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const updatedFields = req.body;
    if (!validateObjects(updatedFields)) {
        //exits if in case of invalid input
        return res.status(400).json({ error: 'Invalid student details' });

    }

    // Find the index of the student with the given ID
    const index = studentsArray.findIndex(student => student.id === studentId);
    if (updatedFields.id){
        console.log("ID is present")
        res.status(400).json( {error : "you Cannot update your ID. ID is auto-generated" })
    }
    if (index !== -1) {
        // Update the student fields if they are valid
        for (const field in updatedFields) {
            if (studentsArray[index].hasOwnProperty(field)) //checks whether the fields in the req is same as the fields in studentArray
            {
                studentsArray[index][field] = updatedFields[field];
            }
        }

        res.json({ message: 'Student updated successfully' });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

function validateObjects(student){
    const reference1 = {
        "name" : "string",
        "maths" : "number",
        "science" : "number",
        "english" : "number",
        "computer" : "number"
    }
    for ( const field in student ){
        if(!reference1.hasOwnProperty(field)){
            return false;
        }
        
    let expectedType = reference1[field]
    let actualtype = typeof student[field]

    if ( expectedType !== actualtype ){
        return false
    }

    }
    return true;
}

// Validate the student structure
function validateStudent(student) {
    return (
        student && typeof student === 'object' && // checks the student is not null/undefined and the student is an object.
        student.hasOwnProperty('name') &&
        student.hasOwnProperty('english') &&
        student.hasOwnProperty('maths') &&
        student.hasOwnProperty('science') &&
        student.hasOwnProperty('computer')
    );
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//string