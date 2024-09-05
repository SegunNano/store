import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";


const Product = ({ product }) => {
    return (
        <div className="w-30rem ml-[2rem] p-3 relative">
            <div className="relative">
                <img src={product.image} alt={product.name} className="w-[30rem] h-[20rem] object-cover rounded" />

                <HeartIcon product={product} />

            </div>

            <div className="p-5 bg-pink-100">
                <Link to={`/product/${product._id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                    <span className="bg-pink-100 textpink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">$ {product.price}</span>
                </Link>
            </div>
        </div>
    );
};

export default Product;
