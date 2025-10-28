import React from 'react'
import { assets } from '../../assets/assets'
import {Link} from "react-router-dom"

const AdminNavBar = () => {
  return (
      <div className='flex items-center justify-between px-6 md:px-10 border-b border-gray-300/30 h-16'>
           <Link to="\">
              <img src={assets.logo} alt="logo" className='w-36 h-auto' />
           </Link>
      </div>
  )
}

export default AdminNavBar