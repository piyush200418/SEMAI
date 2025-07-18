import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Moon, Sun, ArrowRight } from 'lucide-react'
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'

const NIGHT_MODE_CLASS = 'dark';

const Navbar = () => {

    const navigate = useNavigate()
    const {user} = useUser()
    const { openSignIn } = useClerk()

    // Night mode state
    const [nightMode, setNightMode] = useState(() => {
      return localStorage.getItem('nightMode') === 'true';
    });

    useEffect(() => {
      if (nightMode) {
        document.documentElement.classList.add(NIGHT_MODE_CLASS);
      } else {
        document.documentElement.classList.remove(NIGHT_MODE_CLASS);
      }
      localStorage.setItem('nightMode', nightMode);
    }, [nightMode]);

  const isPremium = user?.publicMetadata?.premium === "PREMIUM";

  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-0 px-4 sm:px-20 xl:px-32 min-h-[72px]'>
      <img src={assets.logo} alt="logo" className='h-28 w-auto max-h-36 object-contain cursor-pointer my-0 logo-glow' onClick={()=> navigate('/')}/>

      <div className='flex items-center gap-3'>
        {/* Night mode toggle */}
        <button
          onClick={() => setNightMode((prev) => !prev)}
          className={`p-2 rounded-full border-none bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center`}
          title={nightMode ? 'Switch to Light Mode' : 'Switch to Night Mode'}
        >
          {nightMode ? <Sun className='w-6 h-6 text-yellow-400' /> : <Moon className='w-6 h-6 text-gray-700' />}
        </button>
        {/* Upgrade to Premium or Premium badge */}
        {user && (
          isPremium ? (
            <span className='bg-gradient-to-r from-primary to-indigo-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow'>Premium</span>
          ) : (
            <button
              onClick={() => window.open('/upgrade', '_blank')}
              className='bg-gradient-to-r from-primary to-indigo-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow hover:scale-105 transition'
            >
              Upgrade to Premium
            </button>
          )
        )}
        {/* User/Login button */}
        {
          user ? <UserButton /> 
          : (
            <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Get started <ArrowRight className='w-4 h-4'/> </button>
          )
        }
      </div>

      
    </div>
  )
}

export default Navbar
