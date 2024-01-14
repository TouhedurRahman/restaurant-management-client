import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckOutForm from "../../../components/CheckOutForm/CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../Hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const [cart] = useCart();

    const totalPrice = parseFloat((cart.reduce((accumulator, item) => accumulator + item.price, 0)).toFixed(2));

    return (
        <div className="w-full m-5">
            <Helmet>
                <title>Bistro | Payment</title>
            </Helmet>
            <SectionTitle
                subHeding={"Please pay"}
                heading={"Payment"}
            ></SectionTitle>

            <Elements stripe={stripePromise}>
                <CheckOutForm
                    cart={cart}
                    price={totalPrice}
                ></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;