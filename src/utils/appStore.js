import {configureStore} from "@reduxjs/toolkit" ;
import userReducer from "./userSlice";
import feedReducer from "./feedSlice" ;
import connectionsReducer from "./connectionSlice" ;
import requestsReducer from "./requestsSlice" ;
import onlineUserReducer from "./onlineUserSlice" ;

const appStore = configureStore({
    reducer : {
        user : userReducer ,
        feed : feedReducer ,
        connections : connectionsReducer ,
        requests : requestsReducer ,
        onlineUsers : onlineUserReducer
    }
})

export default appStore ;