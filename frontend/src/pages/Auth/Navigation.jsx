import { useState } from 'react';
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import { logout } from '../../redux/features/auth/authSlice';

import './Navigation.css';


const Navigation = () => {
    const { userInfo } = useSelector(state => state.auth);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);

    const toggleDropDown = () => {
        setDropDownOpen(!dropDownOpen);
    };
    const toggleSideBar = () => {
        setShowSideBar(!showSideBar);
    };
    const closeSideBar = () => {
        setShowSideBar(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLoginMutation();
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ zIndex: 999 }} className={`${showSideBar ? 'hidden' : 'flex'} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hove:w-[15%] h-[100vh] fixed`} id='navigation-container'>
            <div className="flex flex-col justify-center space-y-4">
                <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineHome size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
                </Link>
                <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShopping size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
                </Link>
                <Link to='/cart' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShoppingCart size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
                </Link>
                <Link to='/wishlist' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <FaHeart size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">WISHLIST</span>{" "}
                </Link>
            </div>

            <div className="relative">
                <button onClick={toggleDropDown} className='flex items-center text-gray-8000 focus:outline-none'>
                    {userInfo ? <span className='text-white'>{userInfo.username}</span> : <></>}
                </button>
            </div>

            <ul>
                <li>
                    <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2'>
                        <AiOutlineLogin size={26} className='mr-2 mt-[3rem]' />
                        <span className="hidden nav-item-name mt-[3rem]">Login</span>{" "}
                    </Link>
                </li>
                <li>
                    <Link to='/register' className='flex items-center transition-transform transform hover:translate-x-2'>
                        <AiOutlineUserAdd size={26} className='mr-2 mt-[3rem]' />
                        <span className="hidden nav-item-name mt-[3rem]">Register</span>{" "}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;

