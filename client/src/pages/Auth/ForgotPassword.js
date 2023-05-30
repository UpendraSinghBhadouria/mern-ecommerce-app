import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css';

const ForgotPassword = () => {
    const [input, setInput] = useState({
        email: "",
        newPassword: "",
        answer: ""
    });

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', {
                email: input.email,
                newPassword: input.newPassword,
                answer: input.answer

            })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
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
        <Layout title={"Forgot Password - Ecommerce App"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>RESET PASSWORD</h4>
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
                        <input type="text"
                            className="form-control"
                            id="exampleInputText"
                            placeholder='Enter Your Favourite sports'
                            value={input.answer}
                            name='answer'
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
                            value={input.newPassword}
                            name='newPassword'
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">RESET</button>
                </form>
            </div>    </Layout>
    )
}

export default ForgotPassword
