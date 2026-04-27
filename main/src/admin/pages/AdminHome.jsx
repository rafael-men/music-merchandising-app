import { Link } from 'react-router-dom'
import { ShoppingBag, Package, Users, TrendingUp, Clock, CheckCircle2, Truck } from 'lucide-react'

const stats = [
  { label: 'Receita do mês',     value: 'R$ 42.890,50', change: '+12%',  Icon: TrendingUp, accent: 'text-green-400' },
  { label: 'Pedidos pendentes',  value: '14',           change: 'Hoje: 3', Icon: Clock,      accent: 'text-yellow-400' },
  { label: 'Produtos ativos',    value: '128',          change: '30 novos', Icon: Package,    accent: 'text-cyan-400' },
  { label: 'Usuários cadastrados', value: '1.247',      change: '+58 mês', Icon: Users,      accent: 'text-purple-400' },
]

const shortcuts = [
  { to: '/admin/pedidos',  label: 'Gerenciar pedidos',   description: 'Ver, atualizar status e adicionar rastreamento.', Icon: ShoppingBag },
  { to: '/admin/produtos', label: 'Catálogo de produtos', description: 'Cadastrar, editar e remover produtos da loja.',  Icon: Package },
  { to: '/admin/usuarios', label: 'Usuários',            description: 'Listar e gerenciar contas de clientes.',          Icon: Users },
]

const recentOrders = [
  { id: 'ord-2026-004', customer: 'Mariana Costa',  total: 84.90,  status: 'PENDING',   StatusIcon: Clock,        statusColor: 'text-yellow-400' },
  { id: 'ord-2026-003', customer: 'Rafael Silva',   total: 229.70, status: 'CONFIRMED', StatusIcon: CheckCircle2, statusColor: 'text-blue-400' },
  { id: 'ord-2026-002', customer: 'João Pereira',   total: 259.90, status: 'SHIPPED',   StatusIcon: Truck,        statusColor: 'text-cyan-400' },
  { id: 'ord-2026-001', customer: 'Ana Beatriz',    total: 389.80, status: 'DELIVERED', StatusIcon: CheckCircle2, statusColor: 'text-green-400' },
]

const formatBRL = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const AdminHome = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Visão geral</h1>
        <p className="text-sm text-gray-400 mt-1">Resumo da operação da loja.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map(({ label, value, change, Icon, accent }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs text-gray-500">{label}</span>
              <Icon size={16} className={accent} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
        {shortcuts.map(({ to, label, description, Icon }) => (
          <Link
            key={to}
            to={to}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 no-underline hover:border-gray-600 transition-colors group"
          >
            <Icon size={20} className="text-gray-400 group-hover:text-white transition-colors mb-3" />
            <p className="text-sm font-semibold text-white mb-1">{label}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
          </Link>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <h2 className="text-sm font-semibold text-white">Pedidos recentes</h2>
          <Link to="/admin/pedidos" className="text-xs text-gray-400 no-underline hover:text-white transition-colors">
            Ver todos →
          </Link>
        </div>
        <div className="divide-y divide-gray-800">
          {recentOrders.map(({ id, customer, total, status, StatusIcon, statusColor }) => (
            <div key={id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-800/40 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-white truncate">#{id}</p>
                <p className="text-xs text-gray-500 truncate">{customer}</p>
              </div>
              <span className="text-sm font-medium text-green-400 shrink-0">{formatBRL(total)}</span>
              <span className={`inline-flex items-center gap-1 text-xs ${statusColor} shrink-0`}>
                <StatusIcon size={12} />
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminHome
