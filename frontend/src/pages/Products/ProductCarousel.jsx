import { useFetchTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from 'moment';
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";


const ProductCarousel = () => {
    const { data, isLoading, error } = useFetchTopProductsQuery();

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

    return (
        <div className="mb-4 xl:block lg:block md:block">
            {isLoading ? null : error ? (<Message>{error?.data?.message || error.message}</Message>) : (
                <Slider {...settings} className="xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block">

                </Slider>
            )
            }
        </div>
    );
};

export default ProductCarousel;
