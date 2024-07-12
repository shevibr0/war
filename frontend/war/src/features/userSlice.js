import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connectedUser: JSON.parse(localStorage.getItem('user')) || null,
    users: [],
    pageHistory: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setConnectedUser: (state, action) => {
            state.connectedUser = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setUnConnectedUser: (state) => {
            state.connectedUser = null;
            localStorage.removeItem('user');
        },
        addPageToHistory: (state, action) => {
            state.pageHistory.push(action.payload);
            if (state.pageHistory.length > 2) {
                state.pageHistory.shift(); // שמירה רק על 2 הדפים האחרונים
            }
        },
        clearPageHistory: (state) => {
            state.pageHistory = [];
        }
    }
});

export const { setConnectedUser, setUnConnectedUser, addPageToHistory, clearPageHistory } = userSlice.actions;
export default userSlice.reducer;
