import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const UserHome = () => {
    return (
        <div className="w-full m-5">
            <Helmet>
                <title>Bistro | User Home</title>
            </Helmet>
            <SectionTitle
                subHeding={"Welcome back"}
                heading={"User Home"}
            ></SectionTitle>
        </div>
    );
};

export default UserHome;