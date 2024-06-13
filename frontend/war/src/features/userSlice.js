import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connectedUser: JSON.parse(sessionStorage.getItem('user')) || null,
    users: []
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setConnectedUser: (state, action) => {
            state.connectedUser = action.payload;
            sessionStorage.setItem('user', JSON.stringify(action.payload));

        },

        setUnConnectedUser: (state, action) => {
            state.connectedUser = null;
            sessionStorage.removeItem('user');
        }
    }
});

export const { setConnectedUser, setUnConnectedUser } = userSlice.actions;
export default userSlice.reducer;