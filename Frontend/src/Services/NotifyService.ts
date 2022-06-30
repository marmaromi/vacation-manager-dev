import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

class NotifyService {

    private notification = new Notyf({ duration: 3000, position: { x: "left", y: "bottom" } });

    public success(message: string): void {
        this.notification.success(message);
    }

    public error(err: any): void {
        this.notification.error(this.extractError(err));
    }

    private extractError(err: any): string {

        if (typeof err === "string") return err;

        if (typeof err.response?.data === "string") return err.response.data;

        if (Array.isArray(err.response?.data)) return err.response.data[0];

        if (typeof err.message === "string") return err.message;

        return "Some error, please try again.";
    }

}

const notifyService = new NotifyService();

export default notifyService;