import React from 'react'
import  Navbar  from '../layout/Navbar'
const Test = () => {
  const [page, setPage] = React.useState(false)
  const changePage = () => {
     setPage(!page)
  }
  return (
    <div className='flex flex-col h-screen '>
      {/* navbar */}
    <Navbar />
    <div className='display flex w-[100%] justify-center items-center h-[100%]' >  
      {page &&
      <div className='flex flex-col w-[300px] h-[300px] bg-gray-400 '>
        <div>page1</div>
        <button className='bg-red-400 rounded-lg p-2' onClick={changePage}>chagepage</button>
      </div>
      }
      {!page && <div className='flex flex-col w-[300px] h-[300px] bg-gray-400 '>
        <div>page2</div>
        <button className='bg-red-400 rounded-lg p-2' onClick={changePage}>chagepage</button>
      </div>}
    </div>
    </div>
  )
}

export default Test
