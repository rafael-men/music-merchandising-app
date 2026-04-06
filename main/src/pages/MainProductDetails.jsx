import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'
import { Truck, ShoppingCart, CreditCard, Heart } from 'lucide-react'
import StockBadge from '../Components/StockBadge'
import ProductCard from '../Components/ProductCard'
import { allProducts } from '../data/catalog'
import { useFavorites } from '../hooks/useFavorites'

const products = {
  deathMetal: [
    {
      id: 1,
      title: 'Heartwork - Carcass LP Nacional',
      description: 'O "Heartwork" é um dos álbuns mais icônicos do Carcass, uma das bandas mais influentes do death metal. Lançado em 1993, é o quarto álbum da banda, e combina a agressividade do death metal com elementos melódicos e técnicos. A obra é reconhecida pela sua complexidade musical e pelos temas líricos profundos sobre morte, desolação e guerra.',
      price: 200.90,
      stock: 4,
      categories: ['Death Metal', 'Vinil'],
      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_816736-MLU69233686551_052023-O.webp',
    },
    {
      id: 2,
      title: 'Death - Symbolic CD (Importado)',
      description: 'Lançado em 1995, "Symbolic" é um marco na história do death metal. O álbum mistura death metal técnico com complexidade musical e letras filosóficas sobre temas como a vida após a morte e a busca por significado.',
      price: 99.90,
      stock: 11,
      categories: ['Death Metal', 'CDs Importados e Nacionais'],
      imageUrl: 'https://cdn.awsli.com.br/600x450/2279/2279925/produto/257499513/death-b3851sy7d1.jpg',
    },
    {
      id: 3,
      title: 'Krisiun - Mortem Solis CD Nacional',
      description: 'Lançado em 2020, "Mortem Solis" é a obra mais brutal da banda Krisiun. A banda brasileira mantém sua tradição de death metal extremo com riffs rápidos, baterias intensas e vocais agressivos.',
      price: 49.90,
      stock: 7,
      categories: ['Death Metal', 'CDs Importados e Nacionais', 'Brasileira'],
      imageUrl: 'https://static.wixstatic.com/media/ab529c_e743828cc7b14f9b9d1d342bf3410c84~mv2.jpeg/v1/fill/w_480,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ab529c_e743828cc7b14f9b9d1d342bf3410c84~mv2.jpeg',
    },
    {
      id: 4,
      title: 'Obituary - Slowly we Rot LP Box Set (Importado)',
      description: 'Edição especial em box set do primeiro álbum do Obituary, um clássico do death metal. "Slowly We Rot", lançado em 1989, foi um dos álbuns responsáveis por definir o som do death metal.',
      price: 420.90,
      stock: 2,
      categories: ['Death Metal', 'Vinil', 'CDs Importados e Nacionais'],
      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_827999-MLU78485203730_082024-O.webp',
    },
  ],
  recentArrivals: [
    {
      id: 5,
      title: 'Around the Fur - Deftones LP (Importado)',
      description: 'Lançado em 1997, "Around the Fur" ajudou a consolidar o Deftones como uma das principais bandas do nu metal. O álbum apresenta uma mistura única de metal alternativo e elementos experimentais.',
      price: 240.90,
      stock: 5,
      categories: ['Nu Metal', 'Vinil', 'CDs Importados e Nacionais'],
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO777cx1M5eBPYwCazHF0UwgZFR6jpbLLK3w&s',
    },
    {
      id: 6,
      title: '21 - Adele CD Deluxe Edition (Importado)',
      description: 'A edição deluxe do aclamado álbum "21" da cantora Adele, com faixas extras e material especial. Lançado em 2011, o álbum apresenta um mix de soul, pop e blues.',
      price: 79.90,
      stock: 20,
      categories: ['PoP', 'CDs Importados e Nacionais'],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/c/cf/Capa_de_21_por_Adele.jpg',
    },
    {
      id: 7,
      title: 'IV - Led Zeppelin Deluxe Edition LP (Importado)',
      description: 'A versão deluxe do álbum IV do Led Zeppelin, lançado em 1971, traz faixas inéditas e material exclusivo. O álbum é considerado uma obra-prima do rock.',
      price: 520.90,
      stock: 3,
      categories: ['Vinil', 'CDs Importados e Nacionais'],
      imageUrl: 'https://s3.amazonaws.com/img.iluria.com/product/57C531/D60CF1/450xN.jpg',
    },
    {
      id: 8,
      title: 'Aladdin Sane - David Bowie LP',
      description: '"Aladdin Sane", lançado em 1973, é um dos álbuns mais importantes da carreira de David Bowie. O disco combina o glam rock com elementos do rock progressivo e experimental.',
      price: 350.90,
      stock: 6,
      categories: ['Vinil', 'CDs Importados e Nacionais'],
      imageUrl: 'https://m.media-amazon.com/images/I/51hr7--+F0L._UF1000,1000_QL80_.jpg',
    },
  ],
  dailyDeals: [
    {
      id: 9,
      title: 'Kit LP Kid A e Amnesiac - Radiohead (Importado)',
      description: 'Kit especial com dois álbuns do Radiohead, "Kid A" e "Amnesiac", considerados marcos da música alternativa e experimental.',
      price: 420.90,
      stock: 1,
      categories: ['Vinil', 'CDs Importados e Nacionais'],
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-IJPe1aWbqv1KV2PXyphU8tXvOZz0u6M4Jg&s',
    },
    {
      id: 10,
      title: 'Camisa Incubus Algodão/Poliéster Preta',
      description: 'Camisa oficial da banda Incubus, feita com material de alta qualidade (algodão e poliéster). Com um design moderno e confortável, é a escolha perfeita para os fãs da banda.',
      price: 69.90,
      stock: 15,
      categories: ['Produtos Licenciados'],
      imageUrl: 'https://cdn.sistemawbuy.com.br/arquivos/fdf6db8ff6d86b98ed526de6142068e6/produtos/66a1678c517bf/incubus-66cf1bb312ba8.jpg',
    },
    {
      id: 11,
      title: 'Boné Suicidal Tendencies Original',
      description: 'Boné oficial da banda Suicidal Tendencies, com logo bordado. Estilo clássico, confortável e perfeito para o dia a dia.',
      price: 50.90,
      stock: 8,
      categories: ['Produtos Licenciados'],
      imageUrl: 'https://s3.amazonaws.com/img.iluria.com/product/8C2994/16110F9/450xN.jpg',
    },
    {
      id: 12,
      title: 'Rammstein - Mutter CD Nacional',
      description: 'O "Mutter" é o álbum da banda Rammstein que consolidou sua identidade no metal industrial. Lançado em 2001, o disco traz faixas poderosas e provocativas.',
      price: 35.50,
      stock: 0,
      categories: ['CDs Importados e Nacionais'],
      imageUrl: 'https://akamai.sscdn.co/letras/360x360/albuns/4/f/8/6/14648.jpg',
    },
  ],
}

const ProductDetails = () => {
  const { id } = useParams()
  const [cep, setCep] = useState('')
  const [frete, setFrete] = useState(null)

  const findProductById = () => {
    for (const category in products) {
      const product = products[category].find(item => item.id === parseInt(id, 10))
      if (product) return product
    }
    return null
  }

  const product = findProductById()

  useEffect(() => {
    if (!product) return
    const prev = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
    const updated = [product.id, ...prev.filter((i) => i !== product.id)].slice(0, 20)
    localStorage.setItem('recentlyViewed', JSON.stringify(updated))
  }, [product])

  const { toggle, isFavorite } = useFavorites()
  const favorited = isFavorite(product?.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Produto não catalogado.</p>
      </div>
    )
  }

  const handleBuyNow = () => alert(`Você comprou: ${product.title}`)
  const handleAddToCart = () => alert(`${product.title} foi adicionado ao carrinho.`)
  const handleFrete = () => {
    if (!cep || cep.length < 8) { alert('Por favor, insira um CEP válido.'); return }
    setFrete(15.0)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:order-1 lg:w-2/5 bg-black flex items-center justify-center shrink-0" style={{ minHeight: '400px' }}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-contain max-h-[560px]"
              />
            </div>
            <div className="lg:order-2 lg:w-3/5 flex flex-col p-6 md:p-8">

              <div className="flex flex-wrap gap-2 mb-4">
                {product.categories.map(cat => (
                  <span key={cat} className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                    {cat}
                  </span>
                ))}
              </div>

              <div className="flex items-start justify-between gap-3 mb-3">
                <Typography variant="h3" className="text-white font-bold text-xl sm:text-2xl leading-snug">
                  {product.title}
                </Typography>
                <button
                  onClick={() => toggle(product.id)}
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

              <Typography variant="h2" className="text-green-400 font-bold mb-3 text-3xl">
                R$ {product.price.toFixed(2)}
              </Typography>

              <div className="mb-4">
                <StockBadge stock={product.stock} showLabel />
              </div>

              <hr className="border-t border-gray-800 my-4" />

              <Typography className="text-gray-400 text-sm leading-relaxed mb-6">
                {product.description}
              </Typography>

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
            p.id !== product.id &&
            p.categories.some(cat => product.categories.includes(cat))
          ).slice(0, 4)

          if (related.length === 0) return null

          return (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">Produtos Relacionados</h2>
                <span className="text-xs text-gray-500">{related.length} {related.length === 1 ? 'produto' : 'produtos'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

export default ProductDetails