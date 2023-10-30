import React, { useEffect, useState , useCallback} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSignIn } from "react-auth-kit"
import { Formik, Form, useField } from "formik";
import * as Yub from "yup";
import MField from "../components/MField";
import {FcGoogle} from 'react-icons/fc';

const LoginPage = () => {
    const navigate = useNavigate();
    const signIn = useSignIn();

    const [flag, setFlag] = useState(true);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = useCallback(async (values) => {
        try {
            const response = await axios.post(
                `https://${process.env.REACT_APP_API_URL}/api/auth/authenticate`,
                {
                    email: values.email,
                    password: values.password,
                }
            );

            console.log(response.data);
            localStorage.token = response.data.token;
            const userProfile = response.data.profile;
            const profileData = {
                id: userProfile.id,
                firstname: userProfile.firstname,
                lastname: userProfile.lastname,
                email: userProfile.email,
            };
            localStorage.profile = JSON.stringify(profileData);
            localStorage.role = response.data.role;
            localStorage.email = profileData.email;

            signIn({
                token: response.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { email: values.email },
            });

            if (response.data.role === "USER") {
                navigate("/HomePage");
            } else {
                navigate("/AdminHomePage");
            }
            window.location.reload();
            setFlag(true);
        } catch (error) {
            setFlag(false);
        }
    }, [navigate]);


    return (
        <div className="flex flex-row min-h-screen justify-center">
            {/*Slogan left hand side container*/}
            <div className="sm:w-1/2 bg-blue-800 text-white flex items-center justify-center ">
                <div className="hidden sm:block ">
                    <div className="text:1xl 2xl:text-4xl xl:text-3xl lg:text:2xl md:text:2xl mb-2">The perfect mate for your next adventure.</div>
                </div>
            </div>
            {/*Slogan left hand side container*/}

            {/*Right hand side Container  Container*/}
            <div className="sm:w-1/2 bg-white flex items-center justify-center">
                <div className="w-full max-w-xl px-8 py-6 lg:mx-8 rounded-md ">
                    <h1 className="text-4xl md:text-4xl lg:text-5xl mb-6 text-center">Welcome Back</h1>

                    {/*Login Form*/}
                    <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {/*Email*/}
                        <div className="flex flex-col py-2">
                            <label className="text-black">Email</label>
                            <input className="text-black rounded-md bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none w-full md:w-auto"
                                   type= "text"
                                   value={email}
                            />
                        </div>
                        {/*Email*/}

                        {/*Password*/}
                        <div className="flex flex-col text-black py-2">
                            <label>Password</label>
                            <input value={password} className="rounded-md bg-blue-100 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none w-full md:w-auto" type= "password"/>
                        </div>
                        {/*Password*/}

                        {/*Login button*/}
                        <label className="text-white">Login Button</label>
                        <div className="flex flex-col text-white py-2 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 hover:scale-105 duration-300">
                            <button type="submit" className="">
                                Log In
                            </button>
                        </div>
                        {/*Login button*/}

                    </form>
                    {/*Login Form*/}


                    <div className="mt-10 grid grid-cols-3 items-center text-black">
                        <hr className="border-gray-400"/>
                        <p className="text-center">OR</p>
                        <hr className="border-gray-400"/>
                    </div>
                    {/*Login button*/}

                    {/*Login with Google button*/}
                    <button className="bg-white border-2 py-2 w-full rounded-xl mt-5 flex justify-center items-center hover:bg-gray-100 hover:scale-105 duration-300">
                        <FcGoogle className="mr-3" size={22}/>
                        Login with Google
                    </button>
                    {/*Login with Google button*/}

                    <div className="mt-5 text-xs flex justify-between items-center">
                        <p className="text-decoration-line: underline">Don't have an account?</p>
                        <button className="py-2 px-5 text-white bg-blue-600 font-bold border rounded-xl hover:scale-105 duration-300">Register</button>
                    </div>
                </div>
            </div>
            {/*Right hand side Container*/}

        </div>


    )


};

export default LoginPage;
