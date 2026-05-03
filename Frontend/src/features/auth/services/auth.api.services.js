import axios from "axios";



import { api } from "../../utils/api.utils.js"


export const register = async ({ fullName, email, phoneNumber, password, isSeller }) => {
    try {
        const response = await api.post("/auth/register", { fullName, email, phoneNumber, password, isSeller })
        // response.data will return the user obj user:{_id,something .....}

        return response.data
    } catch (e) {
        console.log(`SERVICES something went wrong while register the user ${e.message}`)

    }
}
export const login = async ({ email, password }) => {
    try {
        const response = await api.post("/auth/login", { email, password })

        return response.data
    } catch (e) {

        throw new Error(e.response?.data?.message || "API FAILED")

    }
}

export const getme = async () => {
    try {
        const res = await api.get("/auth/me");
        return res.data;

    } catch (e) {
        throw new Error(e.response?.data?.message || "API FAILED")

        throw e;
    }
};


export const logout = async () => {
    try {
        const response = await api.get("/auth/logout")
        return response.data

    } catch (e) {

        console.log(`SERVICES something went wrong while hitting the logout api  ${e.message}`)
        throw new Error(e.response?.data?.message || "API FAILED")


    }
}



export const refreshToken = async () => {
    try {
        await axios.get("/api/auth/refreshToken", {
            withCredentials: true
        });
        return true;
    } catch {
        return false;
    }
};