import mongoose from "mongoose";
const required = true;
const schema = mongoose.Schema;
const orderSchema = schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required
    },
    orderItems: [
        {
            name: { type: String, required },
            image: { type: String, required },
            qty: { type: Number, required },
            price: { type: Number, required },
            product: {
                type: schema.Types.ObjectId,
                ref: 'Product',
                required
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required },
        city: { type: String, required },
        postalCode: { type: String, required },
        country: { type: String, required }
    },
    paymentMethod: { type: String, required },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    itemsPrice: { type: Number, default: 0.0, required },
    taxPrice: { type: Number, default: 0.0, required },
    shippingPrice: { type: Number, default: 0.0, required },
    totalPrice: { type: Number, default: 0.0, required },
    isPaid: { type: Boolean, default: false, required },
    isDelivered: { type: Boolean, default: false, required },
    paidAt: { type: Date },
    deliveredAt: { type: Date },

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;