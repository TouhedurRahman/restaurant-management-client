import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import { ImHome } from "react-icons/im";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoFastFoodSharp } from "react-icons/io5";
import { RiLogoutCircleRFill } from "react-icons/ri";
import useAuth from "../../../Hooks/useAuth";
import useAdmin from "../../../Hooks/useAdmin";
import { LuLayoutDashboard } from "react-icons/lu";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const [isScrolled, setIsScrolled] = useState(false);
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrolled = scrollTop > 0;
            setIsScrolled(scrolled);
        };
        // Add scroll event listener when component mounts
        window.addEventListener('scroll', handleScroll);

        // Remove scroll event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navOptions = <>
        <li><Link to="/"> <ImHome /> Home</Link></li>
        <li><Link to="/menu"><BsFillMenuButtonWideFill />Our Menu</Link></li>
        <li><Link to="/order/salad"><IoFastFoodSharp /> Order Food</Link></li>
        <li>
            <Link
                to={isAdmin ? '/dashboard/adminhome' : '/dashboard/userhome'}
            >
                <LuLayoutDashboard /> Dashboard
            </Link>
        </li>
        {
            !isAdmin &&
            <li>
                <Link to='/dashboard/mycart'>
                    <FaShoppingCart />
                    <div className="badge badge-secondary">{cart?.length || 0}</div>
                </Link>
            </li>
        }

        {
            user
                ?
                <>
                    {/* <span>{user?.displayName}</span> */}
                    <li><Link onClick={handleLogOut}><RiLogoutCircleRFill /> Logout</Link></li>
                </>
                :
                <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </>
        }
    </>

    return (
        <>
            {/* <div className="navbar fixed max-w-screen-xl z-10 bg-opacity-30 bg-black text-white"> */}
            <div
                className={`navbar fixed max-w-screen-xl z-10 ${isScrolled ? 'bg-white text-black' : 'bg-black text-white bg-opacity-30'
                    }`}
            >
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                navOptions
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost upper-case text-xl font-serif">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navOptions
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </>
    );
};

export default Navbar;