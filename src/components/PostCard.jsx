import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({
  $id,
  title,
  featuredImage,
  likes = 0,
  views = 0, // Default to 0 if no data is available
}) {

  return (
    <Link to={`/post/${$id}`}>
      <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img 
          className="object-cover w-full rounded-t-lg md:rounded-none md:rounded-s-lg" 
          src={appwriteService.getFilePreview(featuredImage)} 
          alt={title} 
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-button dark:text-white">{title}</h5>
          <div className="flex justify-between mt-2 gap-4">
            <div className="flex items-center text-gray-500">
              <span className="mr-1">Likes: </span>
              <span>{likes.length}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <span className="mr-1">Views: </span>
              <span>{views.length}</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default PostCard;
