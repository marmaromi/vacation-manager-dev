import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";

function Register(): JSX.Element {


    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            alert("You have been successfully registered.");
            navigate("/vacations");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="register">

            <h2>Register</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>First name: </label>
                <input type="text" {...register("firstName")} />

                <label>Last name: </label>
                <input type="text" {...register("lastName")} />

                <label>Username: </label>
                <input type="text" {...register("username")} />

                <label>Password: </label>
                <input type="password" {...register("password")} />

                <button>Register</button>

            </form>


        </div>
    );
}

export default Register;
