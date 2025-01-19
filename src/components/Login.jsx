import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login as authlogin, logout } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import authService from '../appwrite/auth';
import { useForm } from "react-hook-form"; //react form
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser();
                console.log(userData)
                if (userData) {
                    dispatch(authlogin(userData));
                }
                toast.success("Login successfull...");
                navigate("/");
            }
        } catch (error) {
            toast.error("Error while login");
            setError(error.message);
        }
    }
    return (
        <div className='flex items-center justify-center w-full py-8 h-screen'>

            <div className={`mx-auto w-full max-w-lg bg-secondary rounded-xl p-10 border border-black/10`}>
               
                <h2 className="text-center text-2xl font-bold leading-tight text-button">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-white">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-lg text-button transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {
                    error && <p className='text-red-600 mt-8 text-center'>{error}</p>
                }
                
                <form onSubmit={handleSubmit(login)}> 
            
                    <div className='space-y-5'>
                        <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        {
                            ...register("email",{required:true,validate:{
                                matchPatern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be valid address",
                            }})
                        }
                        />

                        <Input
                        label="Password"
                        placeholder="Enter your Password"
                        type="password"
                        {
                            ...register("password",{required:true})
                        }
                        />

                        <Button type="submit"
                        className="w-full"
                        >
                            Sign in
                        </Button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Login