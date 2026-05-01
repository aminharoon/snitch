import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
        addItem: (state, action) => {
            state.items.push(action.payload)
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        deleteItemFromCart: (state, action) => {
            const { productId, variantId } = action.payload

            const existingItem = state.items.find(
                item =>
                    item.product._id === productId &&
                    item.variants === variantId
            )

            if (existingItem) {
                state.items = state.items.filter(item => item._id !== existingItem._id)

            }
        },
        incrementCartItemQuantity: (state, action) => {
            const { productId, variantId } = action.payload
            const existingItem = state.items.find(
                item =>
                    item.product._id === productId &&
                    item.variants === variantId
            )


            if (existingItem) {
                existingItem.quantity += 1
            }
        }

    }

})

export const { setItems, addItem, setLoading, setError, incrementCartItemQuantity, deleteItemFromCart } = cartSlice.actions

export default cartSlice.reducer