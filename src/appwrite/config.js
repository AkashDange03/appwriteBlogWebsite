import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ 
        title, 
        slug, 
        content, 
        featuredImage, 
        status, 
        userId, 
        videoUrl, 
        categories, 
        tags, 
        translations 
    }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    videoUrl,
                    categories,
                    tags,
                    translations,
                    likes: [],
                    views: []
                }
            );
        } catch (error) {
            throw error;
        }
    }
    

    async updatePost(slug,{title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
                { 
                title,
                content,
                featuredImage,
                status
            });
        }catch(error){
            throw error;
        }
    }

    async updatePostEngagement(slug, updatedFields) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,  // Replace with your database ID
                conf.appwriteCollectionId, // Replace with your collection ID
                slug, // The document ID or slug
                updatedFields // The specific fields to update
            );
        } catch (error) {
            console.error("Error updating post engagement metrics:", error);
            throw error;
        }
    }

    async deletePost(slug){
        try{
           await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
           return true;
        }catch(error){
            throw error;
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
        }catch(error){
            throw error;
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries);
        }catch(error){
            throw error;
            return false;
        }
    }

    

    //file upload

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            throw error;
        }
    }

    async deleteFile(fileId){
        try{
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

            return true;
        }catch(error){
            throw error;
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service()
export default service;