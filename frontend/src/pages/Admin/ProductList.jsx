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
        <div className="cantainer xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row ">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <div className="h-12">Create Product</div>

                    {imageUrl && (
                        <div className="text-center">
                            <img src={imageUrl} alt="product" className="block mx-auto max-h-[200px]" />
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="" className="border  px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : "Upload Image"}
                            <input type="file" name="image" accept="image/*" onChange={uploadImageHandler} id="" className={image && 'hidden'} />
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
                    <button onClick={handleSubmit} className="py-4 px-10 mt-5 rounded-lg font-bold bg-pink-600">Submit</button>



                </div>
            </div>
        </div>
    );
};

export default ProductList;
