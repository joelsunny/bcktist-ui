import React from 'react'
import './css/login.css'
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

const g_client_id = "135757038657-5do7ushmesmhscvj4mq3j11hehs26rgc.apps.googleusercontent.com";

function GoogleLoginButton(props) {
    return (
        <GoogleLogin
            render={renderProps => (
                <button className="login-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login using Google</button>
            )}
            clientId={g_client_id}
            buttonText="Login"
            onSuccess={() => { console.log("failed to login") }}
            onFailure={() => { console.log("failed to login") }}
            cookiePolicy={'single_host_origin'}
        />
    )
}

class LoginScreen extends React.Component {

    render() {
        return(
            <div className="login-screen">
                <div className="app-info">
                    <h1 className="app-name"> bcktlist </h1>
                    <div className="motto-wrapper">
                        <div className="motto-chckbox">
                            <input type="checkbox" checked /> 
                        </div>
                        <p className="motto"> organize your life </p>
                    </div>
                </div>
                <div className="login-info">
                    <GoogleLoginButton />
                </div>
            </div>
        )
    }

}

export default LoginScreen;