import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

import { toast } from "react-toastify";
import LoginInput from "../../components/LoginInput";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector(state => state.auth);
    const search = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    return (
        <>
            <div className="pl-[40rem] mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold">Sign In</h1>
            </div>
            <LoginInput handleSubmit={handleSubmit} isLoading={isLoading} email={email} setEmail={setEmail} password={password} setPassw0rd={setPassword} />
        </>
    );
};

export default Login;
