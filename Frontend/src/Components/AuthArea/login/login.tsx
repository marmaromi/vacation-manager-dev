import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { store } from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./login.css";

function Login(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();

    useEffect(() => {
        if (store.getState().authStore.token) {
            navigate("/vacations");
        }
    }, [])

    async function send(user: CredentialsModel) {
        try {
            await authService.login(user);
            notifyService.success("You have been successfully logged-in.");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }


    return (
        <div className="login Box">
            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Username: </label>
                <input type="text" {...register("username", {
                    required: { value: true, message: "Missing username" }
                })} />
                <span>{errors.username?.message}</span>
                <br />

                <label>Password: </label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "Missing Password" }
                })} />
                <span>{errors.password?.message}</span>
                <br />
                
                <button>Login</button>

            </form>
            <div><NavLink to={"/register"}>Register</NavLink></div>
        </div>
    );
}

export default Login;
