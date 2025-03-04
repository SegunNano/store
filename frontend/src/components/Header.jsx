import { useFetchTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";



const Header = () => {
    const { data, isLoading, error } = useFetchTopProductsQuery();

    if (isLoading) return <Loader />;
    if (error) return <div className="">ERROR</div>;


    return (
        <>
            <div className="flex justify-around">

                <ProductCarousel />

            </div>
        </>
    );
};

export default Header;


