import React,{useEffect, useState} from 'react'
import './Card.css'
import { useSelector } from 'react-redux'
import service from '../../appwrite/appwriteConfig'
import { convertDate } from '../moments'
import { useNavigate } from 'react-router-dom'
function Card({post}) {
    const theme = useSelector(state => state.theme.currtheme)
    const [ImageSrc,setImageSrc] = useState('')
    const navigate = useNavigate();
    const getIMagePreview = async () =>{
        try {
            const src =  service.getFilePreview(post.featureImage)
            setImageSrc(src);
        } catch (error) {
            console.log('Card :: getIMagePreview :: error',error);
        }
    }
    
    useEffect(()=>{
        getIMagePreview();
    },[post.featureImage])
    
  return (
    
    <div className={`Card_${theme}`} onClick={() => navigate(`/post/${post.$id}`)}>
        {console.log('Card :: post',post)}
        <div className="Card_Image">
            <img src={ImageSrc} alt="Avatar" />
        </div>
        <div className="Card_Content">
            <h2>{post.title}</h2>
            <h5>{convertDate(post.$updatedAt)}</h5>

        </div>
    </div>
  )
}

export default Card