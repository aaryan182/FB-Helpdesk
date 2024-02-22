"use client"

import React, { createContext, useState } from "react";
import UserContext from "./UserContext";

const UserState = ({ children }) => {
    const [user, setUser] = useState(typeof window !== "undefined" && (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null));
    const [fbUser, setFbUser] = useState(typeof window !== "undefined" && (localStorage.getItem("fbUser") ? JSON.parse(localStorage.getItem("fbUser")) : "abcd@gmail.com"));
    const [messagesDataBase, setMessagesDataBase] = useState(typeof window !== "undefined" && (localStorage.getItem("messagesDataBase") ? JSON.parse(localStorage.getItem("messagesDataBase")) : null));

    !fbUser && fetch("https://helpdesk-fb.onrender.com/users")
        .then(res => res.json())
        .then(data => {
            data?.map(fbUser => {
                if (fbUser.userEmail === user?.email) {
                    setFbUser(fbUser);
                    return fbUser;
                }
            });
        })
        .catch(err => console.log(err));

    !messagesDataBase && fetch("https://helpdesk-fb.onrender.com/messageData")
        .then(res => res.json())
        .then(data => {
            data?.map(messageData => {
                if (messageData.fbEmail === fbUser?.email) {
                    setMessagesDataBase(messageData.messagesDataBase);
                    return messageData;
                }
            });
        })
        .catch(err => console.log(err));

    const handleSetUser = (user) => {
        setUser(user);
        typeof window !== "undefined" && localStorage.setItem("user", JSON.stringify(user));
    };

    const handleSetFbUser = (fbUser) => {
        setFbUser(fbUser);
        typeof window !== "undefined" && localStorage.setItem("fbUser", JSON.stringify(fbUser));
    };

    const handleSetMessagesDataBase = (messagesDataBase) => {
        setMessagesDataBase(messagesDataBase);
        typeof window !== "undefined" && localStorage.setItem("messagesDataBase", JSON.stringify(messagesDataBase));

        const messageBody = { fbEmail: fbUser.email, messagesDataBase: messagesDataBase }
        fetch("https://helpdesk-fb.onrender.com/messageData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageBody)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };

    const contextProps = {
        user,
        handleSetUser,
        fbUser,
        handleSetFbUser,
        messagesDataBase,
        handleSetMessagesDataBase
    }

    return (
        <UserContext.Provider value={(contextProps)}>
            <div>{children}</div>
        </UserContext.Provider>
    );
};

export default UserState;