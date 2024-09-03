const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
};


const calcPrices = (orderItems) => {
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 1;
    const taxRate = 0.15;
    const taxPrice = (taxRate * itemsPrice).toFixed(2);
    const totalPrice = (itemsPrice + shippingPrice + parseFloat(taxPrice)).toFixed(2);
    return {
        itemsPrice: addDecimals(itemsPrice),
        shippingPrice: addDecimals(shippingPrice),
        taxPrice,
        totalPrice
    };
};

export { calcPrices };