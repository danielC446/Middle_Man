import React from 'react';
import { useMsal } from '@azure/msal-react';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType: any) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/",
            });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    };
    return (
        <DropdownButton
            variant="secondary"
            className="ml-auto"
            drop="start"
            title="Sign-Out"
        >
            <Dropdown.Item onClick={() => handleLogout("popup")}>Sign out using Popup</Dropdown.Item>
            <Dropdown.Item onClick={() => handleLogout("redirect")}>Sign out using Redirect</Dropdown.Item>
        </DropdownButton>
    );
};