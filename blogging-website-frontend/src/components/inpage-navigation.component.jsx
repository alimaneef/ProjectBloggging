import React, { useEffect, useRef, useState } from 'react'


export let activeTabLineRef;
export let activeTab;




const InPageNavigation = ({routes,defaultHidden=[],defaultActiveInd=0,children}) => {
  

let [inPageNavIndex,setinPageNavIndex]=useState(defaultActiveInd);

 activeTabLineRef=useRef();
 activeTab=useRef();

 let [isResizeEventAdded,setIsResizeEventAdded]=useState(false);

 let [width,setWidth]=useState(window.innerWidth);

const changePageState=(btn,i)=>{
    let {offsetWidth,offsetLeft}=btn;
    activeTabLineRef.current.style.width=offsetWidth+'px';
    activeTabLineRef.current.style.left=offsetLeft+'px';
    setinPageNavIndex(i);
}

useEffect(()=>{
    if(width>766 && inPageNavIndex!=defaultActiveInd){
        changePageState(activeTab.current,defaultActiveInd);
    }
    if(!isResizeEventAdded){
        window.addEventListener('resize',()=>{
            if(!isResizeEventAdded){
                setIsResizeEventAdded(true);
            }
            setWidth(window.innerWidth);
        })
    }
},[width])   

  return (
    <>
    <div className='relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto'>
        {
            routes.map((route,i)=>{
                return(
                    <button
                    ref={i==defaultActiveInd ? activeTab : null} 
                    key={i} className={'p-4 px-5 capitalize '+ (inPageNavIndex==i ? 'text-black' : 'text-dark-grey')+( defaultHidden.includes(route) ? " md:hidden" : "")}
                    onClick={(e)=>{changePageState(e.target,i)}}
                    >
                        {route}
                    </button>
                )
            })
        }
        <hr ref={activeTabLineRef} className='absolute bottom-0 duration-300 border-black'/>
    </div>
    {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  )
}

export default InPageNavigation