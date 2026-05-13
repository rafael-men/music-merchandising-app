import { Link } from 'react-router-dom'
import { Card } from 'primereact/card'
import { Heart } from 'lucide-react'
import ProductImage from './ProductImage'
import { formatCategory } from '../utils/categories'
import { useFavorites } from '../contexts/FavoritesContext'
import { useLoginPrompt } from '../hooks/useLoginPrompt'
import LoginPromptModal from './LoginPromptModal'

const formatPrice = (value) => {
  if (typeof value === 'number') {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
  return value
}

const ProductCard = ({ product }) => {
  const { toggle, isFavorite } = useFavorites()
  const favorited = isFavorite(product.id)
  const { requireAuth, open, close, config } = useLoginPrompt()

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    requireAuth(() => toggle(product.id), {
      title: 'Faça login para favoritar',
      message: 'Você precisa estar logado para adicionar produtos aos favoritos.',
    })
  }

  return (
    <>
      <Card
        unstyled
        header={
          <div className="relative bg-black w-full overflow-hidden aspect-square">
            <ProductImage
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <button
              type="button"
              onClick={handleFavorite}
              aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              className={`absolute top-2 right-2 p-1.5 rounded-full border backdrop-blur-sm transition-all duration-200 ${
                favorited
                  ? 'bg-red-500/30 border-red-500/60 text-red-400 hover:bg-red-500/40'
                  : 'bg-black/50 border-white/20 text-gray-300 hover:text-red-400 hover:border-red-500/50'
              }`}
            >
              <Heart size={14} fill={favorited ? 'currentColor' : 'none'} />
            </button>
          </div>
        }
        footer={
          <Link
            to={`/produto/${product.id}`}
            className="block text-center no-underline text-[11px] font-medium bg-white text-black py-1.5 px-3 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            Ver Detalhes
          </Link>
        }
        pt={{
          root:    { className: 'group h-full flex flex-col rounded-xl border border-gray-800 bg-gray-900 overflow-hidden hover:border-gray-600 hover:shadow-lg hover:shadow-black/50 hover:-translate-y-0.5 transition-all duration-300 cursor-default' },
          body:    { className: 'flex flex-col flex-1 p-2.5 sm:p-3' },
          content: { className: 'flex flex-col flex-1 p-0' },
          footer:  { className: 'pt-2.5 mt-auto' },
        }}
      >
        <div className="flex flex-wrap gap-1 mb-1.5">
          {product.categories.slice(0, 3).map((cat) => (
            <span key={cat} className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700 transition-colors duration-150">
              {formatCategory(cat)}
            </span>
          ))}
        </div>
        <p className="text-[13px] font-semibold text-gray-100 leading-snug mb-1.5 line-clamp-2">{product.title}</p>
        <p className="text-sm font-bold text-green-400 mt-auto">{formatPrice(product.price)}</p>
      </Card>

      <LoginPromptModal visible={open} onHide={close} {...config} />
    </>
  )
}

export default ProductCard
