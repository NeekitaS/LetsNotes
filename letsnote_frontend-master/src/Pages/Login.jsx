import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Actions/User';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(loginUser(formData));
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div
            className="w-[50%] max-w-[500px] max-md:w-[80%] border-[0.5px] shadow hover:shadow-lg mx-auto my-8 px-4 py-8
            rounded-[20px]"
        >
            <h1 className="text-3xl text-center mb-6">
                Login
            </h1>

            <form onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-6"
            >
                <input type="email" placeholder="Email" name='email'
                    className="w-[90%] rounded-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-200 transition duration-500 ease-in-out"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input type="password" placeholder="Password" name='password'
                    className="w-[90%] rounded-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-200 transition duration-500 ease-in-out"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit"
                    className="w-[50%] rounded-full px-4 py-2 bg-blue-200 font-semibold hover:bg-cyan-300 transition ease-in-out text-xl max-md:text-sm duration-500"
                >
                    Sign In
                </button>

                <Typography variant="body2" color="textSecondary" align="center">
                    Don't have an account?
                    <Link to='/register' className='ml-1'>
                        Sign Up
                    </Link>
                </Typography>
            </form>
        </div>
    )
}

export default Login