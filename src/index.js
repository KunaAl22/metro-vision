// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

ReactDOM.render(
    <GoogleOAuthProvider 
    clientId="421405889258-07mm4083q04a57ej4ri8a8b6u2m54rpk.apps.googleusercontent.com"
    buttonText="Login with Google"
    // onSuccess={onSuccess}
    // onFailure={onFailure}
    redirectUri="www.google.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);
