import { useQuery } from "@tanstack/react-query";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const AllUsers = () => {
    // const { data: users = [] } = useQuery(['users'], async () => {
    //     const res = await fetch('http://localhost:5000/users');
    //     return res.json();
    // });

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const url = `http://localhost:5000/users`;
            const res = await fetch(url);
            return res.json();
        }
    })

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `http://localhost:5000/users/admin/${user._id}`;
                fetch(url, {
                    method: 'PATCH'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.modifiedCount) {
                            refetch();
                            console.log("Admin Updated");
                        }
                    })
            }
        });
    }

    // const handleDelete = user => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             delUser(user)
    //                 .then(() => {
    //                     const url = `http://localhost:5000/users/${user._id}`;
    //                     fetch(url, {
    //                         method: 'DELETE'
    //                     })
    //                         .then(res => res.json())
    //                         .then(data => {
    //                             if (data.deletedCount > 0) {
    //                                 refetch();
    //                             }
    //                         })
    //                     Swal.fire({
    //                         title: "Deleted!",
    //                         text: "User has been deleted.",
    //                         icon: "success"
    //                     });
    //                 });
    //         }
    //     });
    // }

    return (
        <div className="w-full m-5">
            <Helmet>
                <title>Bistro | All Users</title>
            </Helmet>
            <SectionTitle
                subHeding={"How Many?"}
                heading={"Manage All User's"}
            ></SectionTitle>
            <div className="font-semi-bold  flex justify-between items-center p-5 m-5 shadow-lg text-sans rounded-full">
                <p className="text-3xl">Total Users {users.length < 10 ? `0${users.length}` : `${users.length}`}</p>
                <p className="text-3xl">Total Admin 00</p>
                <p className="text-3xl">Total User 00</p>
            </div>
            <div>
                <div className="overflow-x-auto m-5 p-5 shadow-lg rounded-lg">
                    <table className="table">
                        <thead>
                            <tr className="rounded-lg shadow-lg">
                                <th className="text-center">Sl. No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th className="text-center">Role</th>
                                <th className="text-center">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, idx) => <tr
                                    key={user._id}
                                >
                                    <td className="text-center boder shadow-lg">
                                        {
                                            (idx < 10)
                                                ?
                                                `0${idx + 1}`
                                                :
                                                `{idx+1}`
                                        }
                                    </td>
                                    <td>
                                        <div className="font-bold">{user.name}</div>
                                    </td>
                                    <td className="w-64">
                                        {user.email}
                                    </td>
                                    <td>
                                        {
                                            user.role === 'admin'
                                                ?
                                                <div className="text-center">Admin</div>
                                                :
                                                <div
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="flex justify-center items-center text-2xl cursor-pointer text-black m-3 p-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-red-500">
                                                    <FaUserShield />
                                                </div>
                                        }

                                    </td>
                                    <td>
                                        <div
                                            // onClick={() => handleDelete(user)}
                                            className="flex justify-center items-center text-2xl cursor-pointer text-black m-3 p-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-red-500">
                                            <MdOutlineDeleteSweep />
                                        </div>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;