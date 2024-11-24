import React from 'react'
import HomeLayout from '../Layout/HomeLayout'
import UserTable from '../components/UserTable'

function HomePage() {
  return (
    <HomeLayout>
      <div className='w-full min-h-screen flex flex-col justify-items-center bg-gradient-to-r from-gray-300  to-amber-100'>
        {/* <UserTable/> */}
      </div>
    </HomeLayout>
  )
}

export default HomePage