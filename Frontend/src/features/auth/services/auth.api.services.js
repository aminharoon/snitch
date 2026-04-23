import axios from "axios";
import { useDispatch } from "react-redux";


const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})


export const register = async ({ fullName, email, phoneNumber, password, isSeller }) => {
    try {
        const response = await api.post("/register", { fullName, email, phoneNumber, password, isSeller })
        // response.data will return the user obj user:{_id,something .....}

        return response.data
    } catch (e) {
        console.log(`something went wrong while register the user ${e.message}`)

    }
}
export const login = async ({ email, password }) => {
    try {
        const response = await api.post("/login", { email, password })

        return response.data
    } catch (e) {

        console.log(`something went wrong while login the user i  ${e.message}`)


    }
}

export const getme = async () => {
    try {
        const response = await api.get("/get-me")
        return response.data
    } catch (e) {
        console.log(`SERVICES something went wrong while calling the get me api ${e.message}`)
        if (e.response?.status === 401) {
            logout()
        }
    }
}

export const logout = async () => {
    try {
        const response = await api.get("/logout")
        return response.data

    } catch (e) {
        console.log(`something went wrong while hitting the logout api  ${e.message}`)

    }
}