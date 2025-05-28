import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { EditRounded, Save, Logout, PersonRemove } from '@mui/icons-material';
import { updateProfile, logoutUser, deleteMyProfile } from '../Actions/User';

const Account = () => {
    const { loading, user } = useSelector(state => state.user);

    const [name, setName] = useState(user.name);
    const [editing, setEditing] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(name));
        setEditing(false);
    }

    const handleLogout = async () => {
        await dispatch(logoutUser());
    }

    const handleDeleteProfile = async () => {
        await dispatch(deleteMyProfile());
    }

    return (
        <div
            className="w-[50%] max-w-[500px] max-md:w-[80%] max-md:text-sm border-[0.5px] shadow hover:shadow-lg mx-auto my-8 px-4 py-8
            rounded-[20px] relative"
        >
            {
                loading ?
                    (
                        <div className="text-center">
                            <Typography variant="h4">
                                Loading...
                            </Typography>
                        </div>

                    ) : (
                        <>
                            <h1 className="text-3xl text-center mb-6">
                                Profile
                            </h1>

                            <button className="absolute right-1 top-1 m-4"
                                onClick={handleLogout}
                            >
                                <Logout fontSize="medium" />
                            </button>

                            <form onSubmit={handleSubmit}
                                className="flex flex-col justify-center items-center gap-6"
                            >
                                <input type="text" placeholder="Name" name='name'
                                    className="w-[90%] rounded-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-yellow-200 transition duration-500 ease-in-out"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={!editing}
                                />

                                <input type="email" placeholder="Email" name='email'
                                    className="w-[90%] rounded-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-yellow-200 transition duration-500 ease-in-out"
                                    disabled={true}
                                    value={user.email}
                                />

                                <div className="w-[90%] rounded-full px-4 py-3 border border-gray-300 focus:outline-none flex justify-between items-center gap-2">
                                    <div className="ml-2">
                                        <span className="font-semibold">Notes: </span>
                                        {user.notes.length}
                                    </div>
                                    <div className="mr-2">
                                        <span className="font-semibold">Categories: </span>
                                        {user.categories.length}
                                    </div>
                                </div>

                                {
                                    editing
                                        ?
                                        (
                                            <div className="w-[90%]  flex gap-4 justify-center">
                                                <button type="submit"
                                                    className="w-[40%] rounded-full px-4 py-2 bg bg-amber-200 font-semibold hover:bg-amber-300 transition duration-500 ease-in-out
                                        flex justify-center items-center gap-2"
                                                >
                                                    <Save fontSize="small" />
                                                    Save
                                                </button>

                                                <button
                                                    className="w-[40%] rounded-full px-4 py-2 bg bg-amber-200 font-semibold hover:bg-amber-300 transition duration-500 ease-in-out"
                                                    onClick={() => {
                                                        setEditing(false);
                                                        setName(user.name);
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (

                                            < button className="w-[50%] rounded-full px-4 py-2 bg-yellow-200 font-semibold hover:bg-yellow-300 transition duration-500 ease-in-out text-xl max-md:text-sm  flex justify-center items-center gap-2"
                                                onClick={() => setEditing(true)}
                                            >
                                                <EditRounded fontSize="small" />
                                                Edit
                                            </button>
                                        )
                                }

                                < button className="w-[50%] max-md:text-sm rounded-full px-4 py-2 bg bg-red-200 font-semibold hover:bg-red-400 transition duration-500 ease-in-out text-xl flex justify-center items-center gap-2"
                                    onClick={handleDeleteProfile}
                                    type="button"
                                >
                                    <PersonRemove fontSize="small" /> Profile
                                </button>
                            </form>
                        </>
                    )
            }
        </div >
    );
}

export default Account