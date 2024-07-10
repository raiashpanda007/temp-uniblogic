import React from 'react'
import './HomeScreen.css'
import service from '../../appwrite/appwriteConfig'
import { Card } from '../../Components/indexComponent'
import { useEffect,useState } from 'react'
import { set } from 'react-hook-form'
function HomeScreen() {
    const [posts,setPosts] = useState([]);
    const getPosts = async () => {
        try{
            const AllPost_Documents = await service.getPosts();
            setPosts(AllPost_Documents.documents)
        }catch(error){
            console.log('HomeScreen :: getPosts :: error',error);
        }

    }

    useEffect(()=>{
        getPosts();
        console.log('HomeScreen :: posts',posts);
    },[])
  return (
    
    <div className="Home_Screen">
        {
           posts.map((post,index)=>(
                <Card key={index} post={post}/>
              
           ))
        }



    </div>
  )
}

export default HomeScreen