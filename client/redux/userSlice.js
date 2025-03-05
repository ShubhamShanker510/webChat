import { createSlice } from '@reduxjs/toolkit'

const initialState={
    currentUser: null
}

const userDataSlice=createSlice({
    name: 'user',
    initialState,
    reducers:{
        getUser: (state,action)=>{
            state.currentUser=action.payload
        }
    }
})

export const {getUser}=userDataSlice.actions;
export default userDataSlice.reducer;
