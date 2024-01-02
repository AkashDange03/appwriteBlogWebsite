import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({
  $id,
  title,
  featuredImage
}) {

  return (
    <Link to={`/post/${$id}`}>
      <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg    md:rounded-none md:rounded-s-lg" src={appwriteService.getFilePreview(featuredImage)} alt={title} />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          </div>
      </a>

    
    </Link>
  )
}

export default PostCard


// <div className='w-full  text-black border-2 border-gray-400 shadow-sm shadow-black pb-4 rounded-md'>
// <div className='w-full flex justify-center mb-2'>
//   <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="rounded-sm w-full h-[200px]" />
// </div>
// <div className='mx-2 '>
//   <h2 className='text-xl font-bold my-1 '>{title}</h2>
// </div>

// </div>