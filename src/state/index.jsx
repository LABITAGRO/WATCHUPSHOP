import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },

        addToCart: (state, action) => {
            const itemToAdd = action.payload.item;
            const existingItemIndex = state.cart.findIndex(item => item.id === itemToAdd.id);

            if (existingItemIndex !== -1) {
                state.cart[existingItemIndex].count++;
            } else {
                state.cart.push({ ...itemToAdd, count: 1 });
            }
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        increaseCount: (state, action) => {
            const { id } = action.payload;
            const itemToUpdate = state.cart.find(item => item.id === id);
            if (itemToUpdate) {
                itemToUpdate.count++;
            }
        },

        decreaseCount: (state, action) => {
            const { id } = action.payload;
            const itemToUpdate = state.cart.find(item => item.id === id);
            if (itemToUpdate && itemToUpdate.count > 1) {
                itemToUpdate.count--;
            }
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        }
    }
});

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
