import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import ActiveRoute from '../ActiveRoute/ActiveRoute';
import { MenuIcon } from '@heroicons/react/solid'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';


const Header = () => {
    const navigate = useNavigate()

    const [user, loading, error] = useAuthState(auth);

    const navigateToAdminHome = () => {
        navigate('/')
    }
    const navigateTologin = () => {
        navigate('/login')
    }
    const handleLogout = () => {
        signOut(auth)
    }

    return (
        <div className='header-container'>
            <nav>
                <input type="checkbox" id='check' />
                <label htmlFor="check" className='check-button'>
                    <MenuIcon className='menu-icon'></MenuIcon>
                </label>
                <label onClick={navigateToAdminHome} className='logo'>Cycle World</label>
                <ul>
                    <li> <ActiveRoute to={'/home'}>Home</ActiveRoute> </li>

                    <li><ActiveRoute to={'/blog'}>Blog</ActiveRoute></li>

                    <>
                        {
                            user ?
                                <>
                                    <li><ActiveRoute to={'/myItems'}>My Items</ActiveRoute></li>
                                    <li><ActiveRoute to={'/addItem'}>Add Items</ActiveRoute></li>
                                    <li><ActiveRoute to={'/manageItems'}>Manage</ActiveRoute></li>

                                    <button onClick={handleLogout} className='header-login-button'>Log Out</button>
                                </>
                                :
                                <button onClick={navigateTologin} className='header-login-button'>Login</button>
                        }
                    </>
                </ul>
            </nav>
        </div>
    );
};

export default Header;