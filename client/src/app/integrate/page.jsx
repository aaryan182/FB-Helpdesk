"use client"

import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FacebookLogin from "react-facebook-login";
import UserContext from '@/context/UserContext';

const Login = () => {
    const { push } = useRouter();
    const { user, handleSetUser, handleSetFbUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    // *****************
    const componentClicked = () => {
        console.log("clicked");
    };

    const responseFacebook = (response) => {
        setLoading(true);
        const { accessToken, userID, name, email, picture } = response;
        console.log(response);
        fetch(`https://graph.facebook.com/${userID}/accounts?access_token=${accessToken}`)
            .then((pages_response) => pages_response.json())
            .then((data) => {
                const pages = data.data;
                const userObj = {
                    userEmail: user?.email || "test@email.com",
                    name,
                    email,
                    fbId: userID,
                    accessToken,
                    picture: picture.data.url,
                    pages: { name: pages[0].name, id: pages[0].id, access_token: pages[0].access_token, category: pages[0].category },
                };
                console.log(userObj);
                handleSetFbUser(userObj);

                fetch('https://helpdesk-fb.onrender.com/fbusers', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userObj),
                })
                    .then((response) => {
                        console.log(response);
                        handleSetFbUser(userObj);
                        setLoading(false);
                    })
                    .catch((err) => console.log(err));
                push('/deatils');
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        // console.log(user.email);
    }, []);
    // *****************

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-700">
            <div className="w-96 mx-5 p-10 bg-white rounded-lg shadow-md flex flex-col items-center space-y-5">
                <div className="text-xl font-semibold">Facebook Page Integration</div>
                <div className="w-full">

                    {loading ? (
                        <div className='spinner-border' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </div>
                    ) : (
                        // <button className="w-full py-2 px-4 mt-4 bg-blue-700 text-white rounded hover:bg-blue-900" type="submit">
                        <FacebookLogin
                            cssClass="w-full py-2 px-4 mt-4 bg-blue-700 text-white rounded hover:bg-blue-900"
                            textButton="Connect Page"
                            appId='1695550040891756'
                            // autoLoad={true}
                            fields='name,email,picture'
                            scope='pages_manage_metadata,pages_manage_engagement,pages_messaging,pages_read_engagement,pages_read_user_content,pages_show_list,pages_manage_cta'
                            onClick={componentClicked}
                            callback={responseFacebook}
                        />
                        // </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login;