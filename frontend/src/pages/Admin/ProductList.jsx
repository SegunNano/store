import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateProductMutation, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";



const ProductList = () => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);

    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();


    const uploadImageHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);


        try {

            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image);


        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const productData = new FormData();

            productData.append('image', image);
            productData.append('name', name);
            productData.append('description', description);
            productData.append('quantity', quantity);
            productData.append('brand', brand);
            productData.append('countInStock', stock);
            productData.append('price', price);
            productData.append('category', category);

            const { data } = await createProduct(productData);
            { data.error ? (toast.error(data.error)) : (toast.success(`${data.name} is created`) && navigate('/')); }

            if (data.error) {
                toast.error('Product create failed. Try again');
            } else {

            }

        } catch (err) {
            console.error(err);
            toast.error('Product create failed. Try again');
        }
    };


    return (
        <>
            <div className="pl-[33rem] mr-[4rem] mt-[3rem]">
                <h1 className="text-2xl font-semibold">Create Product</h1>
            </div>
            <div className="mt-5 max-w-4xl mx-auto">
                <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full rounded-lg overflow-hidden mx-auto mt-4 pb-1">
                    {!image && (
                        <label for="uploadFile1" className="bg-[#f0f1f2] text-gray-500 font-semibold text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                                <path
                                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                    data-original="#000000" />
                                <path
                                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                    data-original="#000000" />
                            </svg>
                            Upload file

                            <input type="file" id='uploadFile1' name="image" accept="image/*" onChange={uploadImageHandler} className="hidden" />
                            <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG and WEBP Allowed.</p>
                        </label>
                    )}
                    {imageUrl && (
                        <img src={imageUrl} alt="product" className="w-full aspect-video object-cover mb-5" />
                    )}
                    <div className="grid sm:grid-cols-2 gap-4 px-3">
                        <div className="relative flex items-center">
                            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-pink-300 rounded transition-all" />
                        </div>

                        <div className="relative flex items-center">
                            <input type="number" placeholder="Price in USD" value={price} onChange={e => setPrice(e.target.value)} className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-pink-300 rounded transition-all" />
                        </div>

                        <div className="relative flex items-center">
                            <input type="text" placeholder="Product Brand" value={brand} onChange={e => setBrand(e.target.value)} className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-pink-300 rounded transition-all" />
                        </div>

                        <div className="relative flex items-center">
                            <select id="countries_disabled" className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-pink-300 rounded transition-all" onChange={e => setCategory(e.target.value)}>
                                <option >Choose a Category</option>
                                {categories?.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>

                        </div>
                        <textarea placeholder='Describe the product'
                            className="p-4 bg-[#f0f1f2]  mx-auto w-full block text-sm border border-gray-300 outline-pink-300 rounded" rows="4" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        <div>
                            <div className="relative flex items-center">
                                <input type="number" placeholder="Count in stock"
                                    className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-pink-300 rounded transition-all" value={stock} onChange={e => setStock(e.target.value)} />
                            </div>

                            <div className="relative flex items-center mt-4">
                                <input type="number" placeholder="Quantity"
                                    className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent text-black w-full text-sm border outline-pink-300 rounded transition-all" value={quantity} onChange={e => setQuantity(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={handleSubmit} className="mt-8 px-6 py-4 text-sm w-[99%] bg-pink-600 hover:bg-pink-700 text-white rounded transition-all mx-[.5%]">Submit</button>
                </div>
            </div>
        </>
    );
};

export default ProductList;
