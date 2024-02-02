import { NavLink, Outlet } from "react-router-dom";
import { FaUserSecret } from "react-icons/fa";
import { FcContacts } from "react-icons/fc";
import { FcServices } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { useAuth } from "../../store/auth";



export const AdminLayout = () => {
    const { user, isLoading }  = useAuth();

    // if(isLoading) {
    //     return <h1>Loading...</h1>
    // }

    // if(!user.isAdmin) {
    //     return <Navigate to="/" />
    // }
    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/admin/users"><FaUserSecret /> Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/contacts"><FcContacts /> Contacts</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/services"><FcServices /> Services</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/home"><FcHome /> Home</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
}