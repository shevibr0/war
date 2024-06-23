import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    soliders: [],
    searchSoliders: []
}

const soliderSlice = createSlice({
    name: "solider",
    initialState: initialValue,
    reducers: {
        setSoliders: (state, action) => {
            state.soliders = action.payload;
        },
        setSearchSoliders: (state, action) => {
            state.searchSoliders = action.payload;
        },
        clearSearchSoliders: (state) => {
            state.searchSoliders = [];
        }
    }
});

export const { setSoliders, setSearchSoliders, clearSearchSoliders } = soliderSlice.actions;
export default soliderSlice.reducer;
