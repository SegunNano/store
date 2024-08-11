import mongoose from "mongoose";
const schema = mongoose.Schema;
const { ObjectId } = schema;

const required = true;

const reviewSchema = schema({
    name: { type: String, required },
    rating: { type: Number, required },
    comment: { type: String, required },
    user: { type: schema.Types.ObjectId, ref: 'User', required }
}, { timestamps: true });


const productSchema = schema({
    name: { type: String, required },
    image: { type: String, required },
    description: { type: String, required },
    brand: { type: String, required },
    quantity: { type: Number, required },
    category: { type: ObjectId, ref: 'Category', required },
    reviews: [reviewSchema],
    rating: { type: Number, required, default: 0 },
    numReviews: { type: Number, required, default: 0 },
    price: { type: Number, required, default: 0 },
    countInStock: { type: Number, required, default: 0 },

}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

export default Product;