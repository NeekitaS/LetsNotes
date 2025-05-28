import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Actions/User';

const Register = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(registerUser(formData));
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="w-[50%] max-w-[500px] max-md:w-[80%] border-[0.5px] shadow hover:shadow-lg mx-auto my-8 px-4 py-8 rounded-[20px]"
        >
            <h1 className="text-3xl text-center mb-6">
                Register
            </h1>

            <form onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-6"
            >
                <input type="text" placeholder="Name" name='name'
                    className="w-[90%] rounded-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-yellow-200 transition duration-500 ease-in-out"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input type="email" placeholder="Email" name='email'
                    className="w-[90%] rounded-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-skyblue-200 transition duration-500 ease-in-out"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input type="password" placeholder="Password" name='password'
                    className="w-[90%] rounded-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-yellow-200 transition duration-500 ease-in-out"
                    value={formData.password}
                    onChange={handleChange} r
                    required
                />

                <button type="submit"
                    className="w-[50%]  rounded-full px-4 py-2 bg-blue-200 font-semibold hover:bg-yellow-300 transition duration-500 ease-in-out text-xl max-md:text-sm "
                >
                    Register
                </button>

                <Typography variant="body2" color="textSecondary" align="center">
                    Already have an account?  
                    <Link to='/login' className='ml-1'>
                        Sign In
                    </Link>
                </Typography>
            </form>
        </div>
    )
}

export default Register