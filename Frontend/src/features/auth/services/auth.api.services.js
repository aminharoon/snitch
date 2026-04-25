import axios from "axios";



const api = axios.create({
    baseURL: "/api/auth",
    withCredentials: true
})


export const register = async ({ fullName, email, phoneNumber, password, isSeller }) => {
    try {
        const response = await api.post("/register", { fullName, email, phoneNumber, password, isSeller })
        // response.data will return the user obj user:{_id,something .....}

        return response.data
    } catch (e) {
        console.log(`SERVICES something went wrong while register the user ${e.message}`)

    }
}
export const login = async ({ email, password }) => {
    try {
        const response = await api.post("/login", { email, password })

        return response.data
    } catch (e) {

        console.log(`SERVICES  went wrong while login the user   ${e.message}`)


    }
}

export const getme = async () => {
    try {
        const res = await api.get("/me");
        return res.data;

    } catch (e) {
        if (e.response?.status === 401) {
            const refreshed = await refreshToken();

            if (refreshed) {
                return await getme(); // retry once
            }
        }

        throw e;
    }
};


export const logout = async () => {
    try {
        const response = await api.get("/logout")
        return response.data

    } catch (e) {
        console.log(`SERVICES something went wrong while hitting the logout api  ${e.message}`)

    }
}

export const refreshToken = async () => {

    try {
        const response = await api.get("/refreshToken")
        return true

    } catch (e) {
        if (e.response?.status === 401) {
            await logout()
            return false
        }
        console.log(`SERVICES : something went wrong while calling the refreshToken function ${e.message}`)
        return false
    }

}