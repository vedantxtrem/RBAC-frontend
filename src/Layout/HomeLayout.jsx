import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function HomeLayout({ children }) {
  return (
    <div className='w-screen min-h-screen '>
      <Sidebar/>
      { children }
    </div>
  )
}

export default HomeLayout