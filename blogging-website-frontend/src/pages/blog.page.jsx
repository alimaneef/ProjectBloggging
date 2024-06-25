import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AnimationWrapper from '../common/page-animation'
import Loader from '../components/loader.component'
import { Link } from 'react-router-dom'
import { getday } from '../common/date'
import BlogInteraction from '../components/blog-interaction.component'
import BlogPostCard from '../components/blog-post.component'
import BlogContent from '../components/blog-content.component'


export const blogStructure = {
    title: '',
    des: '',
    content: [],
    // tags:[],
    author: { personal_info: {} },
    banner: '',
    publishedAt: ''
}

export const BlogContext = createContext({});

const BlogPage = () => {

    let { blog_id } = useParams();

    const [blog, setBlog] = useState(blogStructure)
    const [similarBlogs, setSimilarBlogs] = useState(blogStructure);
    const [loading, setLoading] = useState(true);
    const [isLikedByUser,setIsLikedByUser]=useState(false);
    const [prof_img,setProf_img]=useState('https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg')

    let { title, content, banner, author: { personal_info: { fullname, username: author_username, profile_img} }, publishedAt } = blog;


    const fetchBlogs = () => {
        if(profile_img) setProf_img(profile_img);
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", {
            blog_id
        })
            .then(({ data: { blog } }) => {

                setBlog(blog);

                // Making request to get similar blogs
                axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/search-blogs', {
                    tag: blog.tags[0],
                    limit: 6,
                    eliminate_blog: blog_id
                })
                    .then(({ data }) => {
                        setSimilarBlogs(data.blogs);
                    })

                setLoading(false)
                // console.log(blog)
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
    }

    useEffect(() => {

        resetStates();

        fetchBlogs();

    }, [blog_id])

    const resetStates = () => {
        setBlog(blogStructure);
        setSimilarBlogs(null)
        setLoading(true)
    }

    return (
        <AnimationWrapper>
            {
                loading
                    ?
                    <Loader />
                    :
                    <BlogContext.Provider value={{ blog, setBlog ,isLikedByUser,setIsLikedByUser}}>
                        <div className='max-w-[900px] center py-10 max-lg:px-[5vw]'>

                            <img src={banner} className='aspect-video rounded-md' alt="banner-image" />

                            <div className='mt-12'>
                                <h2>{title}</h2>

                                <div className='flex max-sm:flex-col justify-between my-8'>
                                    <div className='flex gap-5 items-start'>

                                        {/* Profile image not being displayed properly.  */}
                                        <img src={prof_img} className='w-12 h-12 rounded-full' alt="prof_img" />
                                        
                                        <p classNam1e=' capitalize'>
                                            {fullname}
                                            <br />
                                            <Link to={`/user/${author_username}`} className=' text-twitter hover:underline'>@{author_username}</Link>
                                        </p>
                                    
                                    </div>
                                    <p className=' text-dark-grey opacity-75 max-sm:mt-4 max-sm:ml-12 max-sm:pl-5'>Published on: {getday(publishedAt)}</p>
                                </div>
                            </div>

                            <BlogInteraction />
                            {/* Blog Content : PS: Given two Blog interaction panels in case the blog is long enough so that the user has to not go to top to see the likes or comments */}

                            <div className='my-12 font-gelasio blog-page-content'>
                                {
                                    content[0].blocks.map((block,i)=>{
                                        return <div key={i} className='my-4 md:my-8'>
                                            <BlogContent block={block}/>
                                        </div>
                                    })
                                }
                            </div>

                            <BlogInteraction />

                            {
                                similarBlogs != null && similarBlogs.length
                                    ?
                                    <>
                                        <h1 className='tex-2xl mt-14 mb-10 font-medium'>Similar Blogs
                                        </h1>

                                        {
                                            similarBlogs.map((blog, i) => {
                                                let { author: { personal_info } } = blog;

                                                return <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.08 }}>
                                                    <BlogPostCard content={blog} author={personal_info}>
                                                    </BlogPostCard>
                                                </AnimationWrapper>
                                            })
                                        }

                                    </>
                                    :
                                    ""
                            }

                        </div>
                    </BlogContext.Provider>
            }
        </AnimationWrapper>
    )
}

export default BlogPage