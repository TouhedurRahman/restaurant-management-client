import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

const useMenu = () => {
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const url = 'http://localhost:5000/menu';
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data);
    //             setLoading(false);
    //         });
    // }, []);

    const { data: menu = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const url = 'http://localhost:5000/menu';
            const result = await fetch(url);
            return result.json();
        }
    })

    return [menu, loading, refetch];
};

export default useMenu;