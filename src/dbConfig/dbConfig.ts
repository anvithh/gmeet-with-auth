import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;

    connection.on("error", (err) => {
      console.log(err);
    });

    connection.on("connected", () => {
      console.log("Connected");
    });
  } catch (error) {
    console.log(error);
    console.log("SOMETHING WENT WRONG!");
  }
}
