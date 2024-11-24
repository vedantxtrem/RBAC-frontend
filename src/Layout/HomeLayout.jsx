import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function HomeLayout({childern}) {
  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-gray-300  to-amber-100'>
        <div className='fixed top-4 lg:left-4'>
            <Sidebar/>
        </div>
        {childern}
    </div>
  )
}

export default HomeLayout