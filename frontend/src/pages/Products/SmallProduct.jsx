import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
    return (
        <div className="w-[20rem] ml-[2rem] p-3 1fr">
            <div className="relative">
                <img src={product.image} alt={product.name} className="h-auto rounded" />
                {/* {<HeartIcon product/>} */}
            </div>
            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h2 className="flex justify-between items-center">
                        <div className="">{product.name}</div>
                    </h2>
                    <span className="bg-pink-100 textpink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">$ {product.price}</span>
                </Link>
            </div>
        </div>
    );
};

export default SmallProduct;
