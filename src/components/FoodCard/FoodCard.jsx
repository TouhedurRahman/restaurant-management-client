import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../../Hooks/useCart";

const FoodCard = ({ item }) => {
    const { user } = useContext(AuthContext);
    const { _id, name, image, price, recipe } = item;
    const [, refetch] = useCart();

    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = (item) => {
        console.log(item);
        if (user) {
            const cartItem = { menuItemId: _id, name, image, recipe, price, email: user.email }
            const url = 'http://localhost:5000/cart';
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: "Item is added to the cart!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
        else {
            Swal.fire({
                title: "Please, Login to order the food.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className="absolute right-0 mt-4 mr-4 px-4 bg-slate-900 text-white rounded-full">${price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title">{name}</h2>
                    <p className="text-center">
                        {recipe.slice(0, 60)}... <Link className="text-blue-700 hover:link">more</Link>
                    </p>
                    <div className="card-actions justify-end">
                        <button
                            onClick={() => handleAddToCart(item)}
                            className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4 text-black"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

FoodCard.propTypes = {
    item: PropTypes.object.isRequired
}

export default FoodCard;