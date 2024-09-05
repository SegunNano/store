import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
    return (
        <>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-[2rem] ml-[2rem] 1fr">
                <div className="relative">
                    <img className="rounded-t-lg w-full aspect-square object-cover" src={product.image} alt={product.name} />
                    <HeartIcon product={product} />
                </div>
                <div className="p-5 bg-pink-100">
                    <Link to={`/product/${product._id}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                        <span className="bg-pink-100 textpink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">$ {product.price}</span>
                    </Link>
                </div>
            </div>

        </>
    );
};

export default SmallProduct;
