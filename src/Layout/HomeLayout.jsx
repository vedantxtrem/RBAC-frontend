import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function HomeLayout({childern}) {
  return (
    <div className='w-screen min-h-screen bg-gradient-to-br from-gray-300  via-gray-100 to-yellow-200'>
        <div className='fixed top-4 lg:left-4'>
            <Sidebar/>
        </div>
        {childern}
    </div>
  )
}

export default HomeLayout