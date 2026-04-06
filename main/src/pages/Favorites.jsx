import { Link } from 'react-router-dom'
import { Heart, ArrowLeft } from 'lucide-react'
import { allProducts } from '../data/catalog'
import { useFavorites } from '../hooks/useFavorites'
import ProductCard from '../Components/ProductCard'

const Favorites = () => {
  const { favorites } = useFavorites()
  const products = allProducts.filter(p => favorites.has(p.id))

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 pt-8 pb-16">

        <div className="border-l-4 border-l-red-500 pl-4 mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Heart size={14} className="text-red-400 shrink-0" />
            <span className="text-xs text-gray-500 uppercase tracking-widest">Lista</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Meus Favoritos</h1>
          <p className="text-gray-400 text-sm mt-1">Produtos que você salvou para depois.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 text-gray-600">
            <Heart size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg mb-2">Nenhum favorito ainda.</p>
            <p className="text-sm text-gray-700 mb-6">Clique no coração em qualquer produto para salvá-lo aqui.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 no-underline text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <ArrowLeft size={14} />
              Ir para a loja
            </Link>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-500 mb-6">
              {products.length} {products.length === 1 ? 'produto' : 'produtos'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Favorites
