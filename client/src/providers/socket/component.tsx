/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropsWithChildren, useEffect, useReducer } from "react";
import { defaultSocketContextState, OPERATION, socketReducer } from "./context";
import { useSocket } from "@/hooks/use-socket";
import { SocketContextProvider } from "./context";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const SocketContextComponent = ({ children }: PropsWithChildren) => {
const [socketState, socketDispatch] = useReducer(
    socketReducer,
    defaultSocketContextState,
);
const user = useSelector((state: RootState) => state.auth.user);
const queryClient = useQueryClient();

//const hostname = window.location.hostname;
const uri = "http://localhost:3000";

const socket = useSocket(uri, {
    autoConnect: false,
    reconnectionDelay: 5000,
    reconnectionAttempts: 5,
    withCredentials: true,
    auth: {
    userId: user?.id.toString(),
    },
});

useEffect(() => {
    if (!user || !user?.id) {
    console.log("User ID not available yet, waiting for auth state.");
    return;
    }

    if (socket) {
    /** Connect to the web socket **/
    socket.auth = { userId: user.id.toString() };
    socket.connect();

    socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
    });

    /** Update socket state **/
    socketDispatch({ type: OPERATION.UPDATE_SOCKET, payload: socket });

    /** Start the event listener **/
    startListeners();

    /** Send the handshake **/
    sendHandShake();
    }
}, [socket, user]);

const startListeners = () => {
    if (!socket) return;

    /** Default event listeners that socket-io provides  **/

    /** Reconnect event **/
    socket.io.on("reconnect", (attempt) => {
    console.info(`Reconnected on attempt: ${attempt}`);
    });

    /** Reconnect event **/
    socket.io.on("reconnect_attempt", (attempt) => {
    console.info(`Reconnection attempt: ${attempt}`);
    });

    /** Reconnection error **/
    socket.io.on("reconnect_error", (attempt) => {
    console.info(`Reconnection error: ${attempt}`);
    });

    /** Reconnection failed **/
    socket.io.on("reconnect_failed", () => {
    console.info(`Reconnection failture`);
    alert(`We are unable to connect you to the web socket.`);
    });
};

const sendHandShake = () => {
    if (!socket) return;

    /** Listen on socket events **/
    socket.on("recv", (data) => {
        switch (data.eventType) { 
            case "room-message--new":
                // socketDispatch({
                //     type: OPERATION.ADD_MESSAGE_IN_ROOM,
                //     payload: {
                //         message: data,
                //         queryClient
                //     }
                // })
                break;
            default:
                break;
        }
    });
};

return (
    <SocketContextProvider value={{ socketState, socketDispatch }}>
    {children}
    </SocketContextProvider>
);
};

export default SocketContextComponent;
