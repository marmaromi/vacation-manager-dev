import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import "./login.css";

function Login(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    async function send(user: CredentialsModel) {
        try {
            await authService.login(user);
            alert("You have been successfully logged in.");
            navigate("/vacations");
        }
        catch (err: any) {
            alert(err.response.data);
        }
    }


    return (
        <div className="login">
            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Username: </label>
                <input type="text" {...register("username")} />

                <label>Password: </label>
                <input type="password" {...register("password")} />

                <button>Login</button>

            </form>

        </div>
    );
}

export default Login;
