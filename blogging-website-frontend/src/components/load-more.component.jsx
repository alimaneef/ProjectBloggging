import React from 'react'

const LoadMoreDataBtn = ({state,fetchDataFun}) => {
  if(state!=null  && state.totalDocs>state.results.length){
    return(
        <button className='text-dark-grey p-2 px-3 bg-grey/80  rounded-md flex items-center gap-2 hover:bg-black hover:text-grey'
        onClick={()=>fetchDataFun({page : state.page+1})}
        >
            Load More
        </button>
    )
  }
}

export default LoadMoreDataBtn