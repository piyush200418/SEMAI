import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {

    const navigate = useNavigate()

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>

        <div className='text-center mb-2'>
          <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>Create Amazing Content with AI</h1>
          <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>Transform your content creation with our all-in-one suite of AI tools.<br/>Write articles, generate images, and supercharge your workflow — all in one place.</p>
        </div>

        <div className='flex flex-col items-center gap-3 mt-4 mx-auto text-gray-600'>
          <img src={assets.user_group} alt='' className='h-32 mb-2'/>
          <ul className='text-base sm:text-lg text-gray-700 space-y-1 mb-2'>
            <li>✅ Trusted by 100+ creators</li>
            <li>✅ Easy to use, fast, and reliable</li>
            <li>✅ Built to enhance creativity</li>
          </ul>
          <button onClick={()=> navigate('/ai')} className='bg-primary text-white px-10 py-3 rounded-full hover:scale-102 active:scale-95 transition cursor-pointer mx-auto text-lg font-semibold'>Explore Now</button>
          <p className='mt-4 text-gray-600 text-base sm:text-lg'>Jump into the tools that are redefining content creation.</p>
        </div>
      
    </div>
  )
}

export default Hero
