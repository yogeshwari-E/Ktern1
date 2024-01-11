const express = require ("express");
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());

const studentModel = require("./student");
const dbURL = "mongodb://127.0.0.1:27017/"

const secretKey = 'Yogi@444revathy@227';


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Bearer token missing' });
  }

  const authToken = token.split(' ')[1];

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(authToken, secretKey);
    if (decoded.exp <= Math.floor(Date.now() / 1000)) {
      return res.status(403).json({ error: 'Forbidden: Token has expired' });
    }
    req.user = decoded.user; // Attach the decoded user information to the request object
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden: Invalid Bearer token' });
  }
};




app.post('/addNewStudent', verifyToken,async (req, res) => {
  const newStudent = req.body;

  // Insert the new student into the database
  if (!validateStudent(newStudent)) {
    return res.status(400).json({ error: 'Invalid student details' });
}
if (!validateObjects(newStudent)) {
  //exits if in case of invalid input
  return res.status(400).json({ error: 'Invalid student details' });

} 
  try {
      await studentModel.insertStudent(dbURL, 'Students', newStudent);
      res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
      console.error('Error adding student to the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getAllStudents',verifyToken, async (req, res) => {
  // Fetch all students from the database
  try {
      const allStudents = await studentModel.getAllStudents(dbURL, 'Students');
      res.json(allStudents);
  } catch (error) {
      console.error('Error fetching all students from the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET API to get a student by ID
app.get('/getStudentByID/:id', verifyToken,async (req, res) => {
  const studentId = (req.params.id);

  // Fetch the student from the database by ID
  try {
      const student = await studentModel.getStudentByID(dbURL, 'Students', studentId);
      if (student) {
          res.json(student);
      } else {
          res.status(404).json({ error: 'Student not found' });
      }
  } catch (error) {
      console.error('Error fetching student by ID from the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deleteStudentByID/:id', verifyToken,async (req, res) => {
  const studentId = (req.params.id);

  // Delete the student from the database by ID
  try {
      const result = await studentModel.deleteStudentByID(dbURL, 'Students', studentId);
      if (result.deletedCount === 1) {
          res.json({ message: 'Student deleted successfully' });
      } else {
          res.status(404).json({ error: 'Student not found' });
      }
  } catch (error) {
      console.error('Error deleting student by ID from the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT API to update a student by ID
app.put('/updateStudentByID/:id',verifyToken, async (req, res) => {
  const studentId = (req.params.id);
  const updatedFields = req.body;
  

  if (!validateObjects(updatedFields)) {
    //exits if in case of invalid input
    return res.status(400).json({ error: 'Invalid student details' });

}
  // Update the student in the database by ID
  try {
      const result = await studentModel.updateStudentByID(dbURL, 'Students', studentId, updatedFields);
      if (result.modifiedCount === 1) {
          res.json({ message: 'Student updated successfully' });
      } else {
          res.status(404).json({ error: 'Student not found' });
      }
  } catch (error) {
      console.error('Error updating student by ID in the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to get user percentages
app.get('/getUserPercentages', verifyToken,async (req, res) => {
  const percentages = await studentModel.getUserPercentages(dbURL, 'Students');
  res.json(percentages);
});

app.get('/getUsersWithPercentageGreaterThan80',verifyToken, async (req, res) => {
  const usersGreaterThan80 = await studentModel.getUsersWithPercentageGreaterThan80(dbURL, 'Students');
  res.json(usersGreaterThan80);
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
      student &&
      typeof student === 'object' &&
      student.hasOwnProperty('name') &&
      student.hasOwnProperty('english') &&
      student.hasOwnProperty('maths') &&
      student.hasOwnProperty('science') &&
      student.hasOwnProperty('computer')
  );
}



app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Attempt to log in the user and get the JWT token
    const token = await studentModel.loginUser(dbURL, 'Students', username, password);

    if (!token) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Send the token in the response
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () =>{
  console.log(`app runs in ${port}`)
})

