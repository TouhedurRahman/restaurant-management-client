import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="mb-10">
            {
                title
                &&
                <div className="mb-10">
                    <Cover
                        img={img}
                        title={title}
                    />
                </div>
            }
            <div className="grid md:grid-cols-2 gap-4 mx-10">
                {
                    items.slice(0, 6).map(item => <MenuItem
                        key={item._id}
                        item={item}
                    >
                    </MenuItem>)
                }
            </div>
            <div className="text-center">
                <button className="btn btn-outline border-0 border-b-4 mt-4 text-black">View full Menu</button>
            </div>
        </div>
    );
};

export default MenuCategory;