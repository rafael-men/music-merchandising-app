import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const products = {
  deathMetal: [
    {
      id: 1,
      title: 'Heartwork - Carcass LP Nacional',
      description: 'O "Heartwork" é um dos álbuns mais icônicos do Carcass, uma das bandas mais influentes do death metal. Lançado em 1993, é o quarto álbum da banda, e combina a agressividade do death metal com elementos melódicos e técnicos. A obra é reconhecida pela sua complexidade musical e pelos temas líricos profundos sobre morte, desolação e guerra.',
      price: 'R$ 200,90',
      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_816736-MLU69233686551_052023-O.webp',
    },
    {
      id: 2,
      title: 'Death - Symbolic CD (Importado)',
      description: 'Lançado em 1995, "Symbolic" é um marco na história do death metal. O álbum mistura death metal técnico com complexidade musical e letras filosóficas sobre temas como a vida após a morte e a busca por significado. É um dos trabalhos mais influentes da banda Death, solidificando seu lugar como pioneira do gênero.',
      price: 'R$ 99,90',
      imageUrl: 'https://cdn.awsli.com.br/600x450/2279/2279925/produto/257499513/death-b3851sy7d1.jpg',
    },
    {
      id: 3,
      title: 'Krisiun - Mortem Solis CD Nacional',
      description: 'Lançado em 2020, "Mortem Solis" é a obra mais brutal da banda Krisiun. A banda brasileira mantém sua tradição de death metal extremo com riffs rápidos, baterias intensas e vocais agressivos. O álbum aborda temas apocalípticos e de destruição, com uma energia crua e intransigente que caracteriza a identidade da banda.',
      price: 'R$ 49,90',
      imageUrl: 'https://static.wixstatic.com/media/ab529c_e743828cc7b14f9b9d1d342bf3410c84~mv2.jpeg/v1/fill/w_480,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ab529c_e743828cc7b14f9b9d1d342bf3410c84~mv2.jpeg',
    },
    {
      id: 4,
      title: 'Obituary - Slowly we Rot LP Box Set (Importado)',
      description: 'Edição especial em box set do primeiro álbum do Obituary, um clássico do death metal. "Slowly We Rot", lançado em 1989, foi um dos álbuns responsáveis por definir o som do death metal, com guitarras pesadas, riffs poderosos e vocais inconfundíveis. A edição box set inclui itens exclusivos e remasterizações.',
      price: 'R$ 420,90',
      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_827999-MLU78485203730_082024-O.webp',
    },
  ],
  recentArrivals: [
    {
      id: 5,
      title: 'Around the Fur - Deftones LP (Importado)',
      description: 'Lançado em 1997, "Around the Fur" ajudou a consolidar o Deftones como uma das principais bandas do nu metal. O álbum apresenta uma mistura única de metal alternativo e elementos experimentais, com letras introspectivas e densas. Ele se tornou um dos trabalhos mais aclamados pela crítica do gênero.',
      price: 'R$ 240,90',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO777cx1M5eBPYwCazHF0UwgZFR6jpbLLK3w&s',
    },
    {
      id: 6,
      title: '21 - Adele CD Deluxe Edition (Importado)',
      description: 'A edição deluxe do aclamado álbum "21" da cantora Adele, com faixas extras e material especial. Lançado em 2011, o álbum apresenta um mix de soul, pop e blues, com letras poderosas sobre perdas e superações. A obra foi um sucesso mundial, conquistando prêmios e tornando-se um marco na carreira da cantora.',
      price: 'R$ 79,90',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/c/cf/Capa_de_21_por_Adele.jpg',
    },
    {
      id: 7,
      title: 'IV - Led Zeppelin Deluxe Edition LP (Importado)',
      description: 'A versão deluxe do álbum IV do Led Zeppelin, lançado em 1971, traz faixas inéditas e material exclusivo. O álbum é considerado uma obra-prima do rock, misturando hard rock com blues e folk, e inclui clássicos como "Stairway to Heaven". A edição deluxe oferece uma nova experiência para os fãs da banda.',
      price: 'R$ 520,90',
      imageUrl: 'https://s3.amazonaws.com/img.iluria.com/product/57C531/D60CF1/450xN.jpg',
    },
    {
      id: 8,
      title: 'Aladdin Sane - David Bowie LP',
      description: '"Aladdin Sane", lançado em 1973, é um dos álbuns mais importantes da carreira de David Bowie. O disco combina o glam rock com elementos do rock progressivo e experimental, apresentando músicas como "The Jean Genie" e "Drive In Saturday". A capa do álbum, com a maquiagem icônica de Bowie, se tornou um símbolo do seu estilo inovador.',
      price: 'R$ 350,90',
      imageUrl: 'https://m.media-amazon.com/images/I/51hr7--+F0L._UF1000,1000_QL80_.jpg',
    },
  ],
  dailyDeals: [
    {
      id: 9,
      title: 'Kit LP Kid A e Amnesiac - Radiohead (Importado)',
      description: 'Kit especial com dois álbuns do Radiohead, "Kid A" e "Amnesiac", considerados marcos da música alternativa e experimental. Lançados no início dos anos 2000, esses álbuns redefiniram o rock e a música eletrônica, misturando estilos e explorando novas texturas sonoras. O kit é uma verdadeira raridade para os fãs da banda.',
      price: 'R$ 420,90',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-IJPe1aWbqv1KV2PXyphU8tXvOZz0u6M4Jg&s',
    },
    {
      id: 10,
      title: 'Camisa Incubus Algodão/Poliéster Preta',
      description: 'Camisa oficial da banda Incubus, feita com material de alta qualidade (algodão e poliéster). Com um design moderno e confortável, é a escolha perfeita para os fãs da banda. Disponível em tamanho único, ela traz o logo clássico da Incubus na frente e é ideal para qualquer fã que queira mostrar seu amor pela banda.',
      price: 'R$ 69,90',
      imageUrl: 'https://cdn.sistemawbuy.com.br/arquivos/fdf6db8ff6d86b98ed526de6142068e6/produtos/66a1678c517bf/incubus-66cf1bb312ba8.jpg',
    },
    {
      id: 11,
      title: 'Boné Suicidal Tendencies Original',
      description: 'Boné oficial da banda Suicidal Tendencies, com logo bordado. Este boné, em estilo clássico, apresenta um design simples e eficiente, ideal para quem quer mostrar seu apoio à banda de thrash metal. Fabricado com materiais de alta qualidade, ele é confortável e perfeito para o dia a dia.',
      price: 'R$ 50,90 + Frete',
      imageUrl: 'https://s3.amazonaws.com/img.iluria.com/product/8C2994/16110F9/450xN.jpg',
    },
    {
      id: 12,
      title: 'Rammstein - Mutter CD Nacional',
      description: 'O "Mutter" é o álbum da banda Rammstein que consolidou sua identidade no metal industrial. Lançado em 2001, o disco traz faixas poderosas e provocativas, com letras sobre temas como a dor, a violência e as relações humanas. "Mutter" é um dos maiores sucessos da banda e é fundamental para qualquer fã de metal industrial.',
      price: 'R$ 35,50',
      imageUrl: 'https://akamai.sscdn.co/letras/360x360/albuns/4/f/8/6/14648.jpg',
    },
  ],
};


const ProductDetails = () => {
  const { id } = useParams()
  const [cep, setCep] = useState('')
  const [frete, setFrete] = useState(null)

  const findProductById = () => {
    
    for (const category in products) {
      const product = products[category].find((item) => item.id === parseInt(id, 10))
      if (product) return product
    }
    return null; 
  };

  const product = findProductById()
  if (!product) {
    return <p className="text-center text-white text-2xl mt-10">Produto Não Catalogado</p>
  }

  const handleBuyNow = () => {
    alert(`Você comprou: ${product.title}`)
  };

  const handleAddToCart = () => {
    alert(`${product.title} foi adicionado ao carrinho.`)
  };

  const handleFrete = () => {
    if (!cep || cep.length < 8) {
      alert('Por favor, insira um CEP válido.')
      return;
    }

    const valorFrete = 15.0
    setFrete(valorFrete)
  };

  return (
    <section className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-6">{product.title}</h2>
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-3/4 md:w-1/2 lg:w-1/3 mx-auto h-auto object-cover rounded-lg mb-6"
        />
        <p className="text-2xl font-semibold text-yellow-500 mb-4">Preço: {product.price}</p>
        <p className="text-lg text-gray-400 mb-4">{product.description}</p>

        <div className="mb-6">
          <label className="block text-lg text-gray-400 mb-2">Digite seu CEP para calcular o frete:</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="Digite seu CEP"
            className="w-60 p-2 border text-black border-gray-500 rounded-md mb-4"
          />
          <button
            onClick={handleFrete}
            className="bg-yellow-600 ml-5 text-black py-2 px-6 rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            Calcular Frete
          </button>
        </div>

        {frete !== null && (
          <p className="text-lg text-white mb-6">
            O frete para o seu CEP é R$ {frete.toFixed(2)}.
          </p>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={handleBuyNow}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Comprar Agora
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails;
