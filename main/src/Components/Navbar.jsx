import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, Music2, Menu, X, Heart, Search } from 'lucide-react'
import SearchBar from './SearchBar'

const Navbar = () => {
  const [isMobileOpen, setMobileOpen] = useState(false)
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false)

  return (
    <nav className='text-white bg-black border-b border-gray-800 sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center gap-4'>
        <Link to='/' className='flex items-center gap-2 no-underline text-white group shrink-0'>
          <Music2 size={22} className='text-white' />
          <span className='text-xl font-bold tracking-wide group-hover:text-gray-300 transition-colors duration-200 hidden sm:inline'>Music Store</span>
        </Link>

        <div className='hidden md:block flex-1 max-w-xl'>
          <SearchBar />
        </div>

        <div className='hidden md:flex items-center gap-6 shrink-0'>
          <Link to="/favoritos" className='flex items-center gap-2 text-sm font-medium no-underline text-gray-300 hover:text-white transition-colors duration-200'>
            <Heart size={18} />
            <span>Favoritos</span>
          </Link>
          <Link to="/carrinho" className='flex items-center gap-2 text-sm font-medium no-underline text-gray-300 hover:text-white transition-colors duration-200'>
            <ShoppingCart size={18} />
            <span>Carrinho</span>
          </Link>
          <Link to="/perfil" className='flex items-center gap-2 text-sm font-medium no-underline text-gray-300 hover:text-white transition-colors duration-200'>
            <User size={18} />
            <span>Rafael</span>
          </Link>
        </div>

        <div className='flex items-center gap-2 md:hidden'>
          <button
            className='text-gray-300 hover:text-white transition-colors p-1'
            onClick={() => { setMobileSearchOpen((v) => !v); setMobileOpen(false) }}
            aria-label="Buscar"
          >
            {isMobileSearchOpen ? <X size={22} /> : <Search size={22} />}
          </button>
          <button
            className='text-gray-300 hover:text-white transition-colors p-1'
            onClick={() => { setMobileOpen((v) => !v); setMobileSearchOpen(false) }}
            aria-label="Menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileSearchOpen && (
        <div className="border-t border-gray-800 p-3 md:hidden">
          <SearchBar onSubmit={() => setMobileSearchOpen(false)} />
        </div>
      )}

      {isMobileOpen && (
        <div className="border-t border-gray-800 py-3 md:hidden">
          <Link to="/favoritos" className='flex items-center justify-center gap-2 py-2 no-underline text-gray-300 hover:text-white transition-colors'>
            <Heart size={16} />
            <span>Favoritos</span>
          </Link>
          <Link to="/carrinho" className='flex items-center justify-center gap-2 py-2 no-underline text-gray-300 hover:text-white transition-colors'>
            <ShoppingCart size={16} />
            <span>Carrinho</span>
          </Link>
          <Link to="/perfil" className='flex items-center justify-center gap-2 py-2 no-underline text-gray-300 hover:text-white transition-colors'>
            <User size={16} />
            <span>Rafael</span>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
