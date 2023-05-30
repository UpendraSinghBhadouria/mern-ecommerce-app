import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../../styles/AuthStyles.css';

const Register = () => {

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        answer:""
    });

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register', {
                name:input.name,
                email:input.email,
                password:input.password,
                phone:input.phone,
                address:input.address,
                answer:input.answer

            })
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/login");
            }
            else{
                toast.error(res.data.message)
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    return (
        <Layout title={"Register - Ecommerce App"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                <h4 className='title'>REGISTER FORM</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputName"
                            placeholder='Enter Your Name'
                            value={input.name}
                            name='name'
                            onChange={handleOnChange}
                            required
                        />
                    </div>
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
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputNumber"
                            placeholder='Enter Your Phone'
                            value={input.phone}
                            name='phone'
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder='Enter Your Address'
                            input={input.address}
                            name='address'
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder='What is your Favourite sports'
                            input={input.answer}
                            name='answer'
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register
