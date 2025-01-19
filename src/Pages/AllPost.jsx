import React , {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config"
import {Container, PostCard} from '../components'
function AllPost() {
    const [posts, setPosts]=useState([]);
    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
                console.log(posts);
            }
        })
    },[])
   
  return (
    <div className='w-full  py-8 my-40'>
        <Container>
        <div className='flex flex-wrap justify-center  w-full '>
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

export default AllPost