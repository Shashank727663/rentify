const mongoose = require("mongoose");

const connectionString ="mongodb+srv://shashankkrishu99:WZXxdqEYS4vPUVtd@cluster0.g88ctyx.mongodb.net/"
const connectdb = async () => {
  try {
    const conn = await mongoose.connect(connectionString);


    console.log(`db connection established.... ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectdb;
