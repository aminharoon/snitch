import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})


export const register = async ({ username, fullName, email, phoneNumber, password, isSeller }) => {
    try {
        const response = await api.post("/register", { username, fullName, email, phoneNumber, password, isSeller })
        // response.data will return the user obj user:{_id,something .....}
        return response.data
    } catch (e) {
        console.log(`something went wrong while register the user ${e.message}`)

    }
}
export const login = async ({ email, password }) => {
    try {
        const response = await api.post("/login", { email, password })
        // response.data will return the user obj user:{_id,something .....}
        return response.data
    } catch (e) {
        console.log(`something went wrong while login the user ${e.message}`)

    }
}