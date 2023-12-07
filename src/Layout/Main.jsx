import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const Main = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default Main;