import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useNavigate } from 'react-router-dom'
import 'swiper/swiper-bundle.css'

const Hero = () => {
  const navigate = useNavigate()

  const novidades = [
    { 
      id: 1, 
      title: 'Black Metal', 
      description: 'Confira o novo lançamento de Rotting Christ: Pro Xristou', 
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8AukWAiyyQTW3uBNhygp5HghEAfX3GNQ1DQ&s' 
    },
    { 
      id: 2, 
      title: 'Pop de milhões', 
      description: 'Veja o que acabou de chegar da Lady Gaga só aqui na music store', 
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsJa33CQNLroUqukn_C2LsZtAHBKGJO4pxRA&s' 
    },
    { 
      id: 3, 
      title: 'Nu Metal', 
      description: 'Confira o album Ohms, Prepare-se para uma jornada sonora intensa', 
      imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb4b2da0b72cab26ac518f1f0d' 
    },
    { 
      id: 4, 
      title: 'Hard Rock', 
      description: 'Acabou de chegar o mais famoso álbum da banda Motley Crue.', 
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjf-L5VQhhy4FqbGyD59v1DnzPg5pSaR7pmg&s' 
    }
  ]

  const handleNovidadeClick = (id) => {
    navigate(`/novidade/${id}`)
  }

  return (
    <section className="bg-gray-900 text-white p-8 rounded-lg">
      <div className="container mx-auto">
        <h1 className='text-3xl font-bold text-center mb-6'>Novidades da Semana</h1>
        
        <Swiper
          spaceBetween={30} 
          slidesPerView={1} 
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3, 
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {novidades.map((novidade, index) => (
            <SwiperSlide key={index}>
              <div 
                className="bg-black p-6 rounded-lg shadow-md flex flex-col justify-between h-full cursor-pointer"
                onClick={() => handleNovidadeClick(novidade.id)} 
              >
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={novidade.imageUrl} 
                    alt={novidade.title} 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>
                <h3 className="text-xl font-semibold">{novidade.title}</h3>
                <p className="text-gray-400">{novidade.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Hero
