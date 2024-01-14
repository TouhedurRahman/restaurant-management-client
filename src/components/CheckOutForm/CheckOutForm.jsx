import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ cart, price }) => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (price > 0) {
            const url = "/create-payment-intent";
            axiosSecure
                .post(url, { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // console.log('Card', card);

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log(error);
            setCardError(error.message);
        } else {
            setCardError('');
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous',
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        setProcessing(false);

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            // save payment info to server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId),
                itemName: cart.map(item => item.name),
                status: 'service pending',
                date: new Date()
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    if (res.data.insertResult.insertedId && res.data.deleteResult.deletedCount > 0) {
                        Swal.fire({
                            title: "Payment successfull!",
                            text: `Thank you`,
                            icon: "success"
                        });
                        navigate('/');
                    }
                })
        }
    }

    return (
        <div className="mt-12">
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="w-1/2 mt-12 mb-6 border-2 px-8 py-4 rounded-lg">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": {
                                        color: "#aab7c4",
                                    },
                                },
                                invalid: {
                                    color: "#9e2146",
                                },
                            },
                        }}
                    />
                </div>
                {
                    cardError && (
                        <p className="text-red-500 text-center font-semibold text-2xl">
                            {cardError}
                        </p>
                    )
                }
                {
                    transactionId && (
                        <p className="text-green-500 text-center font-semibold text-2xl">
                            Transaction Successfull.<br />
                            <span className="text-black">
                                Transaction ID: {transactionId}
                            </span>
                        </p>
                    )
                }
                <button
                    type="submit"
                    className="btn btn-outline border-0 border-b-4 mt-4 text-black"
                    disabled={!stripe || !clientSecret || processing}
                >
                    Pay {price}/-
                </button>
            </form>
        </div>
    );
};

export default CheckOutForm;