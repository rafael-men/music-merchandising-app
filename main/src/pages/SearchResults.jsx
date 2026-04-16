import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import { allProducts } from '../data/catalog'
import ProductCard from '../Components/ProductCard'

const parsePrice = (value) => {
  if (typeof value === 'number') return value
  if (!value) return 0
  const cleaned = String(value).replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.')
  const n = parseFloat(cleaned)
  return Number.isNaN(n) ? 0 : n
}

const SearchResults = () => {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim().toLowerCase()
  const category = params.get('category') || ''
  const minPrice = parsePrice(params.get('min'))
  const maxPrice = params.get('max') ? parsePrice(params.get('max')) : Infinity

  const results = useMemo(() => {
    return allProducts.filter((p) => {
      const matchQuery = !q || p.title.toLowerCase().includes(q)
      const matchCategory = !category || (p.categories || []).includes(category)
      const priceNum = parsePrice(p.price)
      const matchPrice = priceNum >= minPrice && priceNum <= maxPrice
      return matchQuery && matchCategory && matchPrice
    })
  }, [q, category, minPrice, maxPrice])

  const hasFilter = q || category || params.get('min') || params.get('max')

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="border-l-4 border-l-gray-500 pl-4 mb-8">
          <div className="flex items-center gap-2 mb-1">
            <SearchIcon size={14} className="text-gray-400 shrink-0" />
            <span className="text-xs text-gray-500 uppercase tracking-widest">Busca</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {q ? `Resultados para "${q}"` : 'Resultados da busca'}
          </h1>
          {hasFilter && (
            <p className="text-gray-400 text-sm mt-1">
              {category && <span className="mr-3">Categoria: <span className="text-gray-200">{category}</span></span>}
              {(params.get('min') || params.get('max')) && (
                <span>
                  Preço: R${minPrice.toFixed(0)} – {maxPrice === Infinity ? '∞' : `R$${maxPrice.toFixed(0)}`}
                </span>
              )}
            </p>
          )}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-24 text-gray-600">
            <p className="text-lg">Nenhum produto encontrado com esses filtros.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-500 mb-6">
              {results.length} {results.length === 1 ? 'produto' : 'produtos'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchResults
