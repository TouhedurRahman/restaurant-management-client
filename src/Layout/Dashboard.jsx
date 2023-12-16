import { NavLink, Outlet } from "react-router-dom";
import { FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { ImHome } from "react-icons/im";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoFastFoodSharp } from "react-icons/io5";

const Dashboard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-[#D1A054] text-base-content">
                        {/* Sidebar content here */}
                        <li><NavLink to="/"><ImHome /> User Home</NavLink></li>
                        <li><NavLink to="/dashboard/reservation"><FaCalendarAlt /> Reservation</NavLink></li>
                        <li><NavLink to="/dashboard/paymenthistorty"><GiWallet /> Payment History</NavLink></li>
                        <li><NavLink to="/dashboard/mycart"><FaShoppingCart /> My Cart</NavLink></li>

                        <div className="divider">OR</div>

                        <li><NavLink to="/"> <ImHome /> Home</NavLink></li>
                        <li><NavLink to="/menu"><BsFillMenuButtonWideFill />Our Menu</NavLink></li>
                        <li><NavLink to="/order/salad"><IoFastFoodSharp /> Order Food</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;