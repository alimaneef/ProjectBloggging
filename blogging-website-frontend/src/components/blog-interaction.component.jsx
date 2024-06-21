import React, { useContext } from 'react'
import { BlogContext } from '../pages/blog.page'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'

const BlogInteraction = () => {

    let {blog:{blog_id,activity,activity:{total_likes,total_comments},author:{personal_info:{username:author_username}}},setBlog}=useContext(BlogContext)

    let {userAuth:{username}}=useContext(UserContext)

  return (
    <>
        <hr className='border-grey my-2'/>
            <div className='flex gap-6 justify-between'>
                
                <div className='flex gap-3 items-center'>
                    
                    {/* Likes */}
                    <button className='w-10 h-10 rounded-full flex items-center justify-center bg-grey/80 hover:scale-125'>
                    <i className="fi fi-rr-heart"></i>
                    </button>
                    <p className='text-xl font-medium text-dark-grey'>{total_likes}</p>
                
                    {/* Comments */}
                    <button className='w-10 h-10 rounded-full flex items-center justify-center bg-grey/80 hover:scale-125'>
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