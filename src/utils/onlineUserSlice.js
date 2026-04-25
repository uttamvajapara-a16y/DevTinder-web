import { createSlice } from "@reduxjs/toolkit";

const onlineUserSlice = createSlice({
    name : "onlineUsers" ,
    initialState : [] ,
    reducers : {
        addOnlineUser : (state , action) => action.payload ,
        removeOnlineUser : (state , action) => {
            const newArray = state.filter((user) => user !== action.payload) ;
            return newArray
        }
    }
})

export const {addOnlineUser , removeOnlineUser} = onlineUserSlice.actions ;
export default onlineUserSlice.reducer ;