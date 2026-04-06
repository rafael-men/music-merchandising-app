import { useState } from 'react'
import { useParams } from 'react-router-dom'

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

  if (!novidade) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Novidade não encontrada.</p>
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
      <div className="container mx-auto max-w-2xl px-4 py-6 md:py-10">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

          <div className="w-full bg-black flex items-center justify-center" style={{ minHeight: '320px', maxHeight: '480px' }}>
            <img
              src={novidade.imageUrl}
              alt={novidade.title}
              className="max-h-[480px] w-auto max-w-full object-contain"
            />
          </div>

          <div className="p-4 sm:p-6">

       
            <div className="flex flex-wrap gap-1.5 mb-3">
              {novidade.categories.map(cat => (
                <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                  {cat}
                </span>
              ))}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-3">{novidade.title}</h2>

  
            <div className="mb-4">
              <p className="text-2xl sm:text-3xl font-bold text-green-400">
                R$ {novidade.price.toFixed(2)}
              </p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-2">{novidade.description}</p>
            <p className="text-gray-500 text-xs mb-6">{novidade.purchaseInfo}</p>

  

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
                  Frete: <strong>R$ {frete.toFixed(2)} |  SEDEX - Envio em no máximo 2 dias</strong>
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

export default NewDetail
