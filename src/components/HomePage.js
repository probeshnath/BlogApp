import React from 'react'
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, setSignedIn, setUserData } from '../features/userSlice';
import '../styling/Home.css'

const HomePage = () => {

    const dispatch = useDispatch();

    const login = (response) => {
        console.log(response)
        dispatch(setSignedIn(true))
        dispatch(setUserData(response.profileObj))
    }

    const isSignedIn = useSelector(selectSignedIn);
    return (
        <div className='home__page' style={{ display: isSignedIn ? "none" : '' }}>
            {!isSignedIn && <div className="login__message">
                <h2>📖</h2>
                <h1>A Readers favourite place !!</h1>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta impediure recusandae quibusdam nulla qui fugit voluptate sapiente architecto!</p>

                <GoogleLogin

                    clientId="52023834688-2e1dhm3nhbpv4b7g2g7sin4a7pgjimfd.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className='login__button'
                        >
                            Login with Google
                        </button>
                    )}

                    onSuccess={login}
                    onFailure={login}
                    isSignedIn={true}
                    cookiePolicy={"single_host_origin"}
                />
            </div>}
        </div>
    )
}

export default HomePage
