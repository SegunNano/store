
const ShippingInput = ({ label, value, setValue }) => {
    return (
        <div className="mb-4">
            <label htmlFor="" className="block  mb-2">{label}</label>
            <input type="text" placeholder={`Enter ${label}`} className="w-full p-2 border rounded" value={value} onChange={e => setValue(e.target.value)} />
        </div>
    );
};

export default ShippingInput;
