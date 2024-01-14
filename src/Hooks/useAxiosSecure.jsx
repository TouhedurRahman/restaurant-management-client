import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000/"
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access-token");
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        (error) => Promise.reject(error)
    );

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 401 || status === 403) {
                        logOut();
                        toast.error("Something went wrong. Please login again.");
                        navigate("/login", { state: { from: location } });
                    }
                }
                return Promise.reject(error);
            }
        );
    }, [logOut, location, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;