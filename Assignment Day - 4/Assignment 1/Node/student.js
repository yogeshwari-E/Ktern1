const { MongoClient, ObjectID, ObjectId} = require("mongodb")
const secretKey = 'Yogi@444revathy@227';

const jwt = require('jsonwebtoken');

const insertStudent = async (dbURL, dbName, data) => {
  const client = await MongoClient.connect(dbURL);
  const dbo = client.db(dbName);

  const { nanoid } = await import('nanoid');
  // Generate a custom ID using nanoid
  const customId = nanoid();

  // Set the custom ID in the data before insertion
  data._id = customId;

  // Insert the document into the database
  const result = await dbo.collection("Details").insertOne(data);
  return result;
};


  const loginUser = async (dbURL, dbName, username, password) => {
    const client = await MongoClient.connect(dbURL);
    const dbo = client.db(dbName);

    // Fetch the user from the database based on the username
    const user = await dbo.collection("users").findOne({ username });

    if (!user) {
      // User not found
      return null;
    }

    if (password !== user.password) {
      // Incorrect password
      return null;
    }
    // Generate JWT token
    let token = jwt.sign({ username: user.username, userId: user._id }, 'Yogi@444revathy@227', { expiresIn: '1h' });
    console.log(token);
    return {message : "you are Authenticated"};
  };
  
  const getAllStudents = async (dbURL, dbName) => {
    const client = await MongoClient.connect(dbURL);
    const dbo = client.db(dbName);
    const allStudents = await dbo.collection("Details").find({}).toArray();
    return allStudents;
  };
  
  const getStudentByID = async (dbURL, dbName, studentId) => {
    const client = await MongoClient.connect(dbURL);
    const dbo = client.db(dbName);
    const objectId = { _id: studentId };
    const student = await dbo.collection("Details").findOne(objectId);
    return student;
  };
  
  const deleteStudentByID = async (dbURL, dbName, studentId) => {
    const client = await MongoClient.connect(dbURL);
    const dbo = client.db(dbName);
    const objectId = { _id: studentId };
    const result = await dbo.collection("Details").deleteOne(objectId);
    return result;
  };
  
  const updateStudentByID = async (dbURL, dbName, studentId, updatedFields) => {
    const client = await MongoClient.connect(dbURL);
    const dbo = client.db(dbName);
    const objectId = { _id: studentId };
    const result = await dbo.collection("Details").updateOne(objectId,
      { $set: updatedFields }
    );
    return result;
  };
  
  // API to get the user percentage of all the marks obtained
  const getUserPercentages = async (dbURL, dbName) => {
    const client = await MongoClient.connect(dbURL);
    const dbo = client.db(dbName);
  
    // Retrieve all students from the database
    const allStudents = await dbo.collection("Details").find({}).toArray();
  
    // Calculate percentage for each student
    const percentages = allStudents.map(student => {
      const totalMarks = student.english + student.maths + student.science + student.computer;
      const percentage = (totalMarks / 4).toFixed(2);
      return { name: student.name, percentage: `${percentage}%` };
    });
  
    return percentages;
  };
  
  const getUsersWithPercentageGreaterThan80 = async (dbURL, dbName) => {
    const client = await MongoClient.connect(dbURL);
    const dbo = client.db(dbName);
  
    const allStudents = await dbo.collection("Details").find({}).toArray();
  
    const usersGreaterThan80 = allStudents.filter(student => {
      const totalMarks = student.english + student.maths + student.science + student.computer;
      const percentage = (totalMarks / 4).toFixed(2);
      return parseFloat(percentage) > 80.0;
    });
    return usersGreaterThan80;
  };
module.exports = {
  insertStudent,
  loginUser,
  getAllStudents,
  getStudentByID,
  getUsersWithPercentageGreaterThan80,
  getUserPercentages,
  updateStudentByID,
  deleteStudentByID,

};