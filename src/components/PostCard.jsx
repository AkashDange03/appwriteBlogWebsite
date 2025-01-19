import React from "react";
import appwriteService from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";

function PostCard({ $id, title, featuredImage, likes = 0, views = 0 }) {
  const navigate = useNavigate();

  // Available languages
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "mr", name: "Marathi" },
    { code: "ta", name: "Tamil" },
  ];

  // Handle language selection
  const handleLanguageChange = (language) => {
    navigate(`/postlang/${$id}/${language}`);
  };

  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <Link to={`/post/${$id}`}>
        <img
          className="object-cover w-full rounded-t-lg md:rounded-none md:rounded-s-lg"
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
        />
      </Link>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-button dark:text-white">
          {title}
        </h5>
        <div className="flex justify-between mt-2 gap-4">
          <div className="flex items-center text-button">
            <span className="mr-1">Likes:</span>
            <span>{likes.length}</span>
          </div>
          <div className="flex items-center text-button">
            <span className="mr-1">Views:</span>
            <span>{views.length}</span>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mt-4">
          <h6 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            View in another language:
          </h6>
          <ul className="flex gap-2 mt-2">
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="cursor-pointer px-3 py-1 bg-button text-black rounded-md"
              >
                {lang.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
