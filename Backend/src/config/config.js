import dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URI) {
  throw new Error("DATABASE_URI is not defined in environment variables");
}

if (!process.env.ACCESS_TOKEN) {
  throw new Error("ACCESS_TOKEN is not defined in environment variables");
}
if (!process.env.REFRESH_TOKEN) {
  throw new Error("REFRESH_TOKEN is not defined in environment variables");
}
if (!process.env.GOOGLE_CLIENT) {
  throw new Error("GOOGLE_CLIENT is not defined in environment variables");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET is not defined in environment variables");
}


export const envVariables = {
  CLIENT_ID: process.env.GOOGLE_CLIENT || "",
  GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  GOOGLE_CALLBACK_URI: process.env.GOOGLE_CALLBACK_URI || "",
  ACCESS_TOKEN: process.env.ACCESS_TOKEN || "",
  REFRESH_TOKEN: process.env.REFRESH_TOKEN || "",
  STACK: process.env.STACK || "",
  DATABASE_URI: process.env.DATABASE_URI || "",
  IMAGE_KIT_API: process.env.IMAGE_KIT || "",
  CLOUDINARY_API: process.env.CLOUDINARY_APi || "",
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET || ""
};
