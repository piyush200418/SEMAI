import React from 'react'
import {PricingTable} from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const Plan = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const isPremium = user?.publicMetadata?.premium === "PREMIUM";
  const handleUpgrade = () => {
    window.open('/upgrade', '_blank');
  };
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>

      <div className='text-center'>
        <h2 className='text-slate-700 text-[42px] font-semibold'>Choose Your Plan</h2>
        <p className='text-gray-500 max-w-lg mx-auto'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
      </div>

      <div className='mt-14 max-sm:mx-8'>
        {/* <PricingTable /> */}
      </div>

      {/* New Plan Cards */}
      <div className='flex flex-col md:flex-row gap-8 mt-12 justify-center items-center'>
        {/* Basic/Free Card */}
        <div className='flex-1 max-w-md bg-gray-100 dark:bg-[#23232a] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 text-center card-bubble'>
          <h3 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2'>Basic (Free)</h3>
          <p className='text-4xl font-extrabold text-primary dark:text-indigo-400 mb-4'>Free</p>
          <ul className='text-gray-700 dark:text-gray-200 text-left mb-6 space-y-2'>
            <li>✔️ AI Article Writer</li>
            <li>✔️ Blog Title Generator</li>
            <li className='text-gray-400 line-through'>AI Image Generation</li>
            <li className='text-gray-400 line-through'>Background Removal</li>
            <li className='text-gray-400 line-through'>Object Removal</li>
            <li className='text-gray-400 line-through'>Resume Reviewer</li>
          </ul>
          {(!isPremium) ? (
            <button className='bg-gray-300 text-gray-600 px-6 py-2 rounded-lg cursor-not-allowed' disabled>Current Plan</button>
          ) : (
            <button className='bg-gray-200 text-gray-400 px-6 py-2 rounded-lg cursor-not-allowed' disabled>Free Plan</button>
          )}
        </div>
        {/* Premium Card */}
        <div className='flex-1 max-w-md bg-gradient-to-br from-primary to-indigo-500 dark:from-[#5044E5] dark:to-[#23232a] text-white rounded-2xl shadow-xl p-8 text-center border-4 border-primary dark:border-indigo-700 card-bubble'>
          <h3 className='text-2xl font-bold mb-2 text-white dark:text-gray-100'>Premium</h3>
          <p className='text-4xl font-extrabold mb-4 text-white dark:text-indigo-200'>$20 <span className='text-lg font-medium'>/ month</span></p>
          <ul className='text-left mb-6 space-y-2 text-white dark:text-gray-200'>
            <li>✔️ AI Article Writer</li>
            <li>✔️ Blog Title Generator</li>
            <li>✔️ AI Image Generation</li>
            <li>✔️ Background Removal</li>
            <li>✔️ Object Removal</li>
            <li>✔️ Resume Reviewer</li>
          </ul>
          {isPremium ? (
            <button className='bg-white text-primary font-bold px-6 py-2 rounded-lg border border-white cursor-not-allowed' disabled>Current Plan</button>
          ) : (
            <button className='bg-white text-primary font-bold px-6 py-2 rounded-lg hover:bg-primary hover:text-white border border-white transition' onClick={handleUpgrade}>Upgrade to Premium</button>
          )}
        </div>
      </div>

    </div>
  )
}

export default Plan
