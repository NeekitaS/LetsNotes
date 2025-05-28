import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo_black.png'
import mobileLogo from '../assets/favicon_dark.png'

import { AccountCircleOutlined, AccountCircle } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

const Header = () => {
    const [selectedTab, setSelectedTab] = useState(window.location.pathname);

    const setTab = (path) => {
        setSelectedTab(path);
    }

    const { error, message, user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' })
        }

        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' })
        }
    }, [dispatch, user, error, message])

    return (
        <header className='py-2 bg-cyan-200 border-b-[0.5px] shadow-sm hover:shadow-md hover:transition-all'>
            <nav className="flex justify-center items-center">
                <Link to="/" onClick={() => setTab("/")}>
                    <img src={logo} alt="logo" className="w-[150px] max-md:w-[120px] pl-2 drop-shadow-md max-sm:hidden" />
                    <img src={mobileLogo} alt="logo" className="w-[60px] pl-2 drop-shadow-md sm:hidden" />
                </Link>
                <ul className="flex flex-1 mr-4 max-md:mr-2 max-sm:mr-0 justify-start md:justify-end align-baseline max-md:gap-0 gap-4 drop-shadow-md  text-lg font-medium">
                    <li className={`mx-2 hover:font-bold hover:drop-shadow-md ${selectedTab === '/' ? 'font-bolder drop-shadow-md' : ''} `}>
                        <Link to="/" onClick={() => setTab("/")}>
                            Home
                        </Link>
                    </li>
                    <li className={`mx-2 hover:font-bold hover:drop-shadow-md ${selectedTab === '/categories' && "font-bold drop-shadow-md"}`}>
                        <Link to="/categories" onClick={() => setTab("/categories")}>
                            Categories
                        </Link>
                    </li>
                </ul>
                <Link to='/account' onClick={() => setTab("/account")}>
                    <div className="px-2 md:px-4 py-1 cursor-pointer hover:font-bold hover:drop-shadow-md">
                        {
                            selectedTab === '/account' ? <AccountCircle fontSize='large' /> : <AccountCircleOutlined fontSize='large' />
                        }
                    </div>
                </Link>
            </nav>
        </header>
    )
}

export default Header