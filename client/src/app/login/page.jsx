"use client"

import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from "../../firebaseConfig";
import UserContext from '@/context/UserContext';

const Login = () => {
    const { push } = useRouter();
    const { user, setUser, handleSetUser } = useContext(UserContext);

    const [input, setInput] = useState({ email: "", password: "" });
    const handleChanges = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, input.email, input.password)
            .then((userCredentials) => {
                console.log(userCredentials);
                fetch('https://helpdesk-fb.onrender.com/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: userCredentials.user.email })
                })
                handleSetUser({ email: userCredentials.user.email });
                console.log(user);
                push('/integrate');
            })
            .catch((err) => { alert(err) })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-700">
            <div className="w-96 mx-5 p-10 bg-white rounded-lg shadow-md flex flex-col items-center space-y-5">
                <div className="text-xl font-semibold">Login to your account</div>
                <div className="w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="email" className="block font-semibold">Email</label>
                            <input type="text" id="email" name="email" value={input.email} onChange={handleChanges} className="w-full p-2 rounded border border-gray-300" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block font-semibold">Password</label>
                            <input type="password" id="password" name="password" value={input.password} onChange={handleChanges} className="w-full p-2 rounded border border-gray-300" />
                        </div>
                        <div className="flex items-center mb-5">
                            <input type="checkbox" name="" className="w-4 h-4 mr-2" />
                            <label className="font-semibold">Remember Me</label>
                        </div>
                        <div className="mb-5">
                            <button className="w-full py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-900" type="submit">Login</button>
                        </div>
                    </form>
                </div>
                <div className="w-full">
                    <div className="text-blue-700">
                        New to MyApp? <Link href="/register" className="underline">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;