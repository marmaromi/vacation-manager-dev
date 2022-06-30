import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { store } from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./register.css";

function Register(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();

    useEffect(() => {
        if (store.getState().authStore.token) navigate("/vacations");
    }, [])

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("You have been successfully registered.");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    return (
        <div className="register Box">

            <h2>Register</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>First name: </label>
                <input type="text" {...register("firstName", {
                    required: { value: true, message: "Missing first name" },
                    pattern: { value: /^[A-Za-z]+$/, message: "Only English Alphabet letters are allowed" },
                    minLength: { value: 2, message: "First name too short" },
                    maxLength: { value: 50, message: "First name too long" }
                })} />
                <span>{errors.firstName?.message}</span>
                <br />

                <label>Last name: </label>
                <input type="text" {...register("lastName", {
                    required: { value: true, message: "Missing last name" },
                    pattern: { value: /^[A-Za-z]+$/, message: "Only English Alphabet letters are allowed" },
                    minLength: { value: 2, message: "Last name too short" },
                    maxLength: { value: 50, message: "Last name too long" }
                })} />
                <span>{errors.lastName?.message}</span>
                <br />

                <label>Username: </label>
                <input type="text" {...register("username", {
                    required: { value: true, message: "Missing username" },
                    minLength: { value: 1, message: "Username too short" },
                    maxLength: { value: 30, message: "Username too long" }
                })} />
                <span>{errors.username?.message}</span>
                <br />

                <label>Password: </label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "Missing password" },
                    minLength: { value: 8, message: "Password must have at least 8 characters" },
                    maxLength: { value: 50, message: "Password must have at most 50 characters" },
                    pattern: { value: /^(?!.* )(?=(.*[a-z]){1,})(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[\W])).{8,50}$/, message: "Password must contain: upper case letter, lower case letter, number, special character, No spaces" },
                    // validate: {
                    //     hasUpperCase: v => /^[A-Z]$/.test(v) || "Password must have an upper case letter",
                    //     hasLowerCase: v => /^[a-z]$/.test(v) || "Password must have a lower case letter",
                    //     hasNumber: v => /^[a-z]$/.test(v) || "Password must have a number",
                    //     hasNonAlphas: v => /^\W$/.test(v) || "Password must have a special character",
                    //     minLength: v => v.length >= 8 || "Password must have at least 8 characters",
                    //     maxLength: v => v.length <= 50 || "Password must have at most 50 characters",
                    // }
                })} />
                <span>{errors.password?.message}</span>
                <br />

                <button>Register</button>

            </form>
            <div><NavLink to={"/login"}>Login</NavLink></div>
        </div>
    );
}

export default Register;
