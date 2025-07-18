import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X, Moon, Sun } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import {SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const {user} = useUser()
  const isPremium = user?.publicMetadata?.premium === "PREMIUM";

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>

      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
        <img className='cursor-pointer h-28 w-auto max-h-36 object-contain my-0 logo-glow' src={assets.logo} alt="logo" onClick={()=>navigate('/')} />
        <div className='flex items-center gap-3'>
          {/* Night mode toggle */}
          <NightModeButton />
          {/* Upgrade to Premium or Premium badge */}
          {user && (
            isPremium ? (
              <span className='bg-gradient-to-r from-primary to-indigo-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow'>Premium</span>
            ) : (
              <button
                onClick={() => window.open('/upgrade', '_blank')}
                className='bg-primary text-white px-6 py-2 rounded-full font-semibold text-sm shadow hover:scale-105 transition dark:bg-gradient-to-r dark:from-[#5044E5] dark:to-[#23232a] dark:text-white'
              >
                Upgrade to Premium
              </button>
            )
          )}
          {/* Sidebar menu icons */}
          {sidebar ? <X onClick={()=> setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden'/>
          : <Menu onClick={()=> setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden'/>}
        </div>
      </nav>
      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
          <div className='flex-1 bg-[#F4F7FB] dark:bg-[#18181b]' style={{backgroundColor: 'var(--bg-color, #F4F7FB)'}}>
            <Outlet />
          </div>
      </div>
      
      
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}

// Night mode button as a component for reuse
function NightModeButton() {
  const [nightMode, setNightMode] = useState(() => {
    return localStorage.getItem('nightMode') === 'true';
  });
  useEffect(() => {
    if (nightMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('nightMode', nightMode);
  }, [nightMode]);
  return (
    <button
      onClick={() => setNightMode((prev) => !prev)}
      className={`p-2 rounded-full border-none bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center`}
      title={nightMode ? 'Switch to Light Mode' : 'Switch to Night Mode'}
    >
      {nightMode ? <Sun className='w-6 h-6 text-yellow-400' /> : <Moon className='w-6 h-6 text-gray-700' />}
    </button>
  );
}

export default Layout
