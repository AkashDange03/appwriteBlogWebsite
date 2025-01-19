import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, SelectBtn } from "../index";
import appwriteservice from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RTE } from '../index';
import { toast } from 'react-hot-toast';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
        {
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                content: post?.content || '',
                status: post?.status || 'active',
                categories: post?.categories || [],
                tags: post?.tags || [],
                video_url: post?.video_url || '',
                translations: post?.translations || '[]', // Store as JSON string
                engagement_metrics: post?.engagement_metrics || '{}', // Store as JSON string
            }
        })

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const uploadFile = async (file) => {
        console.log("file mai aya")
        if (file) {
            return await appwriteservice.uploadFile(file);
        }
        return null;
    };

    const submit = async (data) => {
        console.log("huuaa");
        data={
            "title": "Introduction to React",
            "slug":"hello",
            "userId": "akashdange",
            "featuredImage": "https://example.com/image.jpg",
            "status": "active",
            "content": "React is a JavaScript library for building user interfaces. It's used for creating dynamic and interactive web applications.",
            "sourcelang": "en",
            "videoUrl": "https://example.com/video.mp4",
            "categories": ["JavaScript", "Web Development"],
            "tags": ["React", "JavaScript", "Frontend"],
            "translations": [
              {
                "lang": "mr",
                "title": "React चे परिचय",
                "content": "React हा वापरकर्ता इंटरफेस तयार करण्यासाठी एक जावास्क्रिप्ट लायब्ररी आहे. ते डायनॅमिक आणि संवादात्मक वेब अनुप्रयोग तयार करण्यासाठी वापरले जाते."
              }, {
                "lang": "mr",
                "title": "React चे परिचय",
                "content": "React हा वापरकर्ता इंटरफेस तयार करण्यासाठी एक जावास्क्रिप्ट लायब्ररी आहे. ते डायनॅमिक आणि संवादात्मक वेब अनुप्रयोग तयार करण्यासाठी वापरले जाते."
              },
              {
                "lang": "hi",
                "title": "React का परिचय",
                "content": "React एक जावास्क्रिप्ट पुस्तकालय है जो उपयोगकर्ता इंटरफेस बनाने के लिए है। इसका उपयोग गतिशील और इंटरएक्टिव वेब एप्लिकेशन बनाने के लिए किया जाता है।"
              },
              {
                "lang": "ta",
                "title": "React அறிமுகம்",
                "content": "React என்பது பயனர் இடைமுகங்களை உருவாக்குவதற்கான ஒரு ஜாவாஸ்கிரிப்ட் நூலகம். இது இயக்கத்துடன் கூடிய மற்றும் இடைமுக செயல்பாடுகளை உள்ளடக்கிய வலை பயன்பாடுகளை உருவாக்க பயன்படுத்தப்படுகிறது."
              }
            ],
            "likes": ["user_123", "user_456", "user_789"],
            "views": ["user_123", "user_456"]
          }

          console.log(data)

        try {
            // Handle file upload for featured image
            // const file = await uploadFile(data.image[0]);
            // console.log("file mai aya")
            // if (file) {
            //     data.featuredImage = file.$id;
            // }

            // Handle translations and engagement_metrics as JSON strings
            const translations = JSON.stringify(data.translations);
            console.log(translations)
    
            const finalData = {
                ...data,
                translations,
                userId: userData.$id, // Ensure userId is added
            };

            if (post) {
                // Updating post logic
                if (file) {
                    appwriteservice.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteservice.updatePost(post.$id, {
                    ...finalData,
                    featuredImage: data.featuredImage || post.featuredImage,
                });

                toast.success("Post updated successfully...");

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // Creating new post logic
                

                const dbPost = await appwriteservice.createPost(finalData);

                toast.success("Post created successfully...");

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            toast.error("Something went wrong, please try again.");
            console.error(error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center items-center md:flex md:flex-row md:items-start md:flex-wrap w-[100%]  my-10 md:my-20">
            <div className="w-full md:w-2/3 px-2 h-full ">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                <Input
                    label="Video URL :"
                    placeholder="Video URL"
                    className="mb-4"
                    {...register("video_url")}
                />
                <Input
                    label="Categories (comma separated) :"
                    placeholder="Categories"
                    className="mb-4"
                    {...register("categories")}
                />
                <Input
                    label="Tags (comma separated) :"
                    placeholder="Tags"
                    className="mb-4"
                    {...register("tags")}
                />
            </div>
            <div className="w-full md:w-1/3 px-2 mt-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteservice.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <SelectBtn
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
