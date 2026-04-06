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
    <section className="bg-gradient-to-br from-gray-900 to-black text-white p-4 sm:p-6 rounded-xl border border-gray-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className='text-lg sm:text-2xl font-bold'>Novidades da Semana</h2>
          <span className="text-xs text-gray-500 uppercase tracking-widest hidden sm:block">Lançamentos</span>
        </div>

        <Swiper
          spaceBetween={12}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 14 },
            768: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 16 },
          }}
          style={{ paddingBottom: '4px' }}
        >
          {novidades.map((novidade, index) => (
            <SwiperSlide key={index}>
              <div
                className="group bg-gray-800 rounded-xl overflow-hidden cursor-pointer border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:shadow-lg hover:shadow-black/50 hover:-translate-y-1"
                onClick={() => handleNovidadeClick(novidade.id)}
              >
                <div className="overflow-hidden h-36 sm:h-44">
                  <img
                    src={novidade.imageUrl}
                    alt={novidade.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-semibold mb-1 group-hover:text-gray-200">{novidade.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-snug line-clamp-2">{novidade.description}</p>
                  <span className="inline-block mt-2 sm:mt-3 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Ver detalhes →</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Hero
