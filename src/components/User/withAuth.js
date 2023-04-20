import React from 'react';
import { Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

function isAuthenticated() {
    const token = localStorage.getItem('token');
    // Check if the token exists and is not expired
    return !!token && !isTokenExpired(token);
}

function isTokenExpired(token) {
    const decodedToken = decode(token);
    const expirationDate = decodedToken.exp * 1000;
    return Date.now() > expirationDate;
}

function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        if (isAuthenticated()) {
            return <Component {...props} />;
        } else {
            return "invalid";
        }
    };
}

export default withAuth;