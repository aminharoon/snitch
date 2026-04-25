import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        sellerProducts: []
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload

        }
    }
})

export const { setSellerProducts } = productsSlice.actions

export default productsSlice.reducer