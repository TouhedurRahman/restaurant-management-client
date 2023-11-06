const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className="flex space-x-2">
            <img className="w-[104px]" style={{ borderRadius: '0 200px 200px 200px' }} src={image} alt="" />
            <div>
                <h3 className="uppercase font-bold italic">{name}</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500 my-auto">৳{price}/-</p>
        </div>
    );
};

export default MenuItem;