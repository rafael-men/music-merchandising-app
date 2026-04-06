import { useState } from 'react'
import { Package, MapPin, Bell, ChevronRight, LogOut, Pencil } from 'lucide-react'

const Profile = () => {
  const [user] = useState({
    name: 'Rafael',
    email: 'rafael@example.com',
    profileImage: 'https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg',
  })

  const menuItems = [
    { label: 'Meus Pedidos',        Icon: Package },
    { label: 'Endereços',           Icon: MapPin },
    { label: 'Notificações',        Icon: Bell },
  ]

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-10 max-w-xl">
        <h2 className="text-2xl font-bold text-white mb-8">Meu Perfil</h2>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-4 flex items-center gap-5">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-700 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-white">{user.name}</h3>
            <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-medium text-gray-400 border border-gray-700 px-3 py-1.5 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-200 shrink-0">
            <Pencil size={12} />
            Editar
          </button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-4">
          {menuItems.map(({ label, Icon }, index) => (
            <button
              key={label}
              className={`w-full flex items-center gap-4 px-6 py-4 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-150 ${index < menuItems.length - 1 ? 'border-b border-gray-800' : ''}`}
            >
              <Icon size={16} className="text-gray-500 shrink-0" />
              <span className="flex-1">{label}</span>
              <ChevronRight size={14} className="text-gray-600" />
            </button>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-red-500 border border-red-900/50 hover:bg-red-900/20 hover:border-red-700 transition-all duration-200">
          <LogOut size={15} />
          Sair da Conta
        </button>
      </div>
    </div>
  )
}

export default Profile
