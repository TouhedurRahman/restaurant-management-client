import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/useCart";
import { MdOutlineDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const MyCart = () => {
    const [cart, refetch] = useCart();
    // console.log(cart);

    const totalPrice = cart.reduce((accumulator, item) => accumulator + item.price, 0);

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `http://localhost:5000/cart/${item._id}`;
                fetch(url, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="w-full m-5">
            <Helmet>
                <title>Bistro | My Cart</title>
            </Helmet>
            <SectionTitle
                subHeding={"My Cart"}
                heading={"Wanna Add More"}
            ></SectionTitle>
            <div className="font-semi-bold  flex justify-between items-center p-5 m-5 shadow-lg text-sans rounded-full">
                <p className="text-3xl">Total Item(s) {cart.length < 10 ? `0${cart.length}` : `${cart.length}`}</p>
                <p className="text-3xl">Total Price $ {totalPrice.toFixed(2)}/-</p>
                <Link to='/dashboard/payment'>
                    <button className="btn btn-warning btn-sm">PAY</button>
                </Link>
            </div>
            <div>
                <div className="overflow-x-auto m-5 p-5 shadow-lg rounded-lg">
                    <table className="table">
                        <thead>
                            <tr className="text-center rounded-lg shadow-lg">
                                <th>Sl. No.</th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, idx) => <tr
                                    key={item._id}
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
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.recipe}
                                    </td>
                                    <td className="text-left">{item.price}/-</td>
                                    <td>
                                        <div
                                            onClick={() => handleDelete(item)}
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

export default MyCart;