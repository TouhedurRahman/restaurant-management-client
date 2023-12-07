
const FoodCard = ({ item }) => {
    const { name, image, price, recipe } = item;

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className="absolute right-0 mt-4 mr-4 px-4 bg-slate-900 text-white rounded-full">${price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title">{name}</h2>
                    <p className="text-center">{recipe.slice(0, 60)}... <span className="text-blue-700 hover:underline cursor-pointer">more</span></p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4 text-black">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;