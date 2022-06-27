import { useEffect, useState } from "react";
import { store } from "../../../Redux/Store";
import Logout from "../../AuthArea/logout/logout";
import AdminArea from "../AdminArea/AdminArea";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    const [role, setRole] = useState<string>('');

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const user = store.getState().authStore.user;
            if (user?.privileges === 'admin') {
                setRole(user.privileges);

            } else {
                setRole('')
            }
        });

        return () => unsubscribe();

    }, []);

    return (
        <div className="Layout">
            <div className="content-wrap">
                {role === 'admin' && <aside className="adminLayout"> <AdminArea /> </aside> || <aside> <Logout /> </aside>}
                <header> <Header /> </header>
                <main> <Routing /> </main>
            </div>

            <footer> <Footer /> </footer>

        </div>
    );
}

export default Layout;
