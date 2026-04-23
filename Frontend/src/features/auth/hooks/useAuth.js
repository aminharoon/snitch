import { setUser, setLoading, setError } from "../auth.slice.js"
import { register, login } from "../services/auth.api.services.js"
import { useDispatch } from "react-redux"

export const useAuth = () => {

    const dispatch = useDispatch()




    const handleRegister = async ({ username, fullName, email, phoneNumber, password, isSeller = flase }) => {

        try {
            dispatch(setLoading(true))

            const response = await register({ username, fullName, email, phoneNumber, password, isSeller })
            dispatch(setUser(response.user))

            dispatch(setLoading(flase))
        } catch (error) {
            dispatch(setLoading(false))
            dispatch(setError(error))
        }
    }
    const handleLogin = async ({ email, password }) => {

        try {
            dispatch(setLoading(true))

            const response = await login({ email, password })
            dispatch(setUser(response.user))

            dispatch(setLoading(flase))
        } catch (error) {
            dispatch(setLoading(false))
            dispatch(setError(error))
        }

    }

    return {
        handleRegister,
        handleLogin
    }
}