const ShippingInput = ({ label, value, setValue, }) => {
    return (
        <div className="mb-4">
            <label htmlFor="" className="block mb-2">{label}</label>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="w-full p-2 border rounded" />
        </div>
    );
};

export default ShippingInput;
