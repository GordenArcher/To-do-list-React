import { useContext, useEffect, useState } from "react"
import Axios from "axios"
import { AuthContext } from "../context/AuthContext";

export const FetchTaskData = () => {

    const { token } = useContext(AuthContext)
    const [allTodo, setAllTodo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get("http://localhost:8000/api/getalltodo/", {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                console.log(response.data);
                setAllTodo(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if(token) {
            fetchData()
        }
    }, [token]);

    return allTodo;
};
