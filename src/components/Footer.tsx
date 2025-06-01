import { Facebook, Instagram, Twitter } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-950'>
    <div className=' container mx-auto p-4 mt-5 text-white flex justify-between '>
        <div>
            <h3 className='text-xl font-semibold'>Filters</h3>
            <ul className='mt-4 flex flex-col gap-2'>
                <li>All</li>
                <li>Electronics</li>
                <li>Home</li>
            </ul>
        </div>
        <div>
            <h3 className='text-xl font-semibold'>About us</h3>
            <ul className='mt-4 flex flex-col gap-2'>
                <li>About Us</li>
                <li>Contact</li>
            </ul>
        </div>
        <div>
            <h3 className='text-xl font-semibold'>Follow Us</h3>
            <div className='flex gap-3 mt-4'>
                <Facebook  className=''/>
                <Twitter className='' />
                <Instagram  className=''/>
            </div>
        </div>
    </div>
    <div className=' text-white pb-3 text-center'>
        <p>© 2024 American</p>
        </div>
    </div>
  )
}

export default Footer