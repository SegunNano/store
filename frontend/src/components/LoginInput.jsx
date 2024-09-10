import Loader from "./Loader";
import { Link, useLocation } from "react-router-dom";
import './HalfStarRating.css';

const LoginInput = ({ username, confirmPassword, setUsername, setConfirmPassword, handleSubmit, isLoading, email, setEmail, setPassw0rd, password }) => {

    const search = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
    return (
        <section className="mt-[2rem] flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-[50rem] loginForm">
            <div className="md:flex md:items-center md:justify-center md:w-1/2 ">
                <div className="">
                </div>
            </div>

            <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
                <div className="w-[90%]">
                    <form onSubmit={handleSubmit} >
                        {setUsername && (
                            <div className="relative flex items-center">
                                <input type="text" placeholder="Enter Username"
                                    className="mt-5 px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-pink-500 outline-none " value={username} onChange={e => setUsername(e.target.value)} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4"
                                    viewBox="0 0 24 24">
                                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                    <path
                                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                        data-original="#000000"></path>
                                </svg>
                            </div>
                        )}
                        <div className="relative flex items-center">
                            <input type="email" placeholder="Enter Email"
                                className="mt-5 px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-pink-500 outline-none " value={email} onChange={e => setEmail(e.target.value)} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4"
                                viewBox="0 0 682.667 682.667">
                                <defs>
                                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                    </clipPath>
                                </defs>
                                <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                    <path fill="none" strokeMiterlimit="10" strokeWidth="40"
                                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                        data-original="#000000"></path>
                                    <path
                                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                        data-original="#000000"></path>
                                </g>
                            </svg>
                        </div>
                        <div className="relative flex items-center">
                            <input type="password" placeholder="Enter Password"
                                className="mt-5 px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-pink-500 outline-none " value={password} onChange={e => setPassw0rd(e.target.value)} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                                className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                <path
                                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                    data-original="#000000"></path>
                            </svg>
                        </div>
                        {setUsername && (
                            <div className="relative flex items-center">
                                <input type="password" placeholder="Confirm Password"
                                    className="mt-5 px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-pink-500 outline-none " value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                    <path
                                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                        data-original="#000000"></path>
                                </svg>
                            </div>
                        )}
                        <button type="submit"
                            className="w-full mt-8 px-8 py-4 bg-pink-500 text-sm text-white hover:bg-pink-600 rounded">{isLoading ? 'Signing In...' : 'Sign In'}</button>
                        {isLoading && <Loader />}
                    </form>
                    {setUsername ? (
                        <div className="mt-4">
                            <p className=''>
                                Already have an account?
                                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-pink-500 hover:underline'>Login</Link>
                            </p>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <p className="">
                                New Customer? {' '}
                                <Link to={redirect ? `/register?redirect=${redirect}` : `/register`} className="text-pink-500 hover:underline">Register</Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LoginInput;
