import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name : "requests" ,
    initialState: null ,
    reducers : {
        addRequests: (state , action) => action.payload ,
        removeRequest: () => null
    }
})

export const {addRequests , removeRequest} = requestsSlice.actions ;

export default requestsSlice.reducer ;