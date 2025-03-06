import { createSlice } from '@reduxjs/toolkit'

const initialState={
    currentUser: null,
    currentMeetingId: null
}

const userDataSlice=createSlice({
    name: 'user',
    initialState,
    reducers:{
        getUser: (state,action)=>{
            state.currentUser=action.payload
        },
        getMeetingId: (state,action)=>{
            state.currentMeetingId=action.payload
        }
    }
})

export const {getUser,getMeetingId}=userDataSlice.actions;
export default userDataSlice.reducer;
