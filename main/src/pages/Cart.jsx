import { useState } from 'react'
import { ShoppingCart, Trash2, ShoppingBag, Copy, Check, Truck, QrCode } from 'lucide-react'

const PIX_KEY = 'pagamentos@musicstore.com.br'

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

  const [cep, setCep] = useState('')
  const [frete, setFrete] = useState(null)
  const [freteCalculado, setFreteCalculado] = useState(false)
  const [copied, setCopied] = useState(false)
  const [ordered, setOrdered] = useState(false)

  const handleRemoveItem = (id) => setCartItems(cartItems.filter(item => item.id !== id))
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0)
  const totalComFrete = subtotal + (frete ?? 0)

  const handleCalcularFrete = () => {
    if (!cep || cep.replace(/\D/g, '').length < 8) return
    const valor = 15.90
    setFrete(valor)
    setFreteCalculado(true)
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(PIX_KEY)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFinalize = () => setOrdered(true)

  if (ordered) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Pedido realizado!</h2>
          <p className="text-gray-400 text-sm mb-1">Aguardando confirmação do pagamento via PIX.</p>
          <p className="text-green-400 font-bold text-lg mb-6">R$ {totalComFrete.toFixed(2)}</p>
          <div className="bg-gray-800 rounded-xl p-4 text-left">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Chave PIX</p>
            <div className="flex items-center gap-2">
              <span className="flex-1 text-sm text-white font-mono truncate">{PIX_KEY}</span>
              <button onClick={handleCopyKey} className="shrink-0 text-gray-400 hover:text-white transition-colors">
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-4">Status: <span className="text-yellow-500 font-medium">Aguardando pagamento</span></p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart size={24} className="text-white" />
          <h2 className="text-2xl font-bold text-white">Meu Carrinho</h2>
          {cartItems.length > 0 && (
            <span className="ml-auto text-xs text-gray-500">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
            </span>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">Seu carrinho está vazio.</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-100 truncate">{item.name}</p>
                    <p className="text-green-400 font-bold text-base mt-1">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <button
                    className="text-gray-600 hover:text-red-500 transition-colors duration-200 shrink-0 p-1"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label="Remover item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

              {/* Calcular frete */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                <Truck size={13} className="inline mr-1.5 mb-0.5" />
                Calcular Frete
              </p>
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="Digite seu CEP"
                  maxLength={9}
                  className="flex-1 min-w-0 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                />
                <button
                  onClick={handleCalcularFrete}
                  className="shrink-0 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Calcular
                </button>
              </div>

              {/* Resumo de valores */}
              <div className="space-y-2 mb-6 pb-4 border-b border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-gray-200">R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Frete</span>
                  <span className={freteCalculado ? 'text-gray-200' : 'text-gray-600'}>
                    {freteCalculado ? `R$ ${frete.toFixed(2)}` : 'Não calculado'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-800">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-xl font-bold text-white">R$ {totalComFrete.toFixed(2)}</span>
                </div>
              </div>

              {/* Pagamento — apenas PIX */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Método de Pagamento</p>
              <div className="flex items-center gap-3 bg-gray-800 border border-green-500/30 rounded-xl px-4 py-3 mb-6">
                <div className="text-green-400 shrink-0">
                  <QrCode size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">PIX</p>
                  <p className="text-xs text-gray-400">Pagamento instantâneo — única forma aceita</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-green-500 shrink-0 flex items-center justify-center">
                  <Check size={10} className="text-black" />
                </div>
              </div>

              {/* Chave PIX */}
              <div className="bg-gray-800 rounded-xl p-4 mb-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Chave PIX</p>
                <div className="flex items-center gap-2">
                  <span className="flex-1 text-sm text-white font-mono truncate">{PIX_KEY}</span>
                  <button
                    onClick={handleCopyKey}
                    className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-lg px-2 py-1 transition-all duration-200"
                  >
                    {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              <button
                onClick={handleFinalize}
                className="w-full py-3 rounded-xl font-semibold text-sm bg-green-500 text-black hover:bg-green-400 transition-colors duration-200"
              >
                Finalizar com PIX
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
