import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";
import { envVariables } from "./config.js";
import { DATABASE_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const response = await mongoose.connect(
      `${envVariables.DATABASE_URI}/${DATABASE_NAME}`,
    );
    console.log(`✅ successfully connect with data base `);
  } catch (e) {
    console.log("❌ failed to connect with the data base ");
    throw new ApiError(404, `❌ something went wrong ${e.message}`);
  }
};
