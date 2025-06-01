import { Facebook, Instagram, Twitter } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='bg-blue-950 min-h-[200px]'>
      <div className='container mx-auto px-4 py-8 text-white'>
        <div className='flex flex-col sm:flex-row justify-between gap-8'>
          <div>
            <h3 className='text-xl font-semibold mb-4'>Categories</h3>
            <ul className='flex flex-col gap-3'>
              <li><Link href="/products" className="hover:text-blue-300 transition-colors">All</Link></li>
              <li><Link href="/products?category=electronics" className="hover:text-blue-300 transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=home" className="hover:text-blue-300 transition-colors">Home</Link></li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-4'>About us</h3>
            <ul className='flex flex-col gap-3'>
              <li><Link href="/about" className="hover:text-blue-300 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-300 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-4'>Follow Us</h3>
            <div className='flex gap-4'>
              <a href="#" className="hover:text-blue-300 transition-colors"><Facebook className='w-6 h-6' /></a>
              <a href="#" className="hover:text-blue-300 transition-colors"><Twitter className='w-6 h-6' /></a>
              <a href="#" className="hover:text-blue-300 transition-colors"><Instagram className='w-6 h-6' /></a>
            </div>
          </div>
        </div>
      </div>
      <div className='text-white py-4 text-center border-t border-blue-900'>
        <p>© 2024 Bytes</p>
      </div>
    </div>
  )
}

export default Footer