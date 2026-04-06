import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

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

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        slidesPerView={1}
        className="w-full"
      >
        {novidades.map((novidade) => (
          <SwiperSlide key={novidade.id}>
            <div
              className="relative w-full cursor-pointer"
              style={{ height: 'clamp(320px, 55vh, 600px)' }}
              onClick={() => navigate(`/novidade/${novidade.id}`)}
            >
              <img
                src={novidade.imageUrl}
                alt={novidade.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  Lançamento
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 drop-shadow">
                  {novidade.title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base max-w-xl">
                  {novidade.description}
                </p>
                <span className="inline-block mt-4 text-xs font-medium text-white bg-white/20 border border-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full hover:bg-white/30 transition-colors duration-200">
                  Ver detalhes →
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Hero
