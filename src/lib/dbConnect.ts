import mongoose from "mongoose";
type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected To Base");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDb connected Succesfully");
  } catch (error) {
    console.log("DataBase Connection Failed", error);
    process.exit(1);
  }
}
export default dbConnect;

