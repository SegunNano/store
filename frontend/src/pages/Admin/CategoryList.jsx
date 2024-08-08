import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";

const CategoryList = () => {
    const { data: categories } = useFetchCategoriesQuery();
    console.log(categories);

    return (
        <div className="ml-[10rem] flex flex-col md:flex-row">
            {/* <AdminMenu/> */}
            <div className="md:w-3/4 p-3">
                <div className="h-12">Manage Categories</div>
                <CategoryForm />
            </div>
        </div>
    );
};

export default CategoryList;
