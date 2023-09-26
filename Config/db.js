const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');

const ConnectDB = ()=>{
  mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`Database is connected on ${data.connection.host}`);
    // createFakeUsers(10);
  });
}
// const User = require("../models/userModel");

// // Function to create fake users

// function createFakeUsers(count) {
//   const fakeUsers = [];
//   const roles = ['Voter', 'Candidate'];
//   const randomIndex = Math.floor(Math.random() * roles.length);

//   for (let i = 0; i < count; i++) {

//     const fakeUser = {
//       username: faker.internet.userName(),
//       password: faker.internet.password(),
//       role: roles[randomIndex],
//     };

//     fakeUsers.push(fakeUser);
//   }


//   // Save the fake users to the database
//   User.insertMany(fakeUsers)
//     .then(() => {
//       console.log(`${count} fake users created and saved to the database.`);
//       mongoose.connection.close(); // Close the MongoDB connection
//     })
//     .catch((err) => console.error(err));
// }

module.exports = ConnectDB;
