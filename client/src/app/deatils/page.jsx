"use client"

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UserContext from '@/context/UserContext';

const Login = () => {
    const { push } = useRouter();
    const { fbUser } = useContext(UserContext);

    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <>
            {domLoaded &&
                <div className="flex items-center justify-center min-h-screen bg-blue-700">
                    <div className="w-auto mx-5 p-10 bg-white rounded-lg shadow-md flex flex-col items-center space-y-5">
                        <div className="text-xl font-semibold">Facebook Page Integration</div>
                        <div className="w-full">
                            <div className="flex items-center justify-center mb-2">
                                <img
                                    className="inline-block h-16 w-1h-16 rounded-full ring-2 ring-white"
                                    src={fbUser?.picture}
                                    alt="User Image"
                                />
                            </div>
                            <div className="text-lg">Integrated Account: <span className="font-bold">{fbUser?.name}</span></div>
                            <div className="text-lg">Integrated Page:&nbsp;
                                <span className="font-bold">
                                    {fbUser?.pages?.length === 0 ? "No Pages Integrated" :
                                        <span key={fbUser?.pages?.id}>{fbUser?.pages?.name}</span>
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="w-full">
                            <button className="w-full py-2 px-4 mt-4 bg-red-600 text-white rounded hover:bg-red-700" type="submit">Delete Integration</button>
                            <Link href="/messages"><button className="w-full py-2 px-4 mt-4 bg-blue-700 text-white rounded hover:bg-blue-900" type="submit">Reply To Messages</button></Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Login;