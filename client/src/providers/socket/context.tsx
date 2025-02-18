import { createContext } from "react";
import { Socket } from "socket.io-client";

export type SocketContextState = {
    socket: Socket | undefined;
};
  
export const defaultSocketContextState: SocketContextState = {
    socket: undefined,   
};

export enum OPERATION {
    UPDATE_SOCKET,
    ADD_MESSAGE_IN_ROOM
}


type Actions =
    | {
        type: OPERATION.UPDATE_SOCKET;
        payload: Socket;
    }
    // | {
    //     type: OPERATION.ADD_MESSAGE_IN_ROOM;
    //     payload: { message: Message, queryClient: QueryClient };
    // }
    

export const socketReducer = (state: SocketContextState, action: Actions): SocketContextState => {
    switch (action.type) {
        case OPERATION.UPDATE_SOCKET:
            return { ...state, socket: action.payload };
        // case OPERATION.ADD_MESSAGE_IN_ROOM: {
        //     const { message, queryClient } = action.payload;

        //     queryClient.invalidateQueries({ queryKey: ["room", message.roomId] })
        //     return {...state};
        // }
        default:
            return {...state}
    }
}

export type SocketContextType = {
    socketState: SocketContextState;
    socketDispatch: React.Dispatch<Actions>;
  };
  
export const SocketContext = createContext<SocketContextType>({
    socketState: defaultSocketContextState,
    socketDispatch: () => {},
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;
