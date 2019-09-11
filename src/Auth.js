import React from 'react'
import './css/login.css'
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import ReactDOM from 'react-dom';
import App from './App'

const g_client_id = "135757038657-5do7ushmesmhscvj4mq3j11hehs26rgc.apps.googleusercontent.com";

function GoogleLoginButton(props) {
    return (
        <GoogleLogin
            render={renderProps => (
                <button className="login-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login using Google</button>
            )}
            clientId={g_client_id}
            buttonText="Login"
            onSuccess={(response) => { console.log("login successfull"); props.LoginHandler(response) }}
            onFailure={() => { console.log("failed to login"); }}
            cookiePolicy={'single_host_origin'}
        />
    )
}

class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        
        this.LoginHandler = this.LoginHandler.bind(this);
    }

    static async getAuthStatus() {
        // only called from App Constructor
        if(localStorage.access_token !== undefined) {
            // TODO: add check to validate access token with google
            let response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + LoginScreen.getAccessToken())
            if(response.ok) {
                localStorage.setItem("auth_status", "true");
                return true;
            }
        }
        localStorage.setItem("auth_status","false")
        localStorage.removeItem("access_token");
        return(false)
    }

    static getAccessToken() {
        // function to get access token from local storage
        if(localStorage.access_token !== undefined) {
            return localStorage.access_token
        }
        return null
    }

    LoginHandler(response) {
        // update localstorage
        var access_token = response.getAuthResponse(true).access_token;
        console.log("access token: ");
        console.log(access_token);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("auth_status", "true");

        // update parent state
        this.props.onLogin()
    }

    static Handle_403() {
        // 403, invalid access token error handler
        // api call to check with google if token is still valid, to make sure not server error
        localStorage.removeItem("access_token");
        localStorage.setItem("auth_status", "false");
        ReactDOM.render(<App />, document.getElementById('root'));
    }

    render() {
        return(
            <div className="login-screen">
                <div className="app-info">
                    <h1 className="app-name"> bcktlist </h1>
                    <div className="motto-wrapper">
                        <div className="motto-chckbox">
                            <input type="checkbox" checked readOnly/> 
                        </div>
                        <p className="motto"> organize your life </p>
                    </div>
                </div>
                <div className="login-info">
                    <GoogleLoginButton LoginHandler={this.LoginHandler}/>
                </div>
            </div>
        )
    }

}

export default LoginScreen;