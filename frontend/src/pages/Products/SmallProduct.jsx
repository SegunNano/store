import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
    return (

        <div className="flex justify-between">
            <div class="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-[94%] max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mt-5">
                <div class="">
                    <img src={product.image} alt={product.name} class="w-full h-[15rem] object-cover rounded-2xl" />
                </div>

                <div class=" p-6">
                    <h3 class="text-2xl text-gray-800 font-extrabold">{product.name}</h3>

                    <div class="mt-6 flex items-center">
                        <h3 class="text-xl text-gray-800 font-bold flex-1">$ {product.price.toFixed(2)}</h3>
                        <HeartIcon product={product} type={"SmallProduct"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmallProduct;
