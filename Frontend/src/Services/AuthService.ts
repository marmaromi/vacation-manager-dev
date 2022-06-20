import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { loginAction, logoutAction, registerAction } from "../Redux/AuthSlice";
import { store } from "../Redux/Store";
import config from "../Utils/config";
import notifyService from "./NotifyService";
class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.registerUrl, user);
        const token = response.data;
        // console.log(token);
        
        store.dispatch(registerAction(token));
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(config.loginUrl, credentials);
        const token = response.data;
        axios.post<string>(config.loginUrl, credentials)
            .then(res => localStorage.setItem("token", res.data))
            .catch(err => notifyService.error(err.message))
        store.dispatch(loginAction(token));
    }

    public logout(): void {
        store.dispatch(logoutAction());
    }

    public isLoggedIn(): boolean {
        return store.getState().authStore.user !== null;
    }
}

const authService = new AuthService();

export default authService;