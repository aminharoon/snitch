import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        sellerProducts: [],
        allProducts: [],
        singleProduct: null,
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
        },
        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload
        }

    }
})

export const { setSellerProducts, setLoading, setError, setAllProducts, setSingleProduct } = productsSlice.actions

export default productsSlice.reducer