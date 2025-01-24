import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Assets/logo.png'
import Cart from '../Assets/Cart.png'
import Profile from '../Assets/Profile.png'


const Navbar = () => {
  const [isMobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => {
    setMobileOpen(!isMobileOpen);
  }

  return (
    <div className='text-white bg-black p-2'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-2xl font-bold flex items-center no-underline text-white'>
          <h1>Music Store</h1> 
          <img src={Logo} alt='logo' className='w-10 h-10 mr-2 p-2'/>
        </Link>
        <div className='hidden md:flex space-x-6 items-center'>
        <Link to="/carrinho" className='block text-center text-lg no-underline hover:text-gray-400  text-white'>Carrinho</Link>
        <img src={Cart} alt="Cart" className='w-4'/>
        <Link to="/perfil" className='block text-center text-lg no-underline hover:text-gray-400  text-white'>Rafael</Link>
        <img src={Profile} alt="Cart" className='w-4'/>
        </div>
        <button className='md:hidden text-2xl' onClick={toggleMenu}>
          {isMobileOpen ? 'x' : '☰'}
        </button>
      </div>
      {isMobileOpen && (
        <div className="mt-4 md:hidden space-y-4">
          <Link to="/carrinho" className='block no-underline text-center text-white text-lg hover:text-gray-400'>Carrinho</Link>
          <Link to="/perfil" className='block  no-underline text-center text-lg text-white hover:text-gray-400'>Rafael</Link>
        </div>
      )}
    </div>
  )
}

export default Navbar;
