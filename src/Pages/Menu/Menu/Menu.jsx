import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === 'offered');
    const desserts = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');

    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover img={menuImg} title={"Our Menu"} />
            <SectionTitle
                subHeding={"Don't Miss"}
                heading={"Today's Offer"}
            ></SectionTitle>
            <MenuCategory
                items={offered}
            />

            <MenuCategory
                items={desserts}
                title={"dessert"}
                img={dessertImg}
            />

            <MenuCategory
                items={pizza}
                title={"pizza"}
                img={pizzaImg}
            />

            <MenuCategory
                items={salad}
                title={"salad"}
                img={saladImg}
            />

            <MenuCategory
                items={soup}
                title={"soup"}
                img={soupImg}
            />
        </div>
    );
};

export default Menu;