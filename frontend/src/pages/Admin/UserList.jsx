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
    const [editableUserEmail, setEditableUserEmail] = useState('');

    useEffect(() => {
        refetch;
    }, [refetch]);


    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteUser(id);
            } catch (err) {
                toast.error(err.data.message || err.error);
            }
        }
    };

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id);
        setEditableUserName(username);
        setEditableUserEmail(email);
    };

    const handleUpdate = async (id) => {
        try {
            await updateUser({
                userId: id,
                username: editableUserName,
                email: editableUserEmail
            });
            setEditableUserId(null);
            refetch();
        } catch (err) {
            toast.error(err.data.message || err.error);
        }
    };


    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-4">Users</h1>
                {isLoading ? <Loader /> : error ? (<Message variant='error'>{error?.data?.message || error.message}</Message>) : (
                    <>
                        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                            <div className="items-start justify-between md:flex">
                                <div className="max-w-lg">
                                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                                        Users List
                                    </h3>

                                </div>
                            </div>
                            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                                <table className="w-full table-auto text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                                        <tr>
                                            <th className="py-3 px-6">Iser ID</th>
                                            <th className="py-3 px-6">Username</th>
                                            <th className="py-3 px-6">Email</th>
                                            <th className="py-3 px-6">Admin</th>
                                            <th className="py-3 px-6"></th>
                                            <th className="py-3 px-6"></th>

                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 divide-y">
                                        {

                                            users.map(user => (
                                                <tr key={user._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {editableUserId === user._id ? (
                                                            <div class="relative flex items-center">
                                                                <input type="text" value={editableUserName} onChange={e => setEditableUserName(e.target.value)} placeholder="Enter Username"
                                                                    class="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all" />

                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4"
                                                                    viewBox="0 0 24 24">
                                                                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                                                    <path
                                                                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                                                        data-original="#000000"></path>
                                                                </svg>
                                                            </div>
                                                        ) : (user.username)
                                                        }</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {editableUserId === user._id ? (
                                                            <div class="relative flex items-center">
                                                                <input type="text" value={editableUserEmail} onChange={e => setEditableUserEmail(e.target.value)} placeholder="Enter Email"
                                                                    class="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all" />

                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4"
                                                                    viewBox="0 0 682.667 682.667">
                                                                    <defs>
                                                                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                                            <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                                                        </clipPath>
                                                                    </defs>
                                                                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                                                        <path fill="none" stroke-miterlimit="10" stroke-width="40"
                                                                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                                            data-original="#000000"></path>
                                                                        <path
                                                                            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                                            data-original="#000000"></path>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        ) : (user.email)
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">  {user.isAdmin ? (
                                                        <FaCheck style={{ color: "green" }} />
                                                    ) : (
                                                        <FaTimes style={{ color: "red" }} />
                                                    )}
                                                    </td>
                                                    <td className="text-right px-6 whitespace-nowrap">
                                                        {editableUserId === user._id ? (

                                                            <button onClick={() => handleUpdate(user._id)} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                                Submit
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => toggleEdit(user._id, user.username, user.email)} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                                Edit
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td className="text-right px-6 whitespace-nowrap">
                                                        {!user.isAdmin && (
                                                            <button onClick={() => handleDelete(user._id)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                                Delete
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )
                }
            </div >
        </>
    );
};

export default UserList;
