"use client"

import { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { AccountCircle, Menu } from "@material-ui/icons";
import RefreshIcon from "@material-ui/icons/Refresh";
import styles from "./styles/messages.module.css";
// import { useState } from "react";
import Item from "@/components/item/item";
import Profile from "@/components/profile/profile";
import ChatBox from "@/components/chatBox/chatBox";

// import { withRouter } from "react-router-dom";
import { useContext } from "react";
import UserContext from '@/context/UserContext';
// import messageDatabase from "@/data/messageData";

import logo from "@/assets/logo.png";
import Image from "next/image";


// const FBData = messageDatabase;

const Home = () => {
    const { user, handleSetUser, fbUser, messagesDataBase, handleSetMessagesDataBase } = useContext(UserContext);
    const FBData = messagesDataBase;
    const [data] = useState(FBData);
    const [selected, setSelected] = useState(FBData[0]);



    // *********************************************************
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

            const toId = msgData?.to?.data && msgData?.to?.data[0]?.id;
            const toName = msgData?.to?.data && msgData?.to?.data[0]?.name;

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
    // *********************************************************


    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <>
            {domLoaded &&
                <div className={styles.container}>
                    <div className={styles.nav}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <div className='my-4 py-2'>
                                        <Image
                                            src={logo}
                                            className='rounded-circle'
                                            height={30}
                                            width={30}
                                            alt='logo'
                                        />
                                    </div>

                                </ListItemIcon>
                            </ListItem>
                            <ListItem className={styles.active}>
                                <ListItemIcon>
                                    <div
                                        className='my-4 py-2'
                                        style={{
                                            background: "white",
                                            backgroundSize: "100%",
                                            color: "#255190",
                                            paddingLeft: "8px",
                                        }}
                                    >
                                        <i className='fa fa-inbox fa-lg'></i>
                                    </div>
                                </ListItemIcon>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <div
                                        className='my-4 py-2'
                                        style={{
                                            backgroundSize: "100%",
                                            color: "white",
                                            paddingLeft: "8px",
                                        }}
                                    >
                                        <i className='fa fa-user fa-lg'></i>
                                    </div>

                                    {/* <PeopleAltIcon className={styles.icon} /> */}
                                </ListItemIcon>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <div
                                        className='my-4 py-2'
                                        style={{
                                            backgroundSize: "100%",
                                            color: "white",
                                            paddingLeft: "8px",
                                        }}
                                    >
                                        <i className='fa fa-line-chart fa-lg'></i>
                                    </div>

                                    {/* <BarChartIcon className={styles.icon} /> */}
                                </ListItemIcon>
                            </ListItem>
                        </List>
                        <List>
                            {/* {session && ( */}
                            <ListItem>
                                <ListItemIcon
                                // onClick={handleSignOut}
                                >
                                    {!user && <AccountCircle className={styles.icon} />}
                                </ListItemIcon>
                            </ListItem>
                            {/* )} */}
                            {/* {!session && ( */}
                            <ListItem>
                                <ListItemIcon
                                // onClick={handleSignIn}
                                >
                                    {user && (
                                        <img
                                            src={user.picture}
                                            // style={{ marginTop: "100" }}
                                            className='rounded-circle'
                                            height='30px'
                                            width='30px'
                                            alt='profile'
                                        />
                                    )}
                                </ListItemIcon>
                            </ListItem>
                            {/* )} */}
                        </List>
                    </div>
                    <div className={styles.list}>
                        <div className={styles.title}>
                            <Menu />
                            Conversations
                            <RefreshIcon />
                        </div>
                        <div>
                            {data && data.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={
                                        selected && item.customer.id === selected.customer.id ? styles.selected : ""
                                    }
                                >
                                    <Item
                                        item={item}
                                        selected={selected && item.customer.id === selected.customer.id}
                                        onSelect={() => setSelected(item)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.chatBox}>
                        <div className={styles.title}>
                            {selected && (
                                <>
                                    {selected?.customer?.name}
                                </>
                            )}
                        </div>
                        <div>{selected && <ChatBox item={selected} />}</div>
                    </div>
                    <div className={styles.infoBox}>
                        {selected && <Profile item={selected} />}
                    </div>
                </div>
            }
        </>
    );
};

export default Home;
