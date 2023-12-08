import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const Main = () => {
    const location = useLocation();
    const isLoginPage = location.pathname.includes('login');

    return (
        <div>
            {
                isLoginPage || <Navbar />
            }
            <Outlet />
            {
                isLoginPage || <Footer />
            }
            <ScrollToTop />
        </div>
    );
};

export default Main;