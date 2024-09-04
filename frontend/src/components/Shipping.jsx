import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress, savePaymentMethod } from "../redux/features/cart/cartSlice";
import ShippingInput from "../pages/Orders/ShippingInput";
import ProgressStepper from "./ProgressStepper";


const Shipping = () => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;


    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log({ paymentMethod, address, country, city, postalCode });
        dispatch(savePaymentMethod(paymentMethod));
        dispatch(saveShippingAddress({ address, country, city, postalCode }));
        navigate('/place-order');

    };

    useEffect(() => {
        if (!shippingAddress.address) navigate('/shipping');
    }, [navigate, shippingAddress]);


    return (
        <div className="container mx-auto mt-10">
            <ProgressStepper step1 step2 />
            <div className="flex flex-wrap justify-around items-center mt-[10rem]">
                <form onSubmit={handleSubmit} className="w-[40rem]">
                    <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
                    <ShippingInput label={'Address'} value={address} setValue={setAddress} />

                    <ShippingInput label={'City'} value={city} setValue={setCity} />

                    <ShippingInput label={'Postal code'} value={postalCode} setValue={setPostalCode} />

                    <ShippingInput label={'Country'} value={country} setValue={setCountry} />
                    <div className="mb-4">
                        <label htmlFor="" className="block text-[#635C50]">Select Payment Method</label>
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input type="radio" value="PayPal" name="paymentMethod" className="form-radio text-pink-500" onChange={e => setPaymentMethod(e.target.value)} />

                                <span className="ml-2">PayPal or Credit Card</span>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full">Continue</button>
                </form>
            </div>
        </div>
    );
};

export default Shipping;
