import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import StockBadge from '../Components/StockBadge'

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
  }, [product?.id])

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
      <div className="container mx-auto max-w-2xl px-4 py-6 md:py-10">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

          <div className="w-full bg-black flex items-center justify-center" style={{ minHeight: '320px', maxHeight: '480px' }}>
            <img
              src={product.imageUrl}
              alt={product.title}
              className="max-h-[480px] w-auto max-w-full object-contain"
            />
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.categories.map(cat => (
                <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                  {cat}
                </span>
              ))}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-3">{product.title}</h2>

            <div className="mb-4">
              <p className="text-2xl sm:text-3xl font-bold text-green-400">
                R$ {product.price.toFixed(2)}
              </p>
            </div>

            <div className="mb-4">
              <StockBadge stock={product.stock} showLabel />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">{product.description}</p>

            <div className="bg-gray-800 rounded-xl p-4 mb-6">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Calcular Frete
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="Digite seu CEP"
                  maxLength={9}
                  className="flex-1 min-w-0 bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                />
                <button
                  onClick={handleFrete}
                  className="shrink-0 bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors duration-200 text-sm"
                >
                  Calcular
                </button>
              </div>
              {frete !== null && (
                <p className="text-green-400 text-sm mt-3">
                  Frete: <strong>R$ {frete.toFixed(2)}</strong>
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors duration-200 text-sm"
              >
                Comprar Agora
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-800 text-white font-semibold py-3 rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors duration-200 text-sm"
              >
                Adicionar ao Carrinho
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails