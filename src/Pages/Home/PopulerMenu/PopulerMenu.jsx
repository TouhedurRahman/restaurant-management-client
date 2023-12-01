import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";

const PopulerMenu = () => {
    // const [menu, setMenu] = useState([]);

    // useEffect(() => {
    //     const url = '/menu.json';
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category === 'popular');
    //             setMenu(popularItems);
    //         });
    // }, []);

    const [menu] = useMenu();
    const populer = menu.filter(item => item.category === 'popular');

    return (
        <div className="mb-12">
            <SectionTitle
                subHeding={"Populer Items"}
                heading={"From Our Menu"}
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-4">
                {
                    populer.map(item => <MenuItem
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

export default PopulerMenu;