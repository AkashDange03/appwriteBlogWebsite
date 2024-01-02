import React, {useState,useEffect} from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'


function Home() {
    const [posts,setPosts]=  useState([])

    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
                console.log(posts);
            }
        })
    },[])

    if(posts.length === 0){
        return(
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-col justify-center    h-[50vh]'>
                        <div className='p-2 w-full'>
                            <h1 className='text-4xl
                             font-bold text-black hover:text-black'>
                                Welcome To Our Blog Website !
                            </h1>
                            <h2 className='mt-4 font-bold text-orange-500 '>Please login to read and add post</h2>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8 '>
        <Container>
            <div className='flex flex-wrap justify-center w-full  '>
                { posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-full md:w-[30%]'>

                        <PostCard {...post} />

                    </div>
                ))}
            </div>
        </Container>
    </div>
    )
 
}

export default Home