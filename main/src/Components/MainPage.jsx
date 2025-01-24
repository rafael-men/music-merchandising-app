import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Hero from './Hero'

//tipos da página

const products = {
  deathMetal: [
    {
      id: 1,
      title: 'Heartwork - Carcass LP Nacional',
      price: 'R$ 200,90',
      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_816736-MLU69233686551_052023-O.webp',
    },
    {
      id: 2,
      title: 'Death - Symbolic CD (Importado)',
      price: 'R$ 99,90',
      imageUrl: 'https://cdn.awsli.com.br/600x450/2279/2279925/produto/257499513/death-b3851sy7d1.jpg',
    },
    {
      id: 3,
      title: 'Krisiun - Mortem Solis CD Nacional',
      price: 'R$ 49,90',
      imageUrl: 'https://static.wixstatic.com/media/ab529c_e743828cc7b14f9b9d1d342bf3410c84~mv2.jpeg/v1/fill/w_480,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ab529c_e743828cc7b14f9b9d1d342bf3410c84~mv2.jpeg',
    },
    {
      id: 4,
      title: 'Obituary - Slowly we Rot LP Box Set (Importado)',
      price: 'R$ 420,90',
      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_827999-MLU78485203730_082024-O.webp',
    },
  ],
  recentArrivals: [
    {
      id: 5,
      title: 'Around the Fur - Deftones LP (Importado)',
      price: 'R$ 240,90',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO777cx1M5eBPYwCazHF0UwgZFR6jpbLLK3w&s',
    },
    {
      id: 6,
      title: '21 - Adele CD Deluxe Edition (Importado)',
      price: 'R$ 79,90',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/c/cf/Capa_de_21_por_Adele.jpg',
    },
    {
      id: 7,
      title: 'IV - Led Zeppelin Deluxe Edition LP (Importado)',
      price: 'R$ 520,90',
      imageUrl: 'https://s3.amazonaws.com/img.iluria.com/product/57C531/D60CF1/450xN.jpg',
    },
    {
      id: 8,
      title: 'Aladdin Sane - David Bowie LP',
      price: 'R$ 350,90',
      imageUrl: 'https://m.media-amazon.com/images/I/51hr7--+F0L._UF1000,1000_QL80_.jpg',
    },
  ],
  dailyDeals: [
    {
      id: 9,
      title: 'Kit LP Kid A e Amnesiac - Radiohead (Importado) ',
      price: 'R$ 420,90',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-IJPe1aWbqv1KV2PXyphU8tXvOZz0u6M4Jg&s',
    },
    {
      id: 10,
      title: 'Camisa Incubus Algodão/Poliéster Preta',
      price: 'R$ 69,90',
      imageUrl: 'https://cdn.sistemawbuy.com.br/arquivos/fdf6db8ff6d86b98ed526de6142068e6/produtos/66a1678c517bf/incubus-66cf1bb312ba8.jpg',
    },
    {
      id: 11,
      title: 'Boné Suicidal Tendencies Original',
      price: 'R$ 50,90 + Frete',
      imageUrl: 'https://s3.amazonaws.com/img.iluria.com/product/8C2994/16110F9/450xN.jpg',
    },
    {
      id: 12,
      title: 'Rammstein - Mutter CD Nacional',
      price: 'R$ 35,50',
      imageUrl: 'https://akamai.sscdn.co/letras/360x360/albuns/4/f/8/6/14648.jpg',
    },
  ],
};

const renderCarousel = (category, title, textColor) => (
  <section className="mb-12 mt-9">
    <h2 className={`mb-6 text-2xl font-bold ${textColor}`}>{title}</h2>
    <div className="relative overflow-hidden">
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {products[category].map((product) => (
          <div key={product.id} className="snap-start shrink-0 w-72">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={product.imageUrl} className="w-full h-64 object-cover" alt={product.title} />
              <div className="p-4 text-center">
                <h5 className="text-lg font-semibold">{product.title}</h5>
                <p className="text-lg text-green-600 font-bold">{product.price}</p>
                <Link 
                  to={`/produto/${product.id}`} 
                  className="mt-3 inline-block no-underline bg-black text-white py-2 px-4 rounded-md"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="text-center mt-6">
      <Link 
        to={`/`} 
        className="inline-block no-underline h-10 w-15 bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition duration-300"
      >
        Ver Mais
      </Link>
    </div>
  </section>
)


const MainPage = () => {
  return (
    <div className="container mx-auto mt-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Bem-vindo à Music Store, a melhor loja de artigos musicais</h1>
      <Hero/>
      {renderCarousel('deathMetal', 'Baseado no que você viu', 'text-red-600')}
      {renderCarousel('recentArrivals', 'Recém Chegados', 'text-blue-600')}
      {renderCarousel('dailyDeals','Ofertas da semana', 'text-blue-600')}
    </div>
  )
}

export default MainPage;