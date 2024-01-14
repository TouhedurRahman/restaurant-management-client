import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = async (id, name) => {
        // console.log({ id, name });
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        if (isConfirmed) {
            const { data } = await axiosSecure.delete(`/menu/${id}`);
            if (data.deletedCount > 0) {
                // refetch data to update ui
                refetch();
                Swal.fire({
                    icon: "success",
                    title: `"${name}" successfully deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    return (
        <div className="w-full m-5">
            <Helmet>
                <title>Bistro | Manage Items</title>
            </Helmet>
            <SectionTitle
                subHeding={"Hurry Up"}
                heading={"Manage All Items"}
            ></SectionTitle>
            {
                loading
                    ?
                    (
                        <span className="loading loading-infinity loading-lg"></span>
                    )
                    :
                    (
                        <div className="overflow-x-auto m-5 p-5 shadow-lg rounded-lg">
                            <table className="table">
                                <thead>
                                    <tr className="rounded-lg shadow-lg">
                                        <th className="text-center">Sl. No.</th>
                                        <th className="text-center">Image</th>
                                        <th>Name</th>
                                        <th className="text-right">Price</th>
                                        <th className="text-center">Update</th>
                                        <th className="text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        menu.map(({ _id, name, image, price }, idx) => <tr
                                            key={_id}
                                        >
                                            <td className="text-center boder shadow-lg">
                                                {
                                                    (idx < 10)
                                                        ?
                                                        `0${idx + 1}`
                                                        :
                                                        `${idx + 1}`
                                                }
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={image} alt={name} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="font-bold">{name}</div>
                                            </td>
                                            <td className="text-right">
                                                {price}/-
                                            </td>
                                            <td>
                                                {
                                                    <div
                                                        className="flex justify-center items-center text-2xl cursor-pointer text-black m-3 p-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-red-500">
                                                        <FaPencil />
                                                    </div>
                                                }

                                            </td>
                                            <td>
                                                <div
                                                    onClick={() => handleDeleteItem(_id, name)}
                                                    title={`Delete "${name}"`}
                                                    className="flex justify-center items-center text-2xl cursor-pointer text-black m-3 p-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-red-500">
                                                    <FaTrashAlt />
                                                </div>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
            }
        </div>
    );
};

export default ManageItems;