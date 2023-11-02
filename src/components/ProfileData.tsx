import React from 'react';

// need to work out what data type Props is going to be 

export const ProfileData = (props: any) => {
    return (
        <div id="profile-div">
            <p>
                <strong>First Name: </strong> {props.graphData.givenName}
            </p>
            <p>
                <strong>Last Name: </strong> {props.graphData.surname}
            </p>
            <p>
                <strong>Email: </strong> {props.graphData.userPrincipalName}
            </p>
            <p>
                <strong >ID: </strong> {props.graphData.id}
            </p>
        </div>
    );
};