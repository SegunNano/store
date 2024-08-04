import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { useGetUsersQuery, useDeleteUsersMutation, useGetUserDetailsQuery, useUpdateUserMutation } from "../../redux/api/usersApiSlice";

const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser] = useDeleteUsersMutation();
    const [updateUser] = useUpdateUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUserName, setEditableUserName] = useState('');
    const [editableUseEmail, setEditableUseEmail] = useState('');

    useEffect(() => {
        refetch;
    }, [refetch]);


    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Users</h1>
            {isLoading ? <Loader /> : error ? (<Message variant='error'>{error?.data?.message || error.message}</Message>) : (
                <div className="flex flex-col md:flex-row">
                    <table className="w-full md:w-4/5 mx-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">NAME</th>
                                <th className="px-4 py-2 text-left">EMAIL</th>
                                <th className="px-4 py-2 text-left">ADMIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td className="px-4 py-2">{user._id}</td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user.id ? (
                                            <div className="flex items-center">
                                                <input type="text" name="" id="" value={(editableUserName)} onChange={e => setEditableUserName(e.target.value)} className="w-full p-2 border rounded-lg" />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
            }
        </div >
    );
};

export default UserList;
