import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import { toast } from 'react-hot-toast'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if(userData){
                    dispatch(login(userData))
                }
                toast.success("Registered Successfully..")
                navigate("/")
            }
        } catch (error) {
            toast.error("error while registering user..")
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center mt-4 h-screen">
            <div className={`mx-auto w-full max-w-lg bg-secondary rounded-xl p-10 border border-border`}>
            
                <h2 className="text-button text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-white">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-button transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup