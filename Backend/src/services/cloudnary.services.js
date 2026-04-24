import { v2 as cloudinary } from "cloudinary"
import { envVariables } from "../config/config.js"
import { CLOUDINARY_NAME } from "../constants.js"
import { Readable } from "stream"


cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: envVariables.CLOUDINARY_API,
    api_secret: envVariables.CLOUDINARY_SECRET
})



export const uploadOnCloudnary = (buffer) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: "Snitch"
            },
            (error, result) => {
                if (error) return reject(error)
                resolve(result)
            }
        )


        Readable.from(buffer).pipe(stream)
    })
}