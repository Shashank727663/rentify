const mongoose = require("mongoose");
// "mongodb+srv://satyam9128532410:Satyam0718@cluster0.wf7m0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectionString =
  "mongodb+srv://shashankkrishu99:WZXxdqEYS4vPUVtd@cluster0.g88ctyx.mongodb.net/";
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
