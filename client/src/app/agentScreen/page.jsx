"use client"

import React, { useContext, useEffect, useState } from 'react';
import UserContext from '@/context/UserContext';
import Link from 'next/link';

const agentScreen = () => {
    const { user, fbUser, messagesDataBase, handleSetMessagesDataBase } = useContext(UserContext);
    // const user = JSON.parse(localStorage.getItem('user'));

    const [conversations, setConversations] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageData, setMessageData] = useState([]);

    useEffect(() => {
        const API_VERSION = 'v17.0';
        const PAGE_ID = fbUser?.pages?.id;
        const PLATFORM = 'messenger';
        const PAGE_ACCESS_TOKEN = fbUser?.pages?.access_token;

        const apiUrl = `https://graph.facebook.com/${API_VERSION}/${PAGE_ID}/conversations?platform=${PLATFORM}&access_token=${PAGE_ACCESS_TOKEN}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setConversations(data.data);
            })
            .catch((error) => {
                console.error('Error fetching conversations:', error);
            });
    }, [user]);

    useEffect(() => {
        console.log("Conversations: ", conversations);

        const API_VERSION = 'v17.0';
        const FIELDS = 'messages';
        const PAGE_ACCESS_TOKEN = fbUser?.pages?.access_token;

        conversations && conversations.map((conversation) => {
            const CONVERSATION_ID = conversation?.id;
            const apiUrl = `https://graph.facebook.com/${API_VERSION}/${CONVERSATION_ID}?fields=${FIELDS}&access_token=${PAGE_ACCESS_TOKEN}`;

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    setMessages(msg => ([...msg, data?.messages?.data]));
                })
                .catch((error) => {
                    console.error('Error fetching conversations:', error);
                });
        });
    }, [conversations]);

    useEffect(() => {
        console.log("Messages: ", messages);

        const API_VERSION = 'v17.0';
        const PAGE_ACCESS_TOKEN = fbUser?.pages?.access_token;

        messages && messages?.map((message) => {
            message && message.map((msgData) => {
                const MESSAGE_ID = msgData?.id;
                const apiUrl = `https://graph.facebook.com/${API_VERSION}/${MESSAGE_ID}?fields=id,created_time,from,to,message&access_token=${PAGE_ACCESS_TOKEN}`;

                fetch(apiUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        setMessageData((prevMsgData) => {
                            const isDataPresent = prevMsgData.some((message) => message.id === data.id);
                            if (!isDataPresent) {
                                return [...prevMsgData, data];
                            }
                            return prevMsgData;
                        });
                    })
                    .catch((error) => {
                        console.error('Error fetching conversations:', error);
                    });
            });
        });
    }, [messages]);

    useEffect(() => {
        console.log("MessageData: ", messageData);
    }, [messageData]);




    const [messageDatabase, setMessageDatabase] = useState([]);

    useEffect(() => {
        const myId = fbUser?.pages?.id;
        const myName = fbUser?.pages?.name;

        const tempMessageDatabase = {};

        messageData.forEach((msgData) => {
            const fromId = msgData?.from?.id;
            const fromName = msgData?.from?.name;
            const timestamp = msgData?.created_time;

            const toId = msgData?.to?.data[0]?.id;
            const toName = msgData?.to?.data[0]?.name;

            const customerId = toId != myId ? toId : fromId;
            const customerName = toName != myName ? toName : fromName;

            if (!tempMessageDatabase[customerId]) {
                tempMessageDatabase[customerId] = {
                    customer: {
                        id: customerId,
                        name: customerName,
                    },
                    messages: [],
                };
            }

            tempMessageDatabase[customerId].messages.push({
                from: {
                    id: fromId,
                    name: fromName,
                },
                to: {
                    id: toId,
                    name: toName,
                },
                text: msgData?.message,
                timestamp: timestamp,
            });
        });
        // console.log("tempMessageDatabase: ", tempMessageDatabase);

        const conversationArray = Object.values(tempMessageDatabase);

        setMessageDatabase(conversationArray);
        handleSetMessagesDataBase(conversationArray);
    }, [messageData]);


    useEffect(() => {
        console.log("MessageDatabase: ", messageDatabase);
        // console.log("MessageDatabase: ", JSON.stringify(messageDatabase));
    }, [messageDatabase]);


    return (
        <>
            <Link href="/messages"><div className="mb-10 underline">agentScreen</div></Link>

            {messageDatabase && messageDatabase.map((conversation) => (
                <div className="mb-8" key={conversation.customerId}>
                    <div className="underline">{conversation.customerName}</div>
                    {conversation.messages
                        .slice()
                        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                        .map((message, id) => (
                            <div key={id}>
                                <div>{message.text} -- {message.from.name} -- ({message.timestamp})</div>
                            </div>
                        ))
                    }
                </div>
            ))}
        </>
    )
}

export default agentScreen;