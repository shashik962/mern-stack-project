import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
    const [users, setUsers] = useState();

    const { authorizationToken } = useAuth;
 
    const getAllUserData = async () => {
        try {
            const response = await fetch("http://localhost:5100/api/admin/users", {
                method: "GET",
                // headers: {
                //     Authorization: authorizationToken,
                // }
            });
            const data = await response.json();
            console.log(`users ${data}`);

            setUsers(data);
             
        } catch (error) {
            console.log(error);
        }
    }

    //Delete the user
    const deleteUser = async (id) => {   
        try {
            console.log(id);
            const response = await fetch(`http://localhost:5100/api/admin/users/delete/${id}`, {
                method: "DELETE",
                // headers: {
                //     Authorization: authorizationToken,
                // }
            });
            const data = await response.json();
            console.log(`users after delete ${data}`);
            if(response.ok) {
                getAllUserData();
            }
        } catch (error) {
            console.log(error);
        } 
       
    }

    useEffect(() => {
        getAllUserData();
    }, []);

    // console.log("user data",users);
    return (
        <>
           <section className="admin-users-section">
                <div className="container">
                    <h1>Admin User Data</h1>
                </div>
                <div className="container admin-users">
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update | Delete</th>
                            </tr>
                        </thead>
                        <tbody> 
                        {users && users.map((v, i) => {
                          return (
                            <tr className='table-body' key={i}>
                                <td>{v?.username || ''}</td>
                                <td>{v?.email || 0}</td>
                                <td>{v?.phone || 0}</td>
                                <td>
                                    <Link to={`/admin/users/${v?._id}/edit`} className="btn btn-outline-primary">Update</Link>
                                    &nbsp;|&nbsp; 
                                    <button onClick={()=> deleteUser(v?._id)} className="btn btn-outline-danger">Delete</button>
                                </td>
                            </tr>
                          )
                          })}    
                        </tbody>
                    </table>
                   
                </div>
           </section>
        </>
    );
}
