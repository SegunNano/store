import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Message from "./components/Message";


const Home = () => {
    const { keyword } = useParams();
    const { data, isLoading, isError } = useGetProductsQuery();
    console.log(isError);

    return (
        <>
            {!keyword ? <Header /> : null}
            {/* {isLoading ? (<Loader />) : isError ? (<Message variant='danger'>
                {isError?.data?.message || isError}
            </Message>) : (
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
                            Special Product
                        </h1>

                        {<Link to='/shop'  className="bg"></Link> }

                    </div>
                </>
            )} */}
        </>
    );
};

export default Home;
