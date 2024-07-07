import React, { useContext, useRef } from 'react'
import InputBox from '../components/input.component'
import googleIcon from '../imgs/google.png'
import { Link, Navigate } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation'
import {Toaster,toast} from 'react-hot-toast'
import axios from 'axios'
import { storeInSession } from '../common/session'
import {UserContext} from '../App'
import { authWithGoogle } from '../common/firebase'

const UserAuthForm = ({type}) => {

  let {userAuth:{access_token},setUserAuth}=useContext(UserContext)
  
  const userAuthThroughServer=(serverRoute,formData)=>{
    axios.post(import.meta.env.VITE_SERVER_DOMAIN+serverRoute,formData)
    .then(({data})=>{
      storeInSession('user',JSON.stringify(data))
      setUserAuth(data)
    })
    .catch(({response})=>{
      return toast.error(response.data.error)
    })
  }


  const handleSubmit=(e)=>{
    
    e.preventDefault();
    
    let serverRoute= type==='sign-in' ? '/signin' :'/signup'

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    // Form Data
    
    let form=new FormData(formElement)
    let formData={}
    for(let [key,value] of form.entries()){
      formData[key]=value
    }
    
    let {fullname,email,password}=formData;
    if(fullname) if(fullname.length<3) return toast.error("Full name must be at least 3 characters long")
    if(!email.length) return toast.error('Enter email')
    if(!emailRegex.test(email)) return toast.error('Email is invalid')
    if(!passwordRegex.test(password)) return toast.error('Password must be atleast 6 to 20 characters long having a number,uppercase and lowercase letters')

    userAuthThroughServer(serverRoute,formData)

  }

  const handleGoogleAuth=(e)=>{
    
    e.preventDefault();
    
    authWithGoogle().then(user=>{
      let serverRoute='/google-auth';
      let formData={
        access_token:user.accessToken
      }
      // console.log(formData)
      userAuthThroughServer(serverRoute,formData)
      // console.log(user)
    })
    .catch(err=>{
      toast.error('Trouble logging in with Google')
      return console.log(err)
    })
  }
  return (
    access_token 
    ?<Navigate to='/' />
    :<AnimationWrapper keyValue={type}>
    <section className='h-cover flex items-center justify-center'>
      <Toaster/>
        <form id='formElement' className='w-[80%] max-w-[400px]'>
            <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>
                {type==='sign-in' ? 'Welcome Back' : 'Join us Today'}
            </h1>
            {
                type!=='sign-in'
                ?<InputBox
                     name='fullname'
                     type='text'
                     placeholder='Full Name'
                     icon='fi-rr-user' 
                 />
                :''
            }
            <InputBox
                     name='email'
                     type='email'
                     placeholder='E-mail'
                     icon='fi-rr-envelope' 
            />
            <InputBox
                     name='password'
                     type='password'
                     placeholder='Password'
                     icon='fi-rr-key' 
            />
           
           {/* Form Submit Button */}
            <button 
              type='submit' 
              className='btn-dark center mt-14 w-[90%]'
              onClick={handleSubmit}
            >
            {type.replace('-',' ')}
            </button>
           
            <div className='relative w-full flex gap-2 items-center my-10 opacity-10 uppercase text-black font-bold'>
              <hr className='w-1/2 border-black'/>
              <p>OR</p>
              <hr className='w-1/2 border-black'/>
            </div>
            <button className='btn-dark w-[90%] flex items-center justify-center gap-4 center' onClick={handleGoogleAuth}>
              <img src={googleIcon} alt="googleImage" className='w-5'/>
              Continue with Google
            </button>
            {
              type==='sign-in'
              ? <p className='mt-6 text-dark-grey text-xl text-center'>Dont have an account ? <Link to='/signup' className='underline text-black text-xl ml-1'>Join us today.</Link></p>
              : <p className='mt-6 text-dark-grey text-xl text-center'>Already a member ? <Link to='/signin' className='underline text-black text-xl ml-1'>Sign in here.</Link></p>

            }
        </form>
    </section>
    </AnimationWrapper>
  )
}
 
export default UserAuthForm

