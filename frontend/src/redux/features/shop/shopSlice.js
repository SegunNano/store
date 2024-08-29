import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: [],
    products: [],
    checked: [],
    radio: [],
    brandCheckBoxes: {},
    checkedBrands: [],
};

const reducers = {
    setCategories: (state, action) => {
        state.categories = action.payload;
    },
    setProducts: (state, action) => {
        state.products = action.payload;
    },
    setRadio: (state, action) => {
        state.radio = action.payload;
    },
    setCheckedBrands: (state, action) => {
        state.checkedBrands = action.payload;
    },
    setChecked: (state, action) => {
        state.checked = action.payload;
    }
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers,
});

export const { setCategories, setChecked, setCheckedBrands, setProducts, setRadio } = shopSlice.actions;

export default shopSlice.reducer;