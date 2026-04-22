import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";
import { envVariables } from "./config.js";
import { DATABASE_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const response = await mongoose.connect(
      `${envVariables.DATABASE_URI}/${DATABASE_NAME}`,
    );
    console.log(`✅ successfully connect with DB `);
  } catch (e) {
    console.error(`\n❌ failed to connect with DB ${e.message}`);
    throw new ApiError(404, `\n❌ something went wrong ${e.message}`);
  }
};
