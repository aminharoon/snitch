import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        items: [],
        loading: false,
        error: null
    },

    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const {
    setItems,
    setLoading,
    setError
} = orderSlice.actions

export default orderSlice.reducer