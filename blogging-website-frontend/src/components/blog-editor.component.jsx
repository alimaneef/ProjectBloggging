import React, { createContext, useContext, useEffect} from 'react'
import logo from '../imgs/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation'
import defaultBanner from '../imgs/blog banner.png'
import { EditorContext } from '../pages/editor.pages'
import { uploadImage } from '../common/aws'
import { Toaster,toast } from 'react-hot-toast'
import EditorJS from "@editorjs/editorjs"
import { tools } from './tools.component'
import axios from 'axios'
import { UserContext } from '../App'

const BlogEditor = () => {
   
   

    let {blog,blog :{title,banner,content,tags,des},setBlog,textEditor,setTextEditor,setEditorState} =useContext(EditorContext)
    
    let {userAuth:{access_token}}=useContext(UserContext);


    let navigate=useNavigate();

    useEffect(()=>{
        if(!textEditor.isReady){
            setTextEditor(new EditorJS({
                holder:"textEditor",
                data:content,
                tools:tools,
                placeholder:"Let's write an awesome blog"
            }))
        }
    },[])

    const handleBannerUpload=(e)=>{
        let img=e.target.files[0];

        let loadingToast=toast.loading("Uploading...")
        if(img){
            uploadImage(img).then((url)=>{
                if(url){
                    toast.dismiss(loadingToast)
                    // blogBannerRef.current.src=url
                    setBlog({...blog,banner:url})
                    toast.success("Uploaded Successfully 👌")
                }
            })
            .catch(err=>{
                toast.dismiss(loadingToast)
                return toast.error(err);
            })
        }
        // else toast.dismiss(loadingToast);
    }

    const handleTitleKeyDown=(e)=>{
        if (e.keyCode==13) {
            e.preventDefault();
        }
    }

    const handleTitleChange=(e)=>{
        let input =e.target
        input.style.height='auto';
        input.style.height=input.scrollHeight+'px';

        setBlog({...blog,title:input.value})
    }
    const handleError=(e)=>{
        let img=e.target;
        img.src=defaultBanner
    }


    const handlePublishEvent=()=>{
        if(!banner.length){
            return toast.error("Upload a banner to publish your blog")
        }
        if(!title.length){
            return toast.error("Provide a suitable Title")
        }
        if(textEditor.isReady){
            textEditor.save().then(data=>{
                if(data.blocks.length){
                    setBlog({...blog,content:data})
                    setEditorState("Publish")
                }
                else{
                    return toast.error("Write some content for your blog.")
                }
            })
        }
    }

    const handleSaveDraft=(e)=>{
        if(e.target.disabled) return;

    if(!title.length) return toast.error("Write a suitable title before saving it as a Draft.")

    let loadingToast= toast.loading("Saving Draft...");
    e.target.disabled=true;

    if(textEditor.isReady){
        
        textEditor.save().then(content=>{
        
            let blogObj={
            title,banner,des,tags,content,draft:true
          };
      
          axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/create-blog",blogObj,{
            headers:{
              'Authorization':`Bearer ${access_token}`
            }
          })
          .then(()=>{
            e.target.disabled=false;
            toast.dismiss(loadingToast);
            toast.success('Saved 👍');
      
            setTimeout(()=>{
              navigate('/');
            },500);
          })
          .catch(({response})=>{
            e.target.disabled=false;
            toast.dismiss(loadingToast);
            return toast.error(response.data.error);
          })
      })
    }

    
    }

  return (
    <>
        <nav className='navbar'>
        <Link to='/' className='flex-none w-10'>
            <img src={logo} alt="logo" />
        </Link>
        <p className='max-md:hidden line-clamp-1 w-full'>
            {title.length ? title : 'New Blog'}
        </p>
        <div className='flex gap-4 ml-auto'>
            <button className='btn-dark py-2'
            onClick={handlePublishEvent}
            >
                Publish
            </button>
            <button className='btn-light py-2' onClick={handleSaveDraft}>Save Draft</button>
        </div>
        </nav>
        <Toaster/>
        <AnimationWrapper>
            <section>
                <div className='mx-auto max-w-[900px] w-full'>
                    <div className='relative aspect-video bg-white border-4 border-grey hover:opacity-80'>
                        <label htmlFor="uploadBanner">
                            <img 
                            src={banner} alt="banner" 
                            className='z-20'
                            onError={handleError}
                            />
                            <input 
                                id='uploadBanner'
                                type='file'
                                accept='.png, .jpg, .jpeg'
                                hidden
                                onChange={handleBannerUpload}
                            />
                        </label>

                    </div>
                    <textarea placeholder='Blog Title'
                        defaultValue={title} 
                        className='text-4xl font-medium w-full h-20 resize-none mt-10 placeholder:opacity-40 leading-tight'
                        onKeyDown={handleTitleKeyDown}
                        onChange={handleTitleChange}
                        >
                    </textarea>

                    <hr className='w-full opacity-10 my-5'/>

                    <div id="textEditor" className='font-gelasio'></div>
                </div>
            </section>
        </AnimationWrapper>
    </>
  )
}

export default BlogEditor