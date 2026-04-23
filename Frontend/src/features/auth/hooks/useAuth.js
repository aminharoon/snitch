import { setUser, setLoading, setError } from "../auth.slice.js"
import { register, login } from "../services/auth.api.services.js"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"

export const useAuth = () => {
    const dispatch = useDispatch()

    const handleRegister = async ({ fullName, email, phoneNumber, password, isSeller = false }) => {
        try {
            dispatch(setLoading(true))
            const response = await register({ fullName, email, phoneNumber, password, isSeller })
            
            if (response) {
                dispatch(setUser(response.user))
                toast.success("Account created successfully!")
            }
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setLoading(false))
            const errorMessage = error.response?.data?.message || error.message || "Registration failed"
            dispatch(setError(errorMessage))
            toast.error(errorMessage)
        }
    }

    const handleLogin = async ({ email, password }) => {
        try {
            dispatch(setLoading(true))
            const response = await login({ email, password })
            
            if (response) {
                dispatch(setUser(response.user))
                toast.success("Welcome back!")
            }
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setLoading(false))
            const errorMessage = error.response?.data?.message || error.message || "Login failed"
            dispatch(setError(errorMessage))
            toast.error(errorMessage)
        }
    }

    return {
        handleRegister,
        handleLogin
    }
}