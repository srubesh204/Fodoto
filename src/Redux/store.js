import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./reducers/loaderSlice";
import { cartSlice } from "./reducers/cartReducer";





// import thunk from 'redux-thunk'; // Import the default export from redux-thunk

export const store = configureStore({
  reducer: {
    loader: loaderSlice.reducer,
    cartDetails: cartSlice.reducer
  },
  // middleware: [thunk] // Use thunk directly in middleware array
});
