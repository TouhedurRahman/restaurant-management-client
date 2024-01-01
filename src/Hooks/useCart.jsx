import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: cart = [], refetch } = useQuery({
        queryKey: ["cart", user?.email],
        enabled: !loading,
        /*
        queryFn: async () => {
            const url = `http://localhost:5000/cart?email=${user?.email}`;
            const res = await fetch(url, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return res.json();
        },
        */

        queryFn: async () => {
            if (!user) {
                return []
            }
            const res = await axiosSecure.get(`/cart?email=${user?.email}`);
            return res.data;
        }
    });
    return [cart, refetch];
};

export default useCart;