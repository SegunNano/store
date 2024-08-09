import Product from "../models/productModel.js";

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields;
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
        }



        const product = new Product(req.fields);
        await product.save();
        res.json(product);

    } catch (err) {
        console.error(err);
        res.status(400).json(err.message);
    }
};

export { addProduct };

