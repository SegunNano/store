import { useFetchTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";



const Header = () => {
    const { data, isLoading, error } = useFetchTopProductsQuery();

    if (isLoading) return <Loader />;
    if (error) return <div className="">ERROR</div>;


    return (
        <>
            <div className="flex justify-around">
                <div className="xl:block lg:hidden md:hidden sm:hidden">
                    <div className="grid grid-col-2">
                        {data.map(product => (
                            <div key={product._id}>
                                <SmallProduct product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
