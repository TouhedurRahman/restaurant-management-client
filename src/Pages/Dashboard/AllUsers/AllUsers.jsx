import { useQuery } from "@tanstack/react-query";
import { MdOutlineDeleteSweep } from "react-icons/md";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
    // const { data: users = [] } = useQuery(['users'], async () => {
    //     const res = await fetch('http://localhost:5000/users');
    //     return res.json();
    // });

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users`)
            return res.json();
        }
    })

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
                                        <div
                                            // onClick={() => handleDelete(item)}
                                            className="flex justify-center items-center text-2xl cursor-pointer text-black m-3 p-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-red-500">
                                            <MdOutlineDeleteSweep />
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            // onClick={() => handleDelete(item)}
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