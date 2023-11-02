import React, { useState } from 'react';

import { PageLayout } from './components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph, callMsGraphCalendar } from './graph';
import { ProfileData } from './components/ProfileData';
import {CalendarData} from './components/CalendarData';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Button } from 'react-bootstrap';


import './App.css';

const CalendarContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestCalendarData() {
        //silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        })
            .then((response) => {
                callMsGraphCalendar(response.accessToken).then(response => setGraphData(response));
            });
    }

    function handleCalendarRefresh() {

        setGraphData(null);
        RequestCalendarData();
    }

    return (
        <>
            <br />
            {graphData ? (
                <div>
                    <Button variant="secondary" onClick={handleCalendarRefresh}>Refresh Calendar</Button>
                    <CalendarData graphData={graphData} />
                </div>
            ) : (
                <Button variant="secondary" onClick={RequestCalendarData}>Request Calendar Information</Button>
            )}
        </>
    )
}

/**
 * Renders information about the signed-in user or a sign-in button if no user is signed in.
 * @returns
 */
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        //silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        })
            .then((response) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
            });
    }
    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            <br />
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
            )}
        </>
    );
};

const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
                <br />
                <CalendarContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5>
                    <center>
                        Please sign-in to see your profile information.
                    </center>
                </h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
  return (
      <PageLayout>
          <center>
          <MainContent />
          </center>
      </PageLayout>
  );
}


