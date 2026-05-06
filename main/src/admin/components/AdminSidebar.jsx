import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, Users, ShoppingBag, LogOut, Music2, X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const NAV_ITEMS = [
  { to: '/admin', label: 'Visão geral', Icon: LayoutDashboard, end: true },
  { to: '/admin/pedidos', label: 'Pedidos', Icon: ShoppingBag },
  { to: '/admin/produtos', label: 'Produtos', Icon: Package },
  { to: '/admin/usuarios', label: 'Usuários', Icon: Users },
]

const AdminSidebar = ({ open, onClose }) => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-gray-900 border-r border-gray-800
          flex flex-col transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Music2 size={20} className="text-white" />
            <div>
              <p className="text-sm font-bold text-white leading-none">Music Store</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Admin</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline transition-colors
                ${isActive
                  ? 'bg-white text-black font-medium'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-800">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
