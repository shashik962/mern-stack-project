import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContacts = () => {

    const [conactData, setContactData] = useState([]);

    const getContactData = async () => {
        try {
            const response = await fetch(`http://localhost:5100/api/admin/contacts`, {
                method: "GET",
                // headers: {
                //     Authorization: authorizationToken,
                // }
            });
            const data = await response.json();
            setContactData(data);
            console.log(`contact data ${data}`);
            if(response.ok) {
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteContactById = async (id) => {
        try {
            const response = await fetch(`http://localhost:5100/api/admin/contacts/delete/${id}`, {
                method: 'DELETE',
                // headers: {
                //     Authorization: authorizationToken,
                // }
            });
            if(response.ok) {
                getContactData();
                toast.success("Update Successfully !");
            }else {
                toast.error("Not Update Successfully !");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getContactData();
    }, []);

    return (
        <>
        <div className="container">
            <table  className="table table-dark table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Message</th>
                <th score="col">Edit</th>
                <th score="col">Delete</th>
                </tr>
            </thead>
            <tbody>    
            {conactData.map((v, index) => {
                return (
                    <>
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{v.username}</td>
                            <th>{v.email}</th>
                            <th>{v.message}</th>
                            <td><button type="button" className="btn btn-outline-primary">Primary</button></td>
                            <td><button type="button" className="btn btn-outline-danger" onClick={() => deleteContactById(v._id) }>Delete</button></td>
                        </tr>
                    </>        
                       
                )
            })}
            </tbody>
             </table>
        </div>    
        </>
    );
}
