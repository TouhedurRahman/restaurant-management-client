import { NavLink, Outlet } from "react-router-dom";
import { FaCalendarAlt, FaShoppingCart, FaBook } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { ImHome } from "react-icons/im";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoFastFoodSharp } from "react-icons/io5";
import { PiUserSwitchFill } from "react-icons/pi";
import { RiSoundModuleFill } from "react-icons/ri";
import { FaUtensils } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-[#D1A054] text-base-content">
                        {/* Sidebar content here */}
                        {
                            isAdmin
                                ?
                                <>
                                    <li><NavLink to="/adminhome"><ImHome /> Admin Home</NavLink></li>
                                    <li><NavLink to="/dashboard/Additem"><FaUtensils /> Add Items </NavLink></li>
                                    <li><NavLink to="/dashboard/manageitems"><RiSoundModuleFill /> Manage Items</NavLink></li>
                                    <li><NavLink to="/dashboard/managebookings"><FaBook /> Manage Bookings</NavLink></li>
                                    <li><NavLink to="/dashboard/allusers"><PiUserSwitchFill />All Users</NavLink></li>
                                </>
                                :
                                <>
                                    <li><NavLink to="/"><ImHome /> User Home</NavLink></li>
                                    <li><NavLink to="/dashboard/reservation"><FaCalendarAlt /> Reservation</NavLink></li>
                                    <li><NavLink to="/dashboard/paymenthistorty"><GiWallet /> Payment History</NavLink></li>
                                    <li><NavLink to="/dashboard/mycart"><FaShoppingCart /> My Cart</NavLink></li>
                                </>
                        }

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