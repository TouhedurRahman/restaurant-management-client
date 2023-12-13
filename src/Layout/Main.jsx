import { Outlet, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import { useEffect } from 'react';

const Main = () => {
    const location = useLocation();
    const isLogRegPage = location.pathname.includes('login') || location.pathname.includes('register');

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div>
            {
                isLogRegPage || <Navbar />
            }
            <Outlet />
            {
                isLogRegPage || <Footer />
            }
            <ScrollToTop />
        </div>
    );
};

export default Main;