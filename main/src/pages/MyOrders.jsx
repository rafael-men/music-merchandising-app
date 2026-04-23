import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Package, ChevronDown, ChevronUp, ArrowLeft, ShoppingBag,
  Clock, Truck, CheckCircle2, XCircle, QrCode, Copy, Check,
  Receipt, MapPin, Printer, ExternalLink,
} from 'lucide-react'
import ProductImage from '../Components/ProductImage'

const STATUS_META = {
  PENDING:   { label: 'Pagamento pendente', Icon: Clock,        color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  CONFIRMED: { label: 'Confirmado',         Icon: CheckCircle2, color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30' },
  SHIPPED:   { label: 'Enviado',            Icon: Truck,        color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30' },
  DELIVERED: { label: 'Entregue',           Icon: CheckCircle2, color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/30' },
  CANCELLED: { label: 'Cancelado',          Icon: XCircle,      color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30' },
}

const PAYMENT_META = {
  PIX: { label: 'PIX', Icon: QrCode },
}

const FILTERS = [
  { value: 'ALL',       label: 'Todos' },
  { value: 'PENDING',   label: 'Pendentes' },
  { value: 'CONFIRMED', label: 'Confirmados' },
  { value: 'SHIPPED',   label: 'Enviados' },
  { value: 'DELIVERED', label: 'Entregues' },
  { value: 'CANCELLED', label: 'Cancelados' },
]

const mockOrders = [
  {
    id: 'ord-2026-001',
    items: [
      { productId: 'p1', name: 'Rotting Christ - Pro Xristou (CD)', image: null, price: 89.90, quantity: 1 },
      { productId: 'p2', name: 'Iron Maiden - The Number of the Beast (Vinyl)', image: null, price: 299.90, quantity: 1 },
    ],
    total: 389.80,
    paymentMethod: 'PIX',
    status: 'DELIVERED',
    createdAt: '2026-04-02T14:32:00',
    receipt: {
      number: 'REC-2026-000001',
      paidAt: '2026-04-02T14:35:12',
      pixTxId: 'E10492061202604021435sA3bc9xKz',
      payerName: 'Rafael Silva',
      payerDocument: '123.456.789-00',
    },
    shipping: {
      code: 'BR123456789MS',
      carrier: 'Correios',
      trackingUrl: 'https://rastreamento.correios.com.br/app/index.php',
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo/SP - 01310-100',
    },
  },
  {
    id: 'ord-2026-002',
    items: [
      { productId: 'p3', name: 'Deftones - Ohms (Vinyl)', image: null, price: 259.90, quantity: 1 },
    ],
    total: 259.90,
    paymentMethod: 'PIX',
    status: 'SHIPPED',
    createdAt: '2026-04-18T09:15:00',
    receipt: {
      number: 'REC-2026-000002',
      paidAt: '2026-04-18T09:18:45',
      pixTxId: 'E10492061202604180918aQ9pL2vR',
      payerName: 'Rafael Silva',
      payerDocument: '123.456.789-00',
    },
    shipping: {
      code: 'BR987654321MS',
      carrier: 'Correios',
      trackingUrl: 'https://rastreamento.correios.com.br/app/index.php',
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo/SP - 01310-100',
    },
  },
  {
    id: 'ord-2026-003',
    items: [
      { productId: 'p4', name: 'Lady Gaga - Mayhem (CD)', image: null, price: 69.90, quantity: 2 },
      { productId: 'p5', name: 'Camiseta Oficial Iron Maiden - The Trooper', image: null, price: 89.90, quantity: 1 },
    ],
    total: 229.70,
    paymentMethod: 'PIX',
    status: 'CONFIRMED',
    createdAt: '2026-04-20T18:47:00',
    receipt: {
      number: 'REC-2026-000003',
      paidAt: '2026-04-20T18:52:33',
      pixTxId: 'E10492061202604201852fM5nT8yK',
      payerName: 'Rafael Silva',
      payerDocument: '123.456.789-00',
    },
    shipping: {
      code: null,
      carrier: 'Correios',
      trackingUrl: null,
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo/SP - 01310-100',
    },
  },
  {
    id: 'ord-2026-004',
    items: [
      { productId: 'p6', name: 'Dream Theater - Metropolis Pt. 2 (CD)', image: null, price: 84.90, quantity: 1 },
    ],
    total: 84.90,
    paymentMethod: 'PIX',
    status: 'PENDING',
    createdAt: '2026-04-22T08:12:00',
    receipt: null,
    shipping: null,
  },
]

const formatBRL = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

const CopyButton = ({ text, label = 'Copiar' }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) { /* ignore */ }
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
    >
      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
      {copied ? 'Copiado' : label}
    </button>
  )
}

const ReceiptModal = ({ order, onClose }) => {
  const { receipt } = order
  if (!receipt) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Receipt size={18} className="text-white" />
            <h3 className="text-base font-semibold text-white">Recibo de pagamento</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <XCircle size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4 text-sm">
          <div className="text-center pb-4 border-b border-gray-800">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Valor pago</p>
            <p className="text-2xl font-bold text-green-400">{formatBRL(order.total)}</p>
            <p className="text-xs text-gray-500 mt-2">via PIX</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between gap-3">
              <span className="text-gray-500">Nº do recibo</span>
              <span className="text-white font-mono">{receipt.number}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-gray-500">Pago em</span>
              <span className="text-white">{formatDate(receipt.paidAt)}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-gray-500">Pedido</span>
              <span className="text-white font-mono text-xs">#{order.id}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-gray-500">Pagador</span>
              <span className="text-white">{receipt.payerName}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-gray-500">CPF</span>
              <span className="text-white font-mono">{receipt.payerDocument}</span>
            </div>
            <div className="pt-3 border-t border-gray-800">
              <div className="flex items-start justify-between gap-3">
                <span className="text-gray-500 shrink-0">ID da transação</span>
                <span className="text-white font-mono text-xs break-all text-right">{receipt.pixTxId}</span>
              </div>
              <div className="mt-1 flex justify-end">
                <CopyButton text={receipt.pixTxId} label="Copiar ID" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 px-5 py-4 border-t border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 text-sm font-medium text-gray-300 border border-gray-700 py-2 rounded-lg hover:border-gray-500 hover:text-white transition-colors"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium text-black bg-white py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Printer size={14} />
            Imprimir
          </button>
        </div>
      </div>
    </div>
  )
}

const DeliveryAddress = ({ address }) => {
  if (!address) return null
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-3">
      <div className="flex items-start gap-2">
        <MapPin size={13} className="text-gray-400 mt-0.5 shrink-0" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-0.5">Endereço de entrega</p>
          <p className="text-[13px] text-gray-300 leading-snug">{address}</p>
        </div>
      </div>
    </div>
  )
}

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)

  const status = STATUS_META[order.status] || STATUS_META.PENDING
  const StatusIcon = status.Icon
  const payment = PAYMENT_META[order.paymentMethod] || { label: order.paymentMethod, Icon: QrCode }
  const PaymentIcon = payment.Icon
  const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full text-left p-4 hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Pedido</p>
              <p className="text-sm font-mono font-medium text-white truncate">#{order.id}</p>
            </div>
            <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${status.color} ${status.bg} ${status.border} border px-2 py-0.5 rounded-full shrink-0`}>
              <StatusIcon size={11} />
              {status.label}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-gray-400">
            <span>{formatDate(order.createdAt)}</span>
            <span className="text-gray-700">•</span>
            <span>{itemsCount} {itemsCount === 1 ? 'item' : 'itens'}</span>
            <span className="text-gray-700">•</span>
            <span className="inline-flex items-center gap-1">
              <PaymentIcon size={11} />
              {payment.label}
            </span>
          </div>

          <div className="flex items-end justify-between gap-2 mt-3">
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Total pago</p>
              <span className="text-lg font-bold text-green-400">{formatBRL(order.total)}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 shrink-0">
              {expanded ? 'Recolher' : 'Detalhes'}
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </span>
          </div>
        </button>

        {expanded && (
          <div className="border-t border-gray-800 p-3 sm:p-4 bg-gray-950/40 space-y-3">
            <div>
              <p className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-2">Itens</p>
              <div className="flex flex-col gap-2">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-2.5">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 bg-gray-800"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate leading-tight">{item.name}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {item.quantity}x {formatBRL(item.price)}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-200 shrink-0">
                      {formatBRL(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-400">Total</span>
                <span className="text-sm font-bold text-green-400">{formatBRL(order.total)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-900/60 border border-gray-800 rounded-xl p-3">
              <PaymentIcon size={16} className="text-gray-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white leading-tight">Pago via {payment.label}</p>
                {order.receipt ? (
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">
                    {order.receipt.number}
                  </p>
                ) : (
                  <p className="text-[11px] text-gray-500 mt-0.5">Aguardando pagamento</p>
                )}
              </div>
              {order.receipt && (
                <button
                  type="button"
                  onClick={() => setShowReceipt(true)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-gray-300 border border-gray-700 px-2.5 py-1.5 rounded-lg hover:border-gray-500 hover:text-white transition-colors shrink-0"
                >
                  <Receipt size={12} />
                  <span className="hidden xs:inline">Ver </span>recibo
                </button>
              )}
            </div>

            {order.shipping?.code && (
              <div className="bg-cyan-500/5 border border-cyan-500/30 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Truck size={13} className="text-cyan-400 shrink-0" />
                  <p className="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider">Rastreamento</p>
                </div>
                <div className="bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 mb-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                    Código {order.shipping.carrier ? `· ${order.shipping.carrier}` : ''}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-mono font-semibold text-white truncate">{order.shipping.code}</p>
                    <CopyButton text={order.shipping.code} label="Copiar" />
                  </div>
                </div>
                {order.shipping.trackingUrl && (
                  <a
                    href={order.shipping.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium text-black bg-white px-4 py-2 rounded-lg no-underline hover:bg-gray-200 transition-colors"
                  >
                    <Truck size={13} />
                    Rastrear pedido
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            )}

            <DeliveryAddress address={order.shipping?.address} />

            {order.status === 'PENDING' && (
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-black bg-white py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <QrCode size={13} />
                Finalizar pagamento
              </button>
            )}
          </div>
        )}
      </div>

      {showReceipt && <ReceiptModal order={order} onClose={() => setShowReceipt(false)} />}
    </>
  )
}

const MyOrders = () => {
  const [filter, setFilter] = useState('ALL')
  const [orders] = useState(mockOrders)

  const filtered = useMemo(() => {
    if (filter === 'ALL') return orders
    return orders.filter((o) => o.status === filter)
  }, [filter, orders])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-6 sm:py-10 max-w-3xl">
        <Link
          to="/perfil"
          className="inline-flex items-center gap-2 text-sm text-gray-400 no-underline hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Voltar ao perfil
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <Package size={22} className="text-white" />
          <h2 className="text-2xl font-bold text-white">Meus pedidos</h2>
        </div>
        <p className="text-sm text-gray-400 mb-6">Acompanhe o status e histórico dos seus pedidos.</p>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                filter === f.value
                  ? 'bg-white text-black border-white'
                  : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
            <ShoppingBag size={36} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-400 mb-1">
              {filter === 'ALL' ? 'Você ainda não tem pedidos.' : 'Nenhum pedido nesta categoria.'}
            </p>
            {filter === 'ALL' && (
              <Link
                to="/"
                className="inline-block mt-3 text-sm text-white font-medium no-underline hover:underline"
              >
                Explorar produtos →
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
