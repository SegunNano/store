import Category from "../models/categoryModel.js";

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ error: "Name is required" });
        }

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.json({ error: "Already exists" });
        }
        const category = new Category({ name });
        await category.save();
        res.json(category);

    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId });

        if (!category) {
            return res.status(404).json({ error: 'Category Not Found' });
        }
        category.name = name;

        const updatedCategory = await category.save();
        res.json(updatedCategory);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Intenal Server Error' });
    }
};


const deleteCategory = async (req, res) => {
    try {
        const removedCat = await Category.findByIdAndDelete(req.params.categoryId);
        res.json(removedCat);


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Intenal Server Error' });
    }
};

const readCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        res.json(category);


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
const listCategory = async (req, res) => {
    try {
        const allCategory = await Category.find();
        res.json(allCategory);


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};





export { createCategory, updateCategory, deleteCategory, listCategory, readCategory };