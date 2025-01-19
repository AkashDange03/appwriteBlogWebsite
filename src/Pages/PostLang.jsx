import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

export default function PostLang() {
    const [post, setPost] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [viewsCount, setViewsCount] = useState(0);
    const { slug, language } = useParams(); // Get slug and language from URL params
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug && language) {
            console.log("slug",slug , language)
            // Fetch the post by slug
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    let translations = [];

                    // Parse translations if it's a string
                    try {
                        translations = JSON.parse(post.translations || '[]');
                        console.log(translations)
                    } catch (error) {
                        console.error("Error parsing translations JSON", error);
                    }

                    // Find the translation for the selected language, fallback to English
                    const selectedTranslation = translations.find(
                        (translation) => translation.lang === language
                    ) || translations.find((translation) => translation.lang === 'en');

                    if (selectedTranslation) {
                        setPost({
                            ...post,
                            title: selectedTranslation.title,
                            content: selectedTranslation.content,
                        });
                        setLikesCount(post.likes?.length || 0);
                        setViewsCount(post.views?.length || 0);

                        // Increment views only if the user hasn't viewed it before
                        if (!post.views?.includes(userData.$id)) {
                            incrementViews(post);
                        }
                    }
                } else navigate("/"); // Navigate to home if post not found
            });
        } else navigate("/"); // Navigate to home if slug or language is missing
    }, [slug, language, navigate, userData]);

    const incrementViews = async (postData) => {
        if (!postData) {
            console.error("Post data is null. Cannot increment views.");
            return;
        }

        try {
            const updatedPost = await appwriteService.updatePostEngagement(postData.$id, {
                views: [...(postData.views || []), userData.$id],
            });
            setViewsCount((prev) => prev + 1);
            setPost(updatedPost); // Update the local post state with the response
        } catch (error) {
            console.error("Error incrementing views:", error);
        }
    };

    const handleLike = async () => {
        if (post.likes?.includes(userData.$id)) {
            console.log("User already liked this post");
            // User has already liked the post
            return;
        }

        try {
            await appwriteService.updatePostEngagement(post.$id, {
                likes: [...(post.likes || []), userData.$id],
            });
            setLikesCount((prev) => prev + 1);
        } catch (error) {
            console.error("Error incrementing likes:", error);
        }
    };

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="my-10 py-20">
            <Helmet>
                <title>{post.title}</title>
                <meta name="description" content={post.description || "Default description"} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description || "Default description"} />
                <meta property="og:image" content={appwriteService.getFilePreview(post.featuredImage)} />
            </Helmet>
            <Container>
                <div className="w-full flex justify-center mb-4 relative border border-black rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full"
                    />

                    {post.userId === userData.$id && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="ml-4">
                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="browser-css">
                        {parse(post.content)}
                    </div>
                    <div className="mt-6 flex items-center space-x-4">
                        <button
                            onClick={handleLike}
                            className="px-4 py-2 bg-button text-black rounded-lg "
                        >
                            ❤️ Like {likesCount}
                        </button>
                        <span className="text-white">
                            👀 Views: {viewsCount}
                        </span>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
