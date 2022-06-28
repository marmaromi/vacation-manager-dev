import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import VacationModel from "../4-models/vacation-model";

let socketServer: SocketServer;

const init = (httpServer: HttpServer): void => {
    // Create socket server: 
    socketServer = new SocketServer(httpServer, { cors: { origin: "*" } });

    // Listen to clients connection: 
    socketServer.sockets.on("connection", (socket: Socket) => {
        console.log("Client has been connected");
    });
}

// Reporting a new vacation added by the admin:
function reportAddVacation(vacation: VacationModel): void {
    socketServer.sockets.emit("admin-added-vacation", vacation);
}

// Reporting a vacation updated by the admin:
function reportUpdateVacation(vacation: VacationModel): void {    
    socketServer.sockets.emit("admin-updated-vacation", vacation);
}

// Reporting a vacation deleted by the admin:
function reportDeleteVacation(id: number): void {
    socketServer.sockets.emit("admin-deleted-vacation", id);    
}


function reportFollowVacation(vacation: VacationModel): void {
    socketServer.sockets.emit("user-followed-vacation",vacation);        
}

export default {
    init,
    reportAddVacation,
    reportUpdateVacation,
    reportDeleteVacation,
    reportFollowVacation,
}
