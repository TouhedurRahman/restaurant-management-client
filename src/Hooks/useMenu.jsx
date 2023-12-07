import { useEffect, useState } from "react";

const useMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = 'http://localhost:5000/menu';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMenu(data);
                setLoading(false);
            });
    }, []);

    return [menu, loading];
};

export default useMenu;