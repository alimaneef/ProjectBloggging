import React, { useContext, useEffect } from 'react'
import { BlogContext } from '../pages/blog.page'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import { Toaster,toast } from 'react-hot-toast'
import axios from 'axios'

const BlogInteraction = () => {

    let {blog,blog:{_id,blog_id,activity,activity:{total_likes,total_comments},author:{personal_info:{username:author_username}}},setBlog,isLikedByUser,setIsLikedByUser}=useContext(BlogContext)

    let {userAuth:{username,access_token}}=useContext(UserContext)

    useEffect(()=>{
        if(access_token){
            // make request to server to get like information
            axios.post(import.meta.env.VITE_SERVER_DOMAIN+'/isliked-by-user',{_id},{
                headers:{
                    'Authorization':`Bearer ${access_token}`
                }
            })
            .then(({data:{result}})=>{
                setIsLikedByUser(Boolean(result));
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },[])

    const handleLike=()=>{ 
        if(access_token){
            // logged In
            setIsLikedByUser(preVal=> !preVal)

            !isLikedByUser ? (total_likes++) : (total_likes--);
            setBlog({...blog,activity:{...activity,total_likes}})

            axios.post(import.meta.env.VITE_SERVER_DOMAIN+'/like-blog',{
                _id,isLikedByUser
            },{
                headers:{
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({data})=>{
                console.log(data)
            })
            .catch(err=>console.log(err))

        }else{
            // Not loggen In
            toast.error("Please login to like this blog.")

        }
    }

  return (
    <>
        <Toaster/>
        <hr className='border-grey my-2'/>
            <div className='flex gap-6 justify-between'>
                
                <div className='flex gap-3 items-center'>
                    
                    {/* Likes */}
                    <button className={'w-10 h-10 rounded-full flex items-center justify-center hover:scale-125 '+(isLikedByUser ? 'bg-red/10 text-red' : 'bg-grey/80')}
                    onClick={handleLike}
                    >
                    <i className={"fi fi-"+(isLikedByUser ? 'sr' : 'rr')+"-heart"}></i>
                    </button>
                    <p className='text-xl font-medium text-dark-grey'>{total_likes}</p>
                
                    {/* Comments */}
                    <button className={'w-10 h-10 rounded-full flex items-center justify-center bg-grey/80 hover:scale-125'}>
                    <i class="fi fi-rr-comment-alt"></i>
                    </button>
                    <p className='text-xl font-medium text-dark-grey'>{total_comments}</p>
                
                </div>

                <div className='flex gap-6 items-center'>
                
                {/* Option to edit blog for author only */}
                {
                    username==author_username
                    ?
                    <Link to={`/editor/${blog_id}`} className=' hover:text-twitter'>
                     <button className='w-10 h-10 rounded-full flex items-center justify-center bg-grey/80 hover:scale-125'>   
                    <i className="fi fi-rr-pencil"></i>
                    </button>
                    </Link>
                    :
                    ''

                }


                {/* Functionality to share the blog On Twitter */}
                {/* <Link to='/'>
                    <button className='w-10 h-10 rounded-full bg-grey/80 hover:scale-125 hover:text-twitter'>
                    <i className="fi fi-brands-twitter"></i>
                    </button>
                </Link> */}
                    
                </div>


            </div>
        <hr className='border-grey my-2'/>
    </>
  )
}

export default BlogInteraction