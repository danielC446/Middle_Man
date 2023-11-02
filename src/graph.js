import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 * @param accessToken
 */

export async function callMsGraph(accessToken: string): Promise<any> {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers,
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export async function callMsGraphCalendar(accessToken: string): Promise<any> {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    // Calculate startDateTime (current day) and endDateTime (end of the current work week - Friday)
    const today = new Date();
    const startDateTime = today.toISOString();
    const endDateTime = new Date(today);
    endDateTime.setDate(today.getDate() + (5 - today.getDay())); // 5 represents Friday

    const options = {
        method: "GET",
        headers: headers,
    };

    // Construct the URL with query parameters
    const baseUrl = graphConfig.graphCalendarEndpoint_WeekEvents;
    const url = new URL(baseUrl);
    url.searchParams.append("startDateTime", startDateTime);
    url.searchParams.append("endDateTime", endDateTime.toISOString());

    console.log(url.toString());

    return fetch(url.toString(), options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
