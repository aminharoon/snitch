import { setUser, setLoading, setError } from "../state/auth.slice.js"
import { register, login, getme, logout } from "../services/auth.api.services.js"
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
                return response.data
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

                dispatch(setUser(response.data))
                toast.success("Welcome back!")
                return response.data
            }
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setLoading(false))
            const errorMessage = error.response?.data?.message || error.message || "Login failed"
            dispatch(setError(errorMessage))
            toast.error(errorMessage)
        }
    }

    const handleGetMe = async () => {
        dispatch(setLoading(true))
        try {
            const response = await getme()

            if (response) {
                dispatch(setUser(response.data))
                toast.success("user fetched successfully ")
                return response.data
            }
        } catch (e) {
            dispatch(setUser(null))
            dispatch(setLoading(false))
            console.log(`HOOK something went wrong while calling the getme api ${e.message}`)
            if (e.response?.status === 401) {
                await handleLogout();
            }
            const errorMessage = e.response?.data?.message || e.message || "failed to fetch the user "
            // Only show toast if it's not a 401 (which is handled by logout)
            if (e.response?.status !== 401) {
                toast.error(errorMessage)
            }
        } finally {
            dispatch(setLoading(false))
        }
    }


    const handleLogout = async () => {
        dispatch(setLoading(true))

        try {
            const response = await logout()
            dispatch(setUser(null))
            toast.success("user is logout successfully ")
            return response?.data
        } catch (e) {
            console.log(`SERVICES something went wrong while hitting the logout api ${e.message}`)
            // Even if logout fails on server, we should clear local state
            dispatch(setUser(null))
        } finally {
            dispatch(setLoading(false))
        }
    }


    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout
    }
}
