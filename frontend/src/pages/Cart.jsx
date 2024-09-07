import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { useEffect, useState } from "react";



const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState([]);

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (cartItems.length) {
            setQty(oldQty => {
                const Arr = cartItems.map(items => items.qty);
                return Arr;
            });
        }
    }, [cartItems, setQty]);

    const addToCartHandler = (product, qty, operator, item) => {
        if (operator === "add") {
            if (!(qty === Number(item.countInStock))) qty++;
        } else {
            if (!(qty === 1)) qty--;
        }
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkOutHandler = () => {
        navigate('/shipping');
    };
    const handleQty = (item, operator, idx,) => {

        setQty((oldQty) => {
            return oldQty.map((q, i) => {
                if (i === idx) {
                    if (operator === "add") {
                        if (!(q === Number(item.countInStock))) return Number(q) + 1;
                    } else {
                        if (!(q === 1)) return Number(q) - 1;
                    }
                }
                return q;
            });
        });
        addToCartHandler(item, qty[idx], operator, item);



    };

    return (
        <>
            <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
                {cartItems.length === 0 ? (
                    <div>Your cart is empty, <Link to='/shop'>go to shop</Link></div>
                ) : (
                    <>
                        <div className="flex flex-col w-[80%]">
                            <h1 className="text-2xl-font-semibold mb-4">Shopping Cart</h1>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-16 py-3">
                                                <span className="sr-only">Image</span>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Product
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Brand
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {cartItems.map((item, idx) => (
                                            <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                                                <td className="p-4">
                                                    <img src={item.image} className="w-16 md:w-32 max-w-full max-h-full" alt={item.name} />
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {item.brand}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => handleQty(item, "minus", idx)} type="button">
                                                            <span className="sr-only">Quantity button</span>
                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                            </svg>
                                                        </button>
                                                        <div>
                                                            <input type="number" value={qty[idx]} id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required min={1} max={Number(item.countInStock)} disabled="disabled" />
                                                        </div>
                                                        <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => handleQty(item, "add", idx)} type="button">
                                                            <span className="sr-only">Quantity button</span>
                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    ${item.price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="text-red-500" onClick={() => removeFromCartHandler(item._id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-8 w-[40rem]">
                                <div className="p-4 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Items ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                                    </h2>
                                    <div className="text-2xl font-bold">
                                        ${' '}
                                        {cartItems.reduce((acc, item) => acc + Number(item.qty * item.price), 0).toFixed(2)}
                                    </div>

                                    <button className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full" disabled={cartItems.length === 0} onClick={checkOutHandler}>
                                        Proceed to Checkout
                                    </button>

                                </div>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;
