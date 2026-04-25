import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        sellerProducts: [],
        allProducts: [],
        loading: false,
        error: null
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload

        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload
        }
    }
})

export const { setSellerProducts, setLoading, setError, setAllProducts } = productsSlice.actions

export default productsSlice.reducer