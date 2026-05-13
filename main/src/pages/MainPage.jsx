import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Hero from '../Components/Hero'
import ProductCard from '../Components/ProductCard'
import { productsApi } from '../api/products'
import { extractErrorMessage } from '../api/client'

const sections = [
  { key: 'NEW_ARRIVALS', title: 'Recém Chegados',          fallbackCategories: ['NEW_ARRIVALS'] },
  { key: 'DEATH_METAL',  title: 'Baseado no que você viu', fallbackCategories: ['DEATH_METAL', 'BLACK_METAL'] },
  { key: 'DAILY_DEALS',  title: 'Ofertas da Semana',        fallbackCategories: ['DAILY_DEALS'] },
]

const groupProducts = (products) => {
  const groups = {}
  for (const section of sections) {
    groups[section.key] = products.filter((p) =>
      (p.categories || []).some((c) => section.fallbackCategories.includes(c))
    )
  }
  // Se uma seção não tiver produtos, mostra os primeiros do catálogo
  for (const section of sections) {
    if (groups[section.key].length === 0) {
      groups[section.key] = products.slice(0, 8)
    }
  }
  return groups
}

const MainPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    productsApi
      .list()
      .then((data) => {
        if (!cancelled) setProducts(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (!cancelled) setError(extractErrorMessage(err, 'Não foi possível carregar os produtos.'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const groups = groupProducts(products)

  const renderCarousel = ({ key, title }) => {
    const items = groups[key] || []
    if (items.length === 0) return null
    return (
      <section key={key} className="mb-14 mt-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <Link to="/" className="text-xs text-gray-500 hover:text-gray-300 no-underline transition-colors duration-200">
            Ver todos →
          </Link>
        </div>
        <div className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {items.map((product) => (
            <div key={product.id} className="snap-start shrink-0 w-52 sm:w-48 md:w-52 flex">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Hero />
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Bem-vindo à Music Store</h1>
          <p className="text-gray-400 text-sm sm:text-base">A melhor loja de artigos musicais</p>
        </div>

        {loading && (
          <div className="text-center py-20 text-gray-500">Carregando produtos...</div>
        )}

        {error && !loading && (
          <div className="bg-red-900/20 border border-red-900/40 rounded-xl p-6 text-center text-red-300 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20 text-gray-500 text-sm">
            Nenhum produto cadastrado no momento.
          </div>
        )}

        {!loading && !error && products.length > 0 && sections.map(renderCarousel)}
      </div>
    </div>
  )
}

export default MainPage
