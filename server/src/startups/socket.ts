import { Server, Socket } from "socket.io";


export default(io: Server) => {
    
    io.on("connection", (socket: Socket) => {
        console.log("connection id :" + socket.id);
    })
}


