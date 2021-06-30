import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, selectUserData, setInput, setSignedIn, setUserData } from '../features/userSlice';
import { Avatar } from '@material-ui/core'
import { GoogleLogout } from 'react-google-login';
import '../styling/Navbar.css'

const Navbar = () => {
    const [inputValue, setInputValue] = useState("tech");
    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData);

    const dispatch = useDispatch();

    const logout = (response) => {
        dispatch(setSignedIn(false));
        dispatch(setUserData(null));

    }


    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setInput(inputValue))
    }
    return (
        <div className='navbar'>
            <h1 className="navbar__header">
                PROBESH DN
            </h1>
            {isSignedIn && (<div className='blog__search'>
                <input type="text" className='search' placeholder='Search for a blog' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button className='submit' onClick={handleClick}>Search</button>
            </div>)}

            {isSignedIn ? <div className='navbar__user__data'>
                <Avatar src={userData?.imageUrl} alt={userData?.name} />
                <h1 className='signedIn'>{userData?.givenName}</h1>
                <GoogleLogout
                    clientId="52023834688-2e1dhm3nhbpv4b7g2g7sin4a7pgjimfd.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className='logout__button'
                        >
                            Logout
                        </button>
                    )}

                    buttonText='Logout'
                    onLogoutSuccess={logout}

                />
            </div> : <h1 className='notSignedIn'>User is not available 😆</h1>}
        </div>
    )
}

export default Navbar
