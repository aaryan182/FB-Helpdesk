"use client"

import { Avatar } from "@material-ui/core";
// import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import { useContext } from 'react';
import UserContext from "@/context/UserContext";
import ReplyBox from "../replyBox/replyBox";

import styles from "./chatBox.module.scss";

const Chat = ({ message, customer }) => {
  const date = new Date(message?.timestamp);

  const timeStamp = (
    <>
      {date.toLocaleDateString("en-US", options)}{" "}
      {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
    </>
  );
  return (
    <div className={styles.messages}>
      {/* <Chat key={idx} message={message} /> */}
      <span className={styles.message}>{message.text}</span>
      <small className={styles.date}>
        {customer?.name} {timeStamp}
      </small>
    </div>
  );
};

const options = {
  weekday: "short",
  day: "numeric",
};

const ChatBox = ({ item }) => {
  const { customer, profile, messages } = item;
  const { user, fbUser, handleSetUser } = useContext(UserContext);

  // const [session] = useSession();

  const date = new Date("2023-09-06T21:05:28+0000");

  const timeStamp = (
    <>
      {date.toLocaleDateString("en-US", options)}{" "}
      {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
    </>
  );


  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded &&
        <div className={styles.chatBox}>
          <div className={styles.history}>
            {messages
              .slice()
              .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
              .map((message, idx) => {
                return (message.from.name !== fbUser.pages.name) ? (
                  <div key={idx} className={styles.leftChats}>
                    <div className={styles.chatItem}>
                      <div className={styles.avatar}>
                        <Avatar src={profile} />
                      </div>
                      <Chat key={idx} message={message} customer={customer} />
                    </div>
                  </div>
                ) : (
                  <div key={idx} className={styles.rightChats}>
                    <div className={styles.chatItem}>
                      <div className={styles.messages}>
                        <Chat key={idx} message={message} customer={customer} />
                      </div>
                      <div className={styles.avatar}>
                        <Avatar src={user && user.picture} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={styles.input}>
            {/* <input type="text" placeholder={`Message ${customer.name}`} /> */}
            <ReplyBox customerName={customer.name} customerId={customer.id} />
          </div>
        </div>
      }
    </>
  );
};

export default ChatBox;