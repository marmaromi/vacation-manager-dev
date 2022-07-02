import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { store } from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./logout.css";

function Logout(): JSX.Element {

    const navigate = useNavigate();
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(store.getState().authStore.user);
        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authStore.user);
        });

        return () => unsubscribe();
    }, [])


    const logout = (): void => {

        try {
            authService.logout();
            notifyService.success("You have been successfully logged-out");
            navigate("/login");
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    return (
        <div className="logout">
            {
                user?.privileges === "admin" && <span className="admin">Hello {user.firstName} {user.lastName}! | <button onClick={logout}>Logout</button></span>
                ||
                user?.privileges === "user" && <span className="user">Hello {user.firstName} {user.lastName}! | <button onClick={logout}>Logout</button></span>
            }
        </div>
    );
}

export default Logout;
