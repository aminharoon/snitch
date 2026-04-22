import dotenv from "dotenv";
dotenv.config();


export const envVariables = {
  CLIENT_ID: process.env.GOOGLE_CLIENT || "",
  GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  GOOGLE_CALLBACK_URI: process.env.GOOGLE_CALLBACK_URI || "",
  ACCESS_TOKEN: process.env.ACCESS_TOKEN || "",
  REFRESH_TOKEN: process.env.REFRESH_TOKEN || "",
  STACK: process.env.STACK || "",
  DATABASE_URI: process.env.DATABASE_URI || "",
};
