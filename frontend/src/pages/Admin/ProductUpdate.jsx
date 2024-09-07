import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



import { useUpdateProductMutation, useDeleteProductMutation, useFetchProductQuery, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";


const ProductUpdate = () => {

    const params = useParams();
    const { data: productData } = useFetchProductQuery(params._id);

    const [image, setImage] = useState(productData?.image || '');
    const [name, setName] = useState(productData?.name || '');
    const [description, setDescription] = useState(productData?.description || '');
    const [price, setPrice] = useState(productData?.price || '');
    const [category, setCategory] = useState(productData?.category || '');
    const [quantity, setQuantity] = useState(productData?.quantity || '');
    const [brand, setBrand] = useState(productData?.brand || '');
    const [stock, setStock] = useState(productData?.countInStock || 0);
    const [imageUrl, setImageUrl] = useState(null);

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
            setStock(productData.countInStock);
        }
    }, [productData]);

    const uploadImageHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success('Items added successfully');
            setImage(res.image);
        } catch (err) {
            console.log(err);
            toast.error('Item Add Failed');
        }

    };

    const handleUpdate = async (e) => {
        e.preventDefault();


        try {
            const formData = new FormData();

            formData.append('image', image);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('quantity', quantity);
            formData.append('brand', brand);
            formData.append('countInStock', stock);
            formData.append('price', price);
            formData.append('category', category);

            const { data } = await updateProduct({ productId: params._id, formData });

            { data.error ? (toast.error(data.error)) : (toast.success(`${data.name} is updated`) && navigate('/')); }

            // if (data.error) {
            //     toast.error('Product create failed. Try again');
            // } else {

            // }

        } catch (err) {
            console.error(err);
            toast.error('Product update failed. Try again');
        }
    };

    const handleDelete = async () => {
        try {
            let answer = window.confirm('Areyou sure you want to delete this product?');

            if (!answer) return;

            const { data } = await deleteProduct(params._id);
            toast.success(`${data.name} is deleted`);
            navigate('/admin/allproductslist');

        } catch (err) {
            console.error(err);
            toast.error('Product delete failed. Try again');
        }

    };


    return (
        <div className="cantainer xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row ">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <div className="h-12">Update Product</div>

                    {image && (
                        <div className="text-center">
                            <img src={image} alt="product" className="block mx-auto max-h-[200px]" />
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="" className="border  px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : "Upload Image"}
                            <input type="file" name="image" accept="image/*" onChange={uploadImageHandler} id="" className={!image ? 'hidden' : ''} />
                        </label>
                    </div>

                    <div className="p-3">

                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name">Name</label><br />
                                <input type="text" name="" id="" className="p-4 mb-3 border rounded-lg  w-[30rem]" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="two ml-10">
                                <label htmlFor="name block">Price</label><br />
                                <input type="number" name="" id="" className="p-4 mb-3 border rounded-lg  w-[30rem]" value={price} onChange={e => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name block">Quantity</label><br />
                                <input type="number" name="" id="" className="p-4 mb-3 border rounded-lg  w-[30rem]" value={quantity} onChange={e => setQuantity(e.target.value)} />
                            </div>
                            <div className="two ml-10">
                                <label htmlFor="name block">Brand</label><br />
                                <input type="text" name="" id="" className="p-4 mb-3 border rounded-lg  w-[30rem]" value={brand} onChange={e => setBrand(e.target.value)} />
                            </div>
                        </div>

                        <label htmlFor="" className="my-5">Description</label>
                        <textarea type='text' className="p-2 mb-3 border rounded-lg w-[95%]" value={description} onChange={e => setDescription(e.target.value)}></textarea>

                        <div className="flex justify-between">
                            <div className="">
                                <label htmlFor="name block">Count In Stock</label><br />
                                <input type="number" name="" id="" className="p-4 mb-3 border rounded-lg w-[30rem]" value={stock} onChange={e => setStock(e.target.value)} />
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="">Category</label><br />
                            <select placeholder="Choose Category" className="p-4 mb-3 border rounded-lg w-[30rem]" onChange={e => setCategory(e.target.value)}>
                                {categories?.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="">
                        <button onClick={handleUpdate} className="py-4 px-10 mt-5 rounded-lg font-bold bg-green-600 mr-6">Update</button>

                        <button onClick={handleDelete} className="py-4 px-10 mt-5 rounded-lg font-bold bg-pink-600">Delete</button>

                    </div>



                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
