import { NavLink } from "react-router-dom";
import Logout from "../../AuthArea/logout/logout";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">

            {/* <Logout /> */}
            <NavLink className="d-inline-flex" to={"/vacations"}><h1>Vacation Manager</h1></NavLink>


        </div>
    );
}

export default Header;
