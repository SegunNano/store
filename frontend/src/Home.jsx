import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Message from "./components/Message";


const Home = () => {
    const { keyword } = useParams();
    const { data, isLoading, error } = useGetProductsQuery();


    return (
        <>
            {!keyword ? <Header /> : null}
        </>
    );
};

export default Home;
