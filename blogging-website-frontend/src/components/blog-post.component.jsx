import React from 'react'
import { getday } from '../common/date';
import {Link} from 'react-router-dom'

const BlogPostCard = ({content , author}) => {
  
  let {publishedAt,tags,title,des,banner,activity:{total_likes},blog_id:id}=content;
  let {fullname,profile_img,username}=author;

  return (
    <Link to={`/blog/${id}`} className='flex gap-8  items-center border-b border-grey pb-5 mb-4 '>
    <div className='w-full'>
        <div className='flex gap-2 items-center mb-4'>
            <img src={profile_img} alt="profile_img" className='w-6 h-6 rounded-full'/>
            <p className='line-clamp-1'>{fullname} @{username}</p>
            <p className='min-w-fit'>{getday(publishedAt)}</p>
        </div>


        <h1 className='blog-title'>{title}</h1>

        <p className='my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2'>{des}</p>

        <div className='flex mt-7'>
            <span className='btn-light py-1 px-4'>{tags[0]}</span>
            <span className='ml-3 flex items-center gap-2 text-dark-grey'>
                <i className="fi fi-rr-heart text-xl"></i>
                {total_likes}
            </span>
        </div>
    </div>

    <div className='h-28 aspect-square bg-grey'>
        <img src={banner} alt="banner" className='w-full h-full aspect-square rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]' />
    </div>
    </Link>
  )
}

export default BlogPostCard