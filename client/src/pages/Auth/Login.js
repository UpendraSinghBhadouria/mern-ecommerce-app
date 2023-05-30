import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css';
import { useAuth } from '../../context/Auth';

const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const [auth, setAuth] = useAuth()

    const navigate = useNavigate();
    const location = useLocation();

    const handleOnChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', {
                email: input.email,
                password: input.password,
            })
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
            }
            else {
                toast.error(res.data.message)
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something wet wrong");
        }
    }
    return (
        <Layout title={"Register - Ecommerce App"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>LOGIN FORM</h4>
                    <div className="mb-3">
                        <input type="email"
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder='Enter Your Email'
                            value={input.email}
                            name='email'
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder='Enter Your Password'
                            value={input.password}
                            name='password'
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot Password</button>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login
