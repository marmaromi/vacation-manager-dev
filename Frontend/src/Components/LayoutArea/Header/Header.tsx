import { NavLink } from "react-router-dom";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">

            <NavLink className="d-inline-flex" to={"/vacations"}>
                <h1>Vacation Manager</h1>
            </NavLink>

        </div>
    );
}

export default Header;
