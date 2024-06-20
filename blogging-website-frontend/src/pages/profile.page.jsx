import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation';
import Loader from '../components/loader.component';
import { UserContext } from '../App';
import AboutUser from '../components/about.component';
import FilterPaginationData from '../common/filter-pagination-data';
import InPageNavigation from '../components/inpage-navigation.component';

export const profileDataStructure={
    personal_info:{
        fullname:"maneef",
        username:"ali",
        profile_img:'data:image/jpeg;base64,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',
        bio:"apple",
    },
    account_info:{
        total_posts:0,
        total_reads:0,

    },
    social_links:{},    
    joinedAt:""
}

const ProfilePage = () => {

    let { id: profileId } = useParams();
    
    let [profile,setProfile]=useState(profileDataStructure);
    let [loader,setLoader]=useState(true);

    let [blogs,setBlogs]=useState(null);

    let {personal_info:{fullname,username:profile_username,profile_img,bio},account_info:{total_posts,total_reads},social_links,joinedAt}=profile
    

    let {userAuth:{username}} =useContext(UserContext);

    const fetchUserProfile=()=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+'/get-profile',{name:profileId})
        .then(({data:user})=>{
            setProfile(user);
            getBlogs({user_id:user._id})
            setLoader(false)
        })
        .catch(err=>{
            console.log(err);
            setLoader(false)
        })
    }

    const getBlogs=({page=1,user_id})=>{
        user_id = user_id ==undefined ? blogs.user_id : user_id;
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+'/search-blogs',{
            author:user_id,
            page
        })
        .then(async ({data})=>{
            let formattedData=await FilterPaginationData({
                state:blogs,
                data:data.blogs,
                page,
                countRoute:'/search-blogs-count',
                data_to_send:{author:user_id}
            })
            formattedData.user_id=user_id;
            setBlogs(formattedData);
        })
    }

    useEffect(()=>{
        resetStates();
        fetchUserProfile();
    },[profileId]);

    const resetStates=()=>{
        setProfile(profileDataStructure);
        setLoader(true);
    }
    return (
       <AnimationWrapper>
        {
            loader ? <Loader/> : 
            <section className='h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12'>
                <div className='flex flex-col max-md:items-center gap-5 min-w-[250px]'>
                    <img src={profile_img} className='w-48 h-48 rounded-full bg-grey md:w-32 md:h-32' alt="user-profile" />
                    <h1 className='text-2xl font-medium'>@{profile_username}</h1>
                    <p className='text-xl capitalize h-6'>{fullname}</p>

                    <p>{total_posts.toLocaleString()}:Blogs <span className='font-bold'>and</span> {total_reads.toLocaleString()}:Reads</p>

                    <div className='flex gap-4 mt-2'>

                        {
                            profileId ==username 
                            ? 
                            <Link to="/settings/edit-profile" className='btn-light rounded-md'>Edit Profile</Link>
                            :
                            ""
                        }
                    </div>

                    <AboutUser className='max-md:hidden' bio={bio} social_links={social_links} joinedAt={joinedAt}/>
                
                </div>

                <div className='max-md:mt-12 w-full' >
                    {/* <InPageNavigation
                        routes={["Blogs Published","About"]}
                    >

                    </InPageNavigation> */}
                </div>
            </section> 
        }
       </AnimationWrapper>
    )
}

export default ProfilePage