import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { store } from "../../../Redux/Store";
import About from "../../AboutArea/About/About";
import Login from "../../AuthArea/login/login";
import Logout from "../../AuthArea/logout/logout";
import Register from "../../AuthArea/register/register";
import Reports from "../../ReportsArea/Reports/Reports";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import EditVacation from "../../VacationArea/EditVacation/EditVacation";
import Main from "../Main/Main";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">

            {/* need to add routing when not logged in */}

            <Routes>

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                <Route path="/vacations" element={<Main />} />
                <Route path="/vacations/new" element={<AddVacation />} />
                <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />

                <Route path="/reports" element={<Reports />} />

                <Route path="/about" element={<About />} />

                <Route path="" element={<Navigate to="/vacations" />} />
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
