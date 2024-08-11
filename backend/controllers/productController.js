import Product from "../models/productModel.js";

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand, image } = req.fields;
        //    Validation
        switch (true) {
            case !name:
                return res.json({ error: 'Name is required' });
            case !description:
                return res.json({ error: 'Description is required' });
            case !price:
                return res.json({ error: 'Price is required' });
            case !category:
                return res.json({ error: 'Category is required' });
            case !quantity:
                return res.json({ error: 'Quantity is required' });
            case !brand:
                return res.json({ error: 'Brand is required' });
            case !image:
                return res.json({ error: 'Image is required' });
        }



        const product = new Product(req.fields);
        await product.save();
        res.json(product);

    } catch (err) {
        console.error(err);
        res.status(400).json(err.message);
    }
};

const updateProductDetails = async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand, image } = req.fields;
        //    Validation
        switch (true) {
            case !name:
                return res.json({ error: 'Name is required' });
            case !description:
                return res.json({ error: 'Description is required' });
            case !price:
                return res.json({ error: 'Price is required' });
            case !category:
                return res.json({ error: 'Category is required' });
            case !quantity:
                return res.json({ error: 'Quantity is required' });
            case !brand:
                return res.json({ error: 'Brand is required' });
            case !image:
                return res.json({ error: 'Image is required' });
        }

        const product = await Product.findOneAndUpdate({ _id: req.params.id }, { ...req.fields }, { new: true });
        res.json(product);


    } catch (err) {
        console.error(err);
        res.status(400).json(err.message);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const fetchProducts = async (req, res) => {
    try {

        const pageSize = 6;
        const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword }).limit(pageSize);

        res.json({ products, page: 1, pages: Math.ceil(count / pageSize), hasMore: false });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error.' });
    }
};

const readProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (product) {
            return res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found.');
        }

    } catch (err) {
        console.error(err);
        res.status(404).json({ error: 'Product not found.' });
    }
};

const fetchAllProducts = async (req, res) => {
    try {

        const products = await Product.find({}).populate('category').limit(12).sort({ createAt: -1 });
        res.json(products);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error.' });
    }
};



const addProductReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            // const productReviews = product.reviews;
            // console.log(productReviews);
            const alreadyReviewed = product.reviews.some(r => r.user.toString() === req.user._id.toString());

            if (alreadyReviewed) {
                res.status(400);
                throw new Error('Product already reviwed.');
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;

            product.rating = (product.reviews.reduce((acc, rev) => acc + rev.rating, 0)) / product.reviews.length;
            // console.log(product.rating);
            await product.save();
            res.status(201).json({ message: 'Review added.' });


        } else {
            res.status(404);
            throw new Error('Product not found.');
        }
    } catch (err) {
        console.error(err);
        res.status(400).json(err.message);
    }
};

const fetchTopProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(4);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(400).json(err.message);
    }
};


const fetchNewProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ _id: -1 }).limit(4);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(400).json(err.message);
    }
};

export { addProduct, updateProductDetails, deleteProduct, fetchProducts, readProduct, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts };

