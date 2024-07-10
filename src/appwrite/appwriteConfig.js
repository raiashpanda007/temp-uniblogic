import {Client,Databases,Storage,ID,Query} from'appwrite';
import conf from '../conf/config';
export class Service{
    client = new Client();
    databases;
    bucket;


    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.bucket = new Storage(this.client);
        this.databases = new Databases(this.client);
        
    }   

    async createPost({title,slug,content,featureImage,status,userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featureImage,
                    status,
                    userID

            })
        } catch (error) {
            console.log("Autherization service :: database add :: error " ,error);
        }

    }


    async updatePost(slug,{title,content,featureImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: upDatePost :: error", error);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ", error);
            return false;
        }

    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            

        } catch (error) {
            console.log('Appwrite :: get post error :: ',error);
        }
    }
    async getPosts(){
        try {
           return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            )

        } catch (error) {
            console.log('Appwrite service error :: getPosts :: ',error);
        }
    }

    async uploadFile(file){
        try {
           return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

            
        } catch (error) {
            console.log("Appwrite service :: upload file error  :: ",error);
            return false;
        }
        

    }
    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: error ",error)
            return false;
        }
    }
        getFilePreview (fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
        
    }

    
}
const service = new Service();
export default service;