import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import { setCategories, setChecked, setCheckedBrands, setProducts, setRadio } from "../redux/features/shop/shopSlice";

import Loader from "../components/Loader";



const Shop = () => {
    const dispatch = useDispatch();
    const { categories, products, checked, radio } = useSelector(state => state.shop);
    const categoriesQuery = useFetchCategoriesQuery();
    const filteredProductQuery = useGetFilteredProductsQuery({ checked, radio });

    const [priceFilter, setPriceFilter] = useState('');

    useEffect(() => {
        if (!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery, data));
        }
    }, [categoriesQuery.data, dispatch]);

    useEffect(() => {
        if (!(checked.length && radio.length && filteredProductQuery.isLoading)) {

            const filteredProducts = filteredProductQuery.data.filter(product => {
                return (
                    product.price.toString().includes(priceFilter) || product.price === parseInt(priceFilter, 10)
                );
            });
            dispatch(setProducts(filteredProducts));
        }
    });

    return (


        <div>

        </div>
    );
};

export default Shop;
