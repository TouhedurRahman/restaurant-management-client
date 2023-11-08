import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopulerMenu from "../PopulerMenu/PopulerMenu";

const Home = () => {
    return (
        <div>
            <Banner />
            <Category />
            <PopulerMenu />
            <Featured />
        </div>
    );
};

export default Home;