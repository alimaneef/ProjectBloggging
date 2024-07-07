import React, { useContext } from 'react'
import pageNotFoundImageDark from '../imgs/404-dark.png'
import pageNotFoundImageLight from '../imgs/404-light.png'
import { Link } from 'react-router-dom'
import fullLogo from '../imgs/full-logo.png'
import fullLogoDark from '../imgs/full-logo-dark.png'
import fullLogoLight from '../imgs/full-logo-light.png'
import { ThemeContext } from '../App'

const PageNotFound = () => {

  let {theme,setTheme}=useContext(ThemeContext);
  return (
    <section className='h-cover relative p-10 flex flex-col items-center gap-14 text-center'>
        
        <img src={theme=='light' ? pageNotFoundImageDark : pageNotFoundImageLight} alt="404 Not Found!" className='select-none border-2 border-grey w-72 aspect-square object-cover rounded-full' />
        
        <h1 className='text-4xl font-gelasio leading-7'>Page Not Found</h1>
        <p className='text-dark-grey text-xl leading-7 -mt-8'>The page you are looking for does not exist, head back to the <Link to='/' className='    text-purple/70 underline font-semibold pb-[2px]'>Home Page</Link></p>

        
        <div className='mt-auto'>
            <img src={theme=='light' ? fullLogoDark : fullLogoLight} alt="Logo" className='h-8 object-contain block mx-auto select-none'/>
            <p className='mt-5 text-dark-grey'>Read millions of stories from around the world</p>
        </div>
    </section>
  )
}

export default PageNotFound