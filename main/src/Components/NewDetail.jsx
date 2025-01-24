import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const NewDetail = () => {
  const { id } = useParams();

  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState(null);

  const novidades = [
    { 
      id: 1, 
      title: 'Rotting Christ - Pro Xristou - LP 2024 - DELUXE EDITION', 
      description: 'Confira o novo lançamento de Rotting Christ: Pro Xristou, um álbum épico que mistura elementos de black metal com passagens atmosféricas e progressivas. A banda grega de black metal, conhecida por suas composições densas e letras profundas, traz um trabalho imersivo e provocante. Este álbum apresenta faixas como "The Sixth Day", que vão fazer os fãs vibrarem com a intensidade e complexidade sonora. Não perca a oportunidade de adquirir este marco na carreira da banda.',
      imageUrl: 'https://m.media-amazon.com/images/I/81pKFRUPRnL._UF1000,1000_QL80_.jpg',
      price: 190.99,
      purchaseInfo: 'Adquira agora no nosso site e aproveite o desconto de lançamento. Envio grátis para todo o Brasil.'
    },
    { 
      id: 2, 
      title: 'Lady Gaga - Born this Way CD', 
      description: 'Confira o aclamado álbum "Born This Way" de Lady Gaga, um marco na música pop! Lançado em 2011, o CD traz uma mistura de pop, dance e elementos de rock, com letras poderosas sobre aceitação, liberdade e igualdade. Com faixas como "Born This Way", "Judas" e "The Edge of Glory", Lady Gaga entrega performances energéticas e emocionantes, consolidando-se como uma das artistas mais influentes da música contemporânea. O álbum é uma verdadeira celebração da individualidade e do empoderamento, com uma produção musical impecável e uma visão artística única. Adquira o seu exemplar deste CD essencial para qualquer fã de música pop!' , 
      imageUrl: 'https://universalmusic.vtexassets.com/arquivos/ids/166553-800-auto?v=637637190465270000&width=800&height=auto&aspect=true',
      price: 80.00,
      purchaseInfo: 'Disponível para compra digital ou física. Desconto de 10% para novos membros.'
    },
    { 
      id: 3, 
      title: 'Deftones - Ohms LP (Importado)', 
      description: '“Ohms” é o aclamado álbum da banda Deftones, lançado em 2020, que leva os fãs a uma jornada sonora intensa e envolvente. Com uma mistura única de metal alternativo, post-hardcore e shoegaze, o álbum explora uma vasta gama de emoções, de momentos de tensão a momentos de calmaria introspectiva. O CD traz faixas pesadas como "Genesis" e "Ohms", bem como momentos mais atmosféricos, com guitarras que criam uma paisagem sonora densa e envolvente. As letras de Chino Moreno exploram temas de angústia, resistência e crescimento pessoal. “Ohms” é uma obra-prima que equilibra perfeitamente o peso emocional com a experimentação sonora, solidificando ainda mais o status da banda como uma das mais inovadoras e influentes do metal moderno. Não perca a oportunidade de adicionar este álbum fundamental à sua coleção!', 
      imageUrl: 'https://i.discogs.com/4a6z8lXIXuT9iIhJXMnJf_XgZPHuKvaH4my6gKjPGwU/rs:fit/g:sm/q:90/h:546/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE1OTY2/ODMyLTE2MTIzODM3/NDMtNjczOC5qcGVn.jpeg',
      price: 249.50,
      purchaseInfo: 'Aproveite o preço promocional!'
    },
    { 
      id: 4, 
      title: 'Motley Crue - Live Wire LP', 
      description: 'Too Fast for Love é o álbum de estréia da banda de heavy metal norte-americana Mötley Crüe. Foi lançado no dia 10 de Novembro de 1981 por um selo independente da banda, a Leathür Records, e foi produzido por Michael Wagener. Em 20 de Agosto de 1982, já com um contrato assinado com a gravadora Elektra Records, o álbum foi relançado nos EUA e no mundo.', 
      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_790484-MLB77119015932_062024-O.webp',
      price: 120.50,
      purchaseInfo: 'Envio rápido e seguro. Compre já.'
    }
  ];

  const novidade = novidades.find(nov => nov.id === parseInt(id, 10)); 

  if (!novidade) {
    return <p>Novidade não encontrada.</p>;
  }


  const handleBuyNow = () => {
    alert(`Você comprou: ${novidade.title}`);
  };

  const handleAddToCart = () => {
    alert(`${novidade.title} foi adicionado ao carrinho.`);
  };

  const handleFrete = () => {
 
    if (!cep) {
      alert('Por favor, insira um CEP válido.');
      return;
    }

    const valorFrete = 10.00;
    setFrete(valorFrete);
  };

  return (
    <section className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-6">{novidade.title}</h2>
        <img 
          src={novidade.imageUrl} 
          alt={novidade.title} 
          className="w-full h-auto object-cover rounded-lg mb-6"
        />
        <p className="text-lg text-gray-300 mb-4">{novidade.description}</p>
        <p className="text-2xl font-semibold text-yellow-500 mb-4">Preço: R$ {novidade.price.toFixed(2)}</p>
        <p className="text-lg text-gray-400 mb-6">{novidade.purchaseInfo}</p>

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
          <p className="text-lg text-whitemb-6">
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
  );
};

export default NewDetail;
