import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoriteReducer from "./features/favorites/favoriteSlice";
import { getFavoritesFromLocalStorage } from "../utils/localStorage";

const initialFavorites = getFavoritesFromLocalStorage() || [];


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoriteReducer
    },

    preloadedState: {
        favorites: initialFavorites
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

setupListeners(store.dipatch);

export default store;