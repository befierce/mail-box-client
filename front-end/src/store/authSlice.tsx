import { createSlice } from "@reduxjs/toolkit";


interface User{
    email:string
}


interface authState {
    isAuthenticated: boolean,
    user: User | null
}

const initialState : authState = {
    isAuthenticated : false,
    user: null
}
 const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state,action){
            state.isAuthenticated = true,
            state.user = action.payload
        }
    }
});


export const {login} = authSlice.actions;
export default authSlice.reducer;
