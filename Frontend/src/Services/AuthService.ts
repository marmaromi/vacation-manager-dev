import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
// import { loginAction, logoutAction, registerAction } from "../Redux/AuthState";
// import store from "../Redux/Store";
import config from "../Utils/config";

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.registerUrl, user);
        const token = response.data;
        localStorage.setItem("token", token)
        // store.dispatch(registerAction(token));
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(config.loginUrl, credentials);
        const token = response.data;
        localStorage.setItem("token", token);
        // axios.post<string>(config.loginUrl, credentials)
        //     .then(res => localStorage.setItem("token", res.data))
        //     .catch(err => alert(err.message))
        // store.dispatch(loginAction(token));
    }

    public logout(): void {
        // store.dispatch(logoutAction());
        localStorage.removeItem("token");
    }

    public isLoggedIn(): boolean {
        // return store.getState().authState.user !== null;
        return localStorage.getItem("token") !== null;
    }

}

const authService = new AuthService();

export default authService;