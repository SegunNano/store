import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useFetchTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import './star.css';


const ProductTabs = ({ loadingProductReview, userInfo, submitHandler, product, rating, comment, setComment, setRating }) => {
    const { data, isLoading } = useFetchTopProductsQuery();
    const [activeTab, setActiveTab] = useState(1);


    if (isLoading) return <Loader />;

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };


    return (
        <div className="flex flex-col md:flex-row">
            <section className="mr-[5rem]">
                <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 1 ? "font-bold" : ''}`} onClick={() => handleTabClick(1)}>Write Your Review</div>
                <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 2 ? "font-bold" : ''}`} onClick={() => handleTabClick(2)}>All Reviews</div>
                <div className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 3 ? "font-bold" : ''}`} onClick={() => handleTabClick(3)}>Related Product</div>
            </section>
            <section>
                {activeTab === 1 && (
                    <div className="mt-4">
                        {userInfo ? (
                            <form onSubmit={submitHandler} >
                                <div className="my-2">
                                    <fieldset className="starability-coinFlip">
                                        <legend className="block text-xl mb-2">Rating:</legend>
                                        <input defaultChecked onClick={e => setRating(e.target.value)} type="radio" id="no-rate" className="input-no-rate" name="rating" value="0" aria-label="No rating." />
                                        <input type="radio" id="second-rate1" onClick={e => setRating(e.target.value)} name="rating" value="1" />
                                        <label htmlFor="second-rate1" title="Terrible">1 star</label>
                                        <input onClick={e => setRating(e.target.value)} type="radio" id="second-rate2" name="rating" value="2" />
                                        <label htmlFor="second-rate2" title="Not good">2 stars</label>
                                        <input onClick={e => setRating(e.target.value)} type="radio" id="second-rate3" name="rating" value="3" />
                                        <label htmlFor="second-rate3" title="Average">3 stars</label>
                                        <input onClick={e => setRating(e.target.value)} type="radio" id="second-rate4" name="rating" value="4" />
                                        <label htmlFor="second-rate4" title="Very good">4 stars</label>
                                        <input onClick={e => setRating(e.target.value)} type="radio" id="second-rate5" name="rating" value="5" />
                                        <label htmlFor="second-rate5" title="Amazing">5 stars</label>
                                    </fieldset>
                                </div>

                                <div className="my-2">
                                    <label htmlFor="rating" className="block text-xl mb-2">Comment</label>
                                    <textarea id="comment" row="3" required value={comment} onChange={e => setComment(e.target.value)} className="p-2 border rounded-lg xl:w-[40rem]text-black"></textarea>
                                </div>
                                <button className="rounded-lg text-white py-2 px-4 bg-pink-600" type="submit">Submit</button>
                            </form>
                        ) : (
                            <p>Please <Link to='/login'>sign in</Link> to write review</p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProductTabs;
