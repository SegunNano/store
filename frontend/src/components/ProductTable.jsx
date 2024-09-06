import { Link } from "react-router-dom";

const ProductTable = ({ items }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-2 bg-pink-50 dark:bg-pink-800">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3 bg-pink-50 dark:bg-pink-800">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 bg-pink-50 dark:bg-pink-800">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (

                        <tr key={index} className="border-b border-pink-200 dark:border-pink-700">
                            <td className="p-2">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-pink-50 dark:text-white dark:bg-pink-800">
                                <Link to={`/product/${item._id}`}>  {item.name}</Link>
                            </th>
                            <td className="px-6 py-4">
                                {item.qty}
                            </td>
                            <td className="px-6 py-4 bg-pink-50 dark:bg-pink-800">
                                ${item.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                                ${(item.price * item.qty).toFixed(2)}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    );
};

export default ProductTable;
