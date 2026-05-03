import { createSlice, current } from "@reduxjs/toolkit";



export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalPrice: 0,
        currency: "INR",
        loading: false,
        error: null
    },
    reducers: {
        setItems: (state, action) => {
            if (action.payload) {
                state.items = action.payload.items || []
                state.totalPrice = action.payload.totalPrice || 0
                state.currency = action.payload.currency || "INR"
            } else {
                state.items = []
                state.totalPrice = 0
                state.currency = "INR"
            }
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
                // Update total price locally
                state.totalPrice -= (existingItem.price.amount * existingItem.quantity)
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
                state.totalPrice += existingItem.price.amount
            }
        },
        decrementCartItemQuantity: (state, action) => {
            const { productId, variantId } = action.payload

            const existingItem = state.items.find(
                item =>
                    item.product._id === productId &&
                    item.variants === variantId
            )

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1
                state.totalPrice -= existingItem.price.amount
            }
        }

    }

})

export const { setItems, addItem, setLoading, setError, incrementCartItemQuantity, deleteItemFromCart, decrementCartItemQuantity, incrementProsuctStock } = cartSlice.actions

export default cartSlice.reducer