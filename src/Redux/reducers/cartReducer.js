import { createSlice } from "@reduxjs/toolkit";

// cartSlice.js

const initialState = {
  count: 0,
  items: [], // Each item: { id, name, price, quantity }
  totalQuantity: 0,
  orderedItems: [],
  orderedCount: 0,
  totalOrderedItems: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.count += action.payload;
    },
    setCartItems: (state, action) => {
      state.items.push(action.payload);
    },
    incrementCartItem: (state, action) => {
      const itemToUpdate = state.items.find((item) => item.id === action.payload);
      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
      }
    },
    setCartItemCount: (state, action) => {
      const itemToUpdate = state.items.find((item) => item.id === action.payload.id);
      if (itemToUpdate) {
        itemToUpdate.quantity += action.payload.count;
      }
    },
    decrementCartItem: (state, action) => {
      const itemToUpdate = state.items.find((item) => item.id === action.payload);
      if (itemToUpdate && itemToUpdate.quantity > 0) {
        itemToUpdate.quantity -= 1;
      }
    },
    removeCartItem: (state, action) => {
      const itemIdToRemove = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemIdToRemove);

      if (itemIndex !== -1) {
        // Remove the item from the array
        state.items.splice(itemIndex, 1);
        // Update the total count if needed
        state.count -= 1;
      }
    },
    calculateTotalQuantity: (state) => {
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    placeOrder: (state)=> {
      state.orderedItems = state.items
      state.orderedCount = state.count
      state.totalOrderedItems = state.orderedItems.reduce((total, item) => total + item.quantity, 0);
      
    },
    resetCart: (state) => {
      state.items = []
      state.count = 0
      state.totalQuantity = 0
    }
  },
});

export const { setCartCount, setCartItems, incrementCartItem, decrementCartItem, removeCartItem, calculateTotalQuantity, setCartItemCount, placeOrder, resetCart } = cartSlice.actions;
export default cartSlice.reducer;

