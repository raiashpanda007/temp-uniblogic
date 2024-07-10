import React,{useEffect,useState} from 'react'
import { PostForm } from '../Screen'
import { useParams } from 'react-router-dom'
import service from '../../appwrite/appwriteConfig';

function EdtingFormScreen() {
    const [postDetails, setPostDetails] = useState({});
    const { postId } = useParams();

    const gettingPostDetails = async (postId) => {
        try {
          const post = await service.getPost(postId);
          
          setPostDetails(post);
          return post;
        } catch (error) {
          console.log("PostScreen :: gettingPostDetails :: error", error);
        }
      };
    useEffect(() => {
        gettingPostDetails(postId);
    }, [postId])
  return (
    <PostForm post={postDetails}/>
  )
}

export default EdtingFormScreen