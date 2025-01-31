import React, { useState } from 'react';
import CartImage from '../Assets/CartBlack.png'

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: 'Mudvayne - LD.50 CD (Importado)', 
      price: 60.88, 
      image: 'https://upload.wikimedia.org/wikipedia/pt/9/98/L.D._50_capa.jpg' 
    },
    { 
      id: 2, 
      name: 'Bottom Ramones', 
      price: 3.52, 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2qJomzzEp4XTU9BqPVDpmS55OzvqcMrilQ&s' 
    },
    { 
      id: 3, 
      name: 'Lifer - Lifer CD Raríssimo (Importado)', 
      price: 130.00, 
      image: 'https://i.scdn.co/image/ab67616d0000b2732577f15af6777fff11a2a083' 
    }
  ])

  const [paymentMethod, setPaymentMethod] = useState('')

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0)
  }

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method)
  }

  return (
    <div className="container mx-auto p-4">
             <div className="flex items-center mb-4">
        <h2 className="text-3xl font-bold mr-2">Meu Carrinho</h2>
        <img src={CartImage} alt="Carrinho" className="w-10 h-10" />
      </div>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between items-center mb-4 border-b py-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
              <span>{item.name}</span>
              <span>R${item.price}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <h3 className="text-xl font-bold">Total: R${calculateTotal()}</h3>
        <div className="mt-6">
          <h4 className="text-lg font-semibold">Escolha o Método de Pagamento</h4>
          <div className="space-y-4 mt-2">
            <button
              className={`w-full py-2 px-4 rounded border ${paymentMethod === 'Cartão de Crédito' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
              onClick={() => handlePaymentMethod('Cartão de Crédito')}
            >
              Cartão de Crédito
            </button>
            <button
              className={`w-full py-2 px-4 rounded border ${paymentMethod === 'Boleto Bancário' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
              onClick={() => handlePaymentMethod('Boleto Bancário')}
            >
              Boleto Bancário
            </button>
            <button
              className={`w-full py-2 px-4 rounded border ${paymentMethod === 'PayPal' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
              onClick={() => handlePaymentMethod('PayPal')}
            >
              PayPal
            </button>
          </div>
        </div>
        <button className="bg-black text-white px-4 py-2 mt-4 rounded">
          Finalizar Compra
        </button>
      </div>
    </div>
  )
}

export default Cart
