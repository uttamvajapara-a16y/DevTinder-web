import {io} from "socket.io-client" ;
import { BASE_URL } from "./constants";

const createSocketConnection = () => {
    // return io(BASE_URL) ;
    return io(BASE_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        // Prevent storage access attempts
        transports: ['websocket', 'polling'],
        withCredentials: true,
        // Disable local storage usage
        autoConnect: true
    });
}

export default createSocketConnection ;