import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'
import { Truck, ShoppingCart, CreditCard, Heart } from 'lucide-react'
import ProductCard from '../Components/ProductCard'
import ProductImage from '../Components/ProductImage'
import { allProducts } from '../data/catalog'
import { useFavorites } from '../contexts/FavoritesContext'

const novidades = [
  {
    id: 1,
    title: 'Rotting Christ - Pro Xristou - LP 2024 - DELUXE EDITION',
    description: 'Confira o novo lançamento de Rotting Christ: Pro Xristou, um álbum épico que mistura elementos de black metal com passagens atmosféricas e progressivas. A banda grega de black metal, conhecida por suas composições densas e letras profundas, traz um trabalho imersivo e provocante.',
    imageUrl: 'https://m.media-amazon.com/images/I/81pKFRUPRnL._UF1000,1000_QL80_.jpg',
    price: 190.99,
    categories: ['Black Metal', 'Vinil'],
    purchaseInfo: 'Adquira agora no nosso site e aproveite o desconto de lançamento. Envio grátis para todo o Brasil.'
  },
  {
    id: 2,
    title: 'Lady Gaga - Born this Way CD',
    description: 'Confira o aclamado álbum "Born This Way" de Lady Gaga, um marco na música pop! Lançado em 2011, o CD traz uma mistura de pop, dance e elementos de rock, com letras poderosas sobre aceitação, liberdade e igualdade.',
    imageUrl: 'https://universalmusic.vtexassets.com/arquivos/ids/166553-800-auto?v=637637190465270000&width=800&height=auto&aspect=true',
    price: 80.00,
    categories: ['PoP', 'CDs Importados e Nacionais'],
    purchaseInfo: 'Disponível para compra digital ou física. Desconto de 10% para novos membros.'
  },
  {
    id: 3,
    title: 'Deftones - Ohms LP (Importado)',
    description: '"Ohms" é o aclamado álbum da banda Deftones, lançado em 2020, que leva os fãs a uma jornada sonora intensa e envolvente. Com uma mistura única de metal alternativo, post-hardcore e shoegaze, o álbum explora uma vasta gama de emoções.',
    imageUrl: 'https://i.discogs.com/4a6z8lXIXuT9iIhJXMnJf_XgZPHuKvaH4my6gKjPGwU/rs:fit/g:sm/q:90/h:546/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE1OTY2/ODMyLTE2MTIzODM3/NDMtNjczOC5qcGVn.jpeg',
    price: 249.50,
    categories: ['Nu Metal', 'Vinil', 'CDs Importados e Nacionais'],
    purchaseInfo: 'Aproveite o preço promocional!'
  },
  {
    id: 4,
    title: 'Motley Crue - Live Wire LP',
    description: 'Too Fast for Love é o álbum de estréia da banda de heavy metal norte-americana Mötley Crüe. Foi lançado no dia 10 de Novembro de 1981 por um selo independente da banda, a Leathür Records.',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_790484-MLB77119015932_062024-O.webp',
    price: 120.50,
    categories: ['Hard Rock', 'Vinil'],
    purchaseInfo: 'Envio rápido e seguro. Compre já.'
  }
]

const NewDetail = () => {
  const { id } = useParams()
  const [cep, setCep] = useState('')
  const [frete, setFrete] = useState(null)

  const novidade = novidades.find(nov => nov.id === parseInt(id, 10))

  const { toggle, isFavorite } = useFavorites()
  const favorited = isFavorite(novidade?.id)

  if (!novidade) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Typography className="text-gray-400 text-lg">Novidade não encontrada.</Typography>
      </div>
    )
  }

  const handleBuyNow = () => alert(`Você comprou: ${novidade.title}`)
  const handleAddToCart = () => alert(`${novidade.title} foi adicionado ao carrinho.`)
  const handleFrete = () => {
    if (!cep) { alert('Por favor, insira um CEP válido.'); return }
    setFrete(10.00)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:order-1 lg:w-2/5 bg-black flex items-center justify-center shrink-0" style={{ minHeight: '400px' }}>
              <ProductImage
                src={novidade.imageUrl}
                alt={novidade.title}
                className="w-full h-full object-contain max-h-[560px]"
              />
            </div>
            <div className="lg:order-2 lg:w-3/5 flex flex-col p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {novidade.categories.map(cat => (
                  <span key={cat} className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                    {cat}
                  </span>
                ))}
              </div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <Typography variant="h3" className="text-white font-bold text-xl sm:text-2xl leading-snug">
                  {novidade.title}
                </Typography>
                <button
                  onClick={() => toggle(novidade.id)}
                  className={`shrink-0 p-2 rounded-full border transition-all duration-200 ${
                    favorited
                      ? 'bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                      : 'bg-gray-800 border-gray-700 text-gray-500 hover:text-red-400 hover:border-red-500/50'
                  }`}
                  aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  <Heart size={18} fill={favorited ? 'currentColor' : 'none'} />
                </button>
              </div>
              <Typography variant="h2" className="text-green-400 font-bold mb-1 text-3xl">
                R$ {novidade.price.toFixed(2)}
              </Typography>

              <hr className="border-t border-gray-800 my-4" />
              <Typography className="text-gray-400 text-sm leading-relaxed mb-2">
                {novidade.description}
              </Typography>
              {novidade.purchaseInfo && (
                <Typography className="text-gray-500 text-xs mt-1 mb-6">
                  {novidade.purchaseInfo}
                </Typography>
              )}

              <hr className="border-t border-gray-800 my-4" />
              <div className="mb-6">
                <Typography className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Truck size={13} /> Calcular Frete
                </Typography>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    placeholder="Digite seu CEP"
                    maxLength={9}
                    className="flex-1 min-w-0 bg-gray-800 text-white placeholder-gray-500 border border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
                  />
                  <button
                    onClick={handleFrete}
                    className="shrink-0 bg-yellow-500 text-white font-semibold py-2 px-5 rounded-full hover:bg-yellow-400 transition-colors duration-200 text-sm"
                  >
                    Calcular
                  </button>
                </div>
                {frete !== null && (
                  <Typography className="text-green-400 text-sm mt-3">
                    Frete: <strong>R$ {frete.toFixed(2)} — SEDEX, até 2 dias úteis</strong>
                  </Typography>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  <CreditCard size={16} /> Comprar Agora
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-600 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 text-sm"
                >
                  <ShoppingCart size={16} /> Adicionar ao Carrinho
                </button>
              </div>

            </div>
          </div>
        </div>
        {(() => {
          const related = allProducts.filter(p =>
            p.categories.some(cat => novidade.categories.includes(cat))
          ).slice(0, 4)

          if (related.length === 0) return null

          return (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">Produtos Relacionados</h2>
                <span className="text-xs text-gray-500">{related.length} {related.length === 1 ? 'produto' : 'produtos'}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {related.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}

export default NewDetail
