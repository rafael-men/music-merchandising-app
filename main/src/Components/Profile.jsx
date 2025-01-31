import React, { useState } from 'react'

const Profile = () => {

  const [user, setUser] = useState({
    name: 'Rafael',
    email: 'rafael@example.com', 
    profileImage: 'https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg', 
  })

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Perfil</h2>
      <div className="flex items-center mb-6">
        <img 
          src={user.profileImage} 
          alt="Profile" 
          className="w-32 h-32 rounded-full border-2 border-gray-300 mr-6"
        />
        <div>
          <h3 className="text-2xl font-semibold">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="border-t border-gray-300 pt-4">
        <h4 className="text-xl font-semibold mb-4">Configurações</h4>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600">
          Editar Perfil
        </button>
        <button className="bg-red-800 text-white px-4 py-2 ml-4 rounded hover:bg-red-600">
          Sair
        </button>
      </div>
    </div>
  )
}

export default Profile
