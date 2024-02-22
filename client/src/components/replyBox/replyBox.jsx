import React, { useContext, useState } from 'react'
import UserContext from '@/context/UserContext';
import { Button } from '@material-ui/core';

const ReplyBox = ({ customerName, customerId }) => {
    const { user, fbUser } = useContext(UserContext);
    const [input, setInput] = useState("");

    // const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);

    // Define the data for the message
    const messageData = {
        recipient: {
            id: customerId
        },
        messaging_type: 'RESPONSE',
        message: {
            text: input
        }
    };

    // Define your API endpoint URL
    const API_VERSION = 'v17.0';
    const PAGE_ID = fbUser.pages.id;
    const PAGE_ACCESS_TOKEN = fbUser.pages.access_token;

    const apiUrl = `https://graph.facebook.com/${API_VERSION}/${PAGE_ID}/messages?access_token=${PAGE_ACCESS_TOKEN}`;

    // Define the headers for the request
    const headers = {
        'Content-Type': 'application/json'
    };

    // Send the POST request using fetch
    const handleSendMessage = (e) => {
        e.preventDefault();

        fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(messageData)
        })
            .then((response) => response.json())
            .then((data) => {
                alert('Message sent:', data);
                setInput("");
            })
            .catch((error) => {
                alert('Error sending message:', error);
            });


    }

    return (
        <>
            <form onSubmit={handleSendMessage} className="flex gap-2">
                <input value={input} type="text" onChange={(e) => { setInput(e.target.value) }} placeholder={`Message ${customerName}`} required />
                <Button color="primary" variant="contained" type="submit">Send</Button>
            </form>
        </>
    )
}

export default ReplyBox;