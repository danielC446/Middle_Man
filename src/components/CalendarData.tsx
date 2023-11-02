import React from 'react';
import './CalendarData.css'

interface Event {
    subject: string;
    start: { dateTime: string };
    end: { dateTime: string };
    location: { displayName: string };
    bodyPreview: string;
}

interface CalendarDataProps {
    graphData: {
        value: Event[];
    };
}

const EventItem: React.FC<{ event: Event }> = ({ event }) => (
    <table className="event-item">
        <tbody>
            <tr>
                <td><strong>Subject:</strong></td>
                <td>{event.subject}</td>
            </tr>
            <tr>
                <td><strong>Start:</strong></td>
                <td>{new Date(event.start.dateTime).toLocaleString()}</td>
            </tr>
            <tr>
                <td><strong>End:</strong></td>
                <td>{new Date(event.end.dateTime).toLocaleString()}</td>
            </tr>
            <tr>
                <td><strong>Location:</strong></td>
                <td>{event.location.displayName}</td>
            </tr>
            <tr>
                <td><strong>Body:</strong></td>
                <td>{event.bodyPreview}</td>
            </tr>
        </tbody>
    </table>
    
);

export function CalendarData(props: CalendarDataProps): JSX.Element {
    return (
        <div id="calendar-div">
            {props.graphData.value && props.graphData.value.length > 0 ? (
                <div className="event-list">
                    {props.graphData.value.map((event, index) => (
                        <EventItem key={index} event={event} />
                    ))}
                </div>
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
}
