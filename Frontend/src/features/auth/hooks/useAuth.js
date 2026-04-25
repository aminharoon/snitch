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
                console.log(response.data)
                dispatch(setUser(response.data))
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

    const handleGetMe = async () => {

        dispatch(setLoading(true))
        try {
            const response = await getme()

            if (response) {
                dispatch(setUser(response.data))

                toast.success("user fetched successfully ")
            }
            dispatch(setLoading(false))

        } catch (e) {
            console.log(`HOOK something went wrong while calling the getme api ${e.message}`)
            dispatch(setLoading(false))
            if (e.response?.status === 401) {
                dispatch(handleLogout());
            }
            const errorMessage = e.message?.data?.message || e.message || "failed to fetch the user "
            toast.error(errorMessage)
        }
        finally {
            dispatch(setLoading(false))
        }
    }


    const handleLogout = async () => {
        dispatch(setLoading(true))

        try {
            const response = await handleLogout()
            if (response) {
                dispatch(setUser(response.data))
                dispatch(setLoading(false))
                toast.success("user is logout successfully ")
            }
        } catch (e) {
            toast.error(e.message || "something went wrong while logout")
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
