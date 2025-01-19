import React, {useState,useEffect} from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'
import { useSelector } from "react-redux";


function Home() {
    const [posts,setPosts]=  useState([])
    const userData = useSelector((state) => state.auth.userData);

    useEffect(()=>{
        if(userData!=null){
            appwriteService.getPosts().then((posts)=>{
                if(posts){
                    setPosts(posts.documents)
                    console.log(posts);
                }
            })
        }
    },[])

    if(posts.length === 0){
        return(
            <div className='w-full py-8  text-center h-screen'>
        
                    <div className='flex flex-col justify-center h-full'>
                        <div className='p-2 w-full'>
                            <h1 className='text-4xl
                             font-bold text-button '>
                                Welcome To Our Blog Website !
                            </h1>
                            <h2 className='mt-4 font-bold text-white '>Please login to read and add post</h2>
                        </div>
                    </div>
       
            </div>
        )
    }
    return (
        <div className='w-full py-8 '>
      
            <div className='flex flex-wrap justify-center w-full h-full mt-20'>
                { posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-full md:w-[30%]'>

                        <PostCard {...post} />

                    </div>
                ))}
            </div>
    
    </div>
    )
 
}

export default Home