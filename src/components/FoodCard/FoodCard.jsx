import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const FoodCard = ({ item }) => {
    const { name, image, price, recipe } = item;

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
                        <button className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4 text-black">Add to Cart</button>
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