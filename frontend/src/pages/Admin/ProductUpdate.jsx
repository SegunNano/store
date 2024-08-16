import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation, useDeleteProductMutation, useFetchProductQuery, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";


const ProductUpdate = () => {

    const params = useParams();
    const { data: productData } = useFetchCategoriesQuery(params._id);

    const [image, setImage] = useState(productData.image || '');
    const [name, setName] = useState(productData.name || '');
    const [description, setDescription] = useState(productData.description || '');
    const [price, setPrice] = useState(productData.price || '');
    const [category, setCategory] = useState(productData.category || '');
    const [quantity, setQuantity] = useState(productData.quantity || '');
    const [brand, setBrand] = useState(productData.brand || '');
    const [stock, setStock] = useState(productData?.countInStock || 0);
    // const [imageUrl, setImageUrl] = useState(null);

    const navigate = useNavigate();
    const [uploadProductImage] = useUploadProductImageMutation();
    const { data: categories = [] } = useFetchCategoriesQuery();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category);
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setName(productData.name);
            setImage(productData.image);
        }
    }, [productData]);


    return (
        <div>

        </div>
    );
};

export default ProductUpdate;
