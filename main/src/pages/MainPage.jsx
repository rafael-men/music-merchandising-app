import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Hero from '../Components/Hero'
import StockBadge from '../Components/StockBadge'

const products = {
  deathMetal: [
    { id: 1,  title: 'Heartwork - Carcass LP Nacional',                 price: 'R$ 200,90', stock: 4,  categories: ['Death Metal', 'Vinil'],                                   imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_816736-MLU69233686551_052023-O.webp' },
    { id: 2,  title: 'Death - Symbolic CD (Importado)',                  price: 'R$ 99,90',  stock: 11, categories: ['Death Metal', 'CDs Importados e Nacionais'],               imageUrl: 'https://cdn.awsli.com.br/600x450/2279/2279925/produto/257499513/death-b3851sy7d1.jpg' },
    { id: 3,  title: 'Krisiun - Mortem Solis CD Nacional',               price: 'R$ 49,90',  stock: 7,  categories: ['Death Metal', 'CDs Importados e Nacionais', 'Brasileira'], imageUrl: 'https://static.wixstatic.com/media/ab529c_e743828cc7b14f9b9d1d342bf3410c84~mv2.jpeg/v1/fill/w_480,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ab529c_e743828cc7b14f9b9d1d342bf3410c84~mv2.jpeg' },
    { id: 4,  title: 'Obituary - Slowly we Rot LP Box Set (Importado)', price: 'R$ 420,90', stock: 2,  categories: ['Death Metal', 'Vinil', 'CDs Importados e Nacionais'],      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_827999-MLU78485203730_082024-O.webp' },
  ],
  recentArrivals: [
    { id: 5,  title: 'Around the Fur - Deftones LP (Importado)',        price: 'R$ 240,90', stock: 5,  categories: ['Nu Metal', 'Vinil', 'CDs Importados e Nacionais'],          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO777cx1M5eBPYwCazHF0UwgZFR6jpbLLK3w&s' },
    { id: 6,  title: '21 - Adele CD Deluxe Edition (Importado)',        price: 'R$ 79,90',  stock: 20, categories: ['PoP', 'CDs Importados e Nacionais'],                        imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/c/cf/Capa_de_21_por_Adele.jpg' },
    { id: 7,  title: 'IV - Led Zeppelin Deluxe Edition LP (Importado)', price: 'R$ 520,90', stock: 3,  categories: ['Vinil', 'CDs Importados e Nacionais'],                     imageUrl: 'https://s3.amazonaws.com/img.iluria.com/product/57C531/D60CF1/450xN.jpg' },
    { id: 8,  title: 'Aladdin Sane - David Bowie LP',                   price: 'R$ 350,90', stock: 6,  categories: ['Vinil', 'CDs Importados e Nacionais'],                     imageUrl: 'https://m.media-amazon.com/images/I/51hr7--+F0L._UF1000,1000_QL80_.jpg' },
  ],
  dailyDeals: [
    { id: 9,  title: 'Kit LP Kid A e Amnesiac - Radiohead (Importado)', price: 'R$ 420,90', stock: 1,  categories: ['Vinil', 'CDs Importados e Nacionais'],  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-IJPe1aWbqv1KV2PXyphU8tXvOZz0u6M4Jg&s' },
    { id: 10, title: 'Camisa Incubus Algodão/Poliéster Preta',          price: 'R$ 69,90',  stock: 15, categories: ['Produtos Licenciados'],                  imageUrl: 'https://cdn.sistemawbuy.com.br/arquivos/fdf6db8ff6d86b98ed526de6142068e6/produtos/66a1678c517bf/incubus-66cf1bb312ba8.jpg' },
    { id: 11, title: 'Boné Suicidal Tendencies Original',               price: 'R$ 50,90',  stock: 8,  categories: ['Produtos Licenciados'],                  imageUrl: 'https://s3.amazonaws.com/img.iluria.com/product/8C2994/16110F9/450xN.jpg' },
    { id: 12, title: 'Rammstein - Mutter CD Nacional',                  price: 'R$ 35,50',  stock: 0,  categories: ['CDs Importados e Nacionais'],            imageUrl: 'https://akamai.sscdn.co/letras/360x360/albuns/4/f/8/6/14648.jpg' },
  ],
}

const sectionConfig = {
  deathMetal:     { title: 'Baseado no que você viu', accent: 'text-white' },
  recentArrivals: { title: 'Recém Chegados',          accent: 'text-white' },
  dailyDeals:     { title: 'Ofertas da Semana',        accent: 'text-white' },
}

const ProductCard = ({ product }) => (
  <div className="snap-start shrink-0 w-44 sm:w-52 md:w-60 group">
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-black/40 hover:-translate-y-0.5 flex flex-col h-full">
      <div className="overflow-hidden h-40 sm:h-44 md:h-52 shrink-0">
        <img
          src={product.imageUrl}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={product.title}
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1 mb-2">
          {product.categories.map((cat) => (
            <button key={cat} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-200 transition-colors duration-150 cursor-pointer">
              {cat}
            </button>
          ))}
        </div>
        <h5 className="text-sm font-semibold text-gray-100 leading-snug mb-2 line-clamp-2">{product.title}</h5>
        <div className="mt-auto">
          <p className="text-base font-bold text-green-400 mb-1">{product.price}</p>
          <div className="mb-3">
            <StockBadge stock={product.stock} />
          </div>
          <Link
            to={`/produto/${product.id}`}
            className="block text-center no-underline text-xs font-medium bg-white text-black py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  </div>
)

const renderCarousel = (category) => {
  const { title, accent } = sectionConfig[category]
  return (
    <section key={category} className="mb-14 mt-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className={`text-xl font-bold ${accent}`}>{title}</h2>
        <Link to="/" className="text-xs text-gray-500 hover:text-gray-300 no-underline transition-colors duration-200">
          Ver todos →
        </Link>
      </div>
      <div className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {products[category].map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

const MainPage = () => (
  <div className="min-h-screen bg-gray-950">
    <div className="container mx-auto px-4 pt-6 md:pt-10 pb-16">
      <div className="text-center mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Bem-vindo à Music Store</h1>
        <p className="text-gray-400 text-sm sm:text-base">A melhor loja de artigos musicais</p>
      </div>
      <Hero />
      {renderCarousel('deathMetal')}
      {renderCarousel('recentArrivals')}
      {renderCarousel('dailyDeals')}
    </div>
  </div>
)

export default MainPage
