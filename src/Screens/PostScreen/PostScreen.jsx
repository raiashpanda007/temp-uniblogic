import React, { useEffect, useState } from "react";
import service from "../../appwrite/appwriteConfig";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from 'html-react-parser';
import "./PostScreen.css";
import { setLoading } from "../../store/LoadingSLice";
import { useDispatch } from "react-redux";
import { DeleteIcon, EditNoteIcon } from "../../assets/Icons/Icons";
import { useNavigate } from "react-router-dom";

function PostScreen() {
  const theme = useSelector((state) => state.theme.currtheme);
  const user = useSelector((state) => state.auth.userData);
  const [postDetails, setPostDetails] = useState({});
  const [imageSource, setImageSource] = useState("");
  const isLoading = useSelector((state) => state.Loading.DataLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const deletePost = async (postDetails) =>{
    try {
      dispatch(setLoading(true));
      await service.deletePost(postDetails.$id);
      navigate("/");
      dispatch(setLoading(false));
    } catch (error) {
      console.log("PostScreen :: deletePost :: error", error);

      
    }

  }
  
  
  const editingPosts = () =>{
    navigate(`/edit-post/${postDetails.$id}`);

  }
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
    
  }, [postId]);

  useEffect(() => {
    if (postDetails.featureImage) {
      setImageSource(service.getFilePreview(postDetails.featureImage));
    }
  }, [postDetails]);
  const handleDelete = () => {
    deletePost(postDetails);
  }
  const handleEdit = () => {
    editingPosts()
  }


  return (
    <div className={`Post_${theme}`}>
      
      <div className="Post_Details">
        {postDetails.userID ===user.$id &&<div className="Post_Options">
          <div className="Icon" onClick={handleEdit}>
          <EditNoteIcon  />
          </div>
          <div className="Icon2" onClick={handleDelete}>
          <DeleteIcon />
          </div>
        </div>}
        <h2>{postDetails.title}</h2>

        {postDetails.featureImage && (
          <img src={imageSource} alt="featureImage" />
        )}
        <div className="Post_Content">
          {
            postDetails.content && parse(postDetails.content)
          }
        </div>
      </div>
    </div>
  );
}

export default PostScreen;
