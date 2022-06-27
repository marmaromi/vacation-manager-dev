import { io, Socket } from "socket.io-client";
import VacationModel from "../Models/Vacation Model";
import { store } from "../Redux/Store";
import { addVacationsAction, deleteVacationAction, editVacationAction } from "../Redux/VacationSlice";
import config from "../Utils/config";

class SocketService {
    private socket: Socket;

    public connect(): void {
        this.socket = io(config.socketIo);
        this.listen();
    }

    private listen(): void {
        // Listen to adding by admin: 
        this.socket.on("admin-added-vacation", (vacation: VacationModel) => {
            store.dispatch(addVacationsAction(vacation));
        });

        // Listen to updating by admin: 
        this.socket.on("admin-updated-vacation", (vacation: VacationModel) => {
            store.dispatch(editVacationAction(vacation));
        });

        // Listen to deleting by admin: 
        this.socket.on("admin-deleted-vacation", (id: number) => {
            store.dispatch(deleteVacationAction(id));
        });

        this.socket.on("user-followed-vacation", (vacation: VacationModel) => {
            store.dispatch(editVacationAction(vacation));            
        });

    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}

const socketService = new SocketService();

export default socketService;