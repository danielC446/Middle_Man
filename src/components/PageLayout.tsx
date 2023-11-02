import React from 'react';
import { Navbar } from 'react-bootstrap';

import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import {SignOutButton } from './SignOutButton';

export const PageLayout = (props: any) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <Navbar bg="primary" variant="dark" className="navbarStyle">
                <a className="navbar-brand" href="/">Middle Man</a>
                <div className="collapse navbar-collapse justify-Content-end">
                    {isAuthenticated ? <SignOutButton /> : <SignInButton />}
                </div>
            </Navbar>
            <br />
            <br />
            <h5>
                <center>
                    Welcome to the base of Middle Man, this is a POC for Authentication with Azure AD and MSAL. including Graph endpoint testing 
                </center>
            </h5>
            <br />
            <br />
            {props.children}
        </>
    );
};
