import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/useCart";
import { MdOutlineDeleteSweep } from "react-icons/md";

const MyCart = () => {
    const [cart] = useCart();
    console.log(cart);

    const totalPrice = cart.reduce((accumulator, item) => accumulator + item.price, 0);

    const handleDelete = (item) => {
        console.log(item, "Deleted");
    }

    return (
        <div className="w-full">
            <Helmet>
                <title>Bistro | My Cart</title>
            </Helmet>
            <div className="font-semi-bold  flex justify-between items-center p-5 m-5 shadow-lg text-sans">
                <p className="text-3xl">Total Item(s) {cart.length}</p>
                <p className="text-3xl">Total Price $ {totalPrice.toFixed(2)}/-</p>
                <button className="btn btn-warning btn-sm">PAY</button>
            </div>
            <div>
                <div className="overflow-x-auto m-5 p-5 shadow-lg">
                    <table className="table">
                        {/* head */}
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