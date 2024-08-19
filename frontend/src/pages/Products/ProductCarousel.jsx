import { useFetchTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from 'moment';
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";


const ProductCarousel = () => {
    const { data: products, isLoading, error } = useFetchTopProductsQuery();

    const settings = {
        dots: false,
        infinte: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    // console.log(products);

    return (
        <div className="mb-4 xl:block lg:block md:block">
            {isLoading ? null : error ? (<Message>{error?.data?.message || error.message}</Message>) : (
                <Slider {...settings} className="xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block">
                    {
                        products.map(({ image, _id, name, price, description, brand, CreatedAt, numReviews, rating, quantity, countInStock }) => (
                            <div key={_id}>
                                <img src={image} alt={name} className="w-full rounded-lg object-cover h-[30rem]" />

                                <div className="flex justify-between w-[20rem]">
                                    <div className="one">
                                        <h2>{name}</h2>
                                        <p>$ {price}</p> <br /><br />
                                        <p className="w-[20rem]">{description.substring(0, 170)}...</p>
                                    </div>
                                    <div className="flex justify-between w-[20rem]">
                                        <div className="one">
                                            <h1 className="flex items-center mb-6 w-[15rem]">
                                                <FaStore className="mr-2" /> Brand: {brand}
                                            </h1>
                                            <h1 className="flex items-center mb-6 w-[15rem]">
                                                <FaClock className="mr-2" /> Added: {moment(CreatedAt).fromNow()}
                                            </h1>
                                            <h1 className="flex items-center mb-6 w-[15rem]">
                                                <FaStar className="mr-2" /> Reviews: {numReviews}
                                            </h1>
                                        </div>
                                        <div className="two">
                                            <h1 className="flex items-center mb-6 w-[5rem]">
                                                <FaStar className="mr-2" /> Ratings: {Math.round(numReviews)}
                                            </h1>
                                            <h1 className="flex items-center mb-6 w-[5rem]">
                                                <FaShoppingCart className="mr-2" /> Quantity: {quantity}
                                            </h1>
                                            <h1 className="flex items-center mb-6 w-[5rem]">
                                                <FaBox className="mr-2" /> In Stock: {countInStock}
                                            </h1>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        ))
                    }
                </Slider>
            )
            }
        </div>
    );
};

export default ProductCarousel;
