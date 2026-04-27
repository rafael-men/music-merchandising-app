import { useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Users, Search, ShieldCheck, User as UserIcon } from 'lucide-react'
import { adminTablePt, adminColumnPt, adminPaginatorProps } from '../components/tableStyles'

const mockUsers = [
  { id: 'u1', name: 'Ana Beatriz',   email: 'ana@example.com',      cpf: '111.222.333-44', role: 'CUSTOMER', orders: 5, createdAt: '2025-12-12T10:00:00' },
  { id: 'u2', name: 'João Pereira',  email: 'joao@example.com',     cpf: '222.333.444-55', role: 'CUSTOMER', orders: 2, createdAt: '2026-01-08T15:32:00' },
  { id: 'u3', name: 'Rafael Silva',  email: 'rafael@example.com',   cpf: '333.444.555-66', role: 'CUSTOMER', orders: 4, createdAt: '2026-02-20T09:21:00' },
  { id: 'u4', name: 'Mariana Costa', email: 'mariana@example.com',  cpf: '444.555.666-77', role: 'CUSTOMER', orders: 1, createdAt: '2026-03-05T18:47:00' },
  { id: 'u5', name: 'Admin',         email: 'admin@musicstore.com', cpf: '000.000.000-00', role: 'ADMIN',    orders: 0, createdAt: '2025-11-01T08:00:00' },
  { id: 'u6', name: 'Beatriz Lima',  email: 'beatriz@example.com',  cpf: '555.666.777-88', role: 'CUSTOMER', orders: 3, createdAt: '2026-03-18T11:12:00' },
]

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })

const tablePt = adminTablePt
const columnPt = adminColumnPt

const AdminUsers = () => {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return mockUsers
    const q = search.toLowerCase()
    return mockUsers.filter((u) =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.cpf.includes(search)
    )
  }, [search])

  const userTemplate = (row) => (
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0">
        <UserIcon size={14} className="text-gray-500" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-white truncate">{row.name}</p>
        <p className="text-xs text-gray-500 truncate">{row.email}</p>
      </div>
    </div>
  )

  const cpfTemplate = (row) => (
    <span className="text-xs font-mono text-gray-400">{row.cpf}</span>
  )

  const roleTemplate = (row) => (
    row.role === 'ADMIN' ? (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-purple-400 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded-full">
        <ShieldCheck size={11} />
        Admin
      </span>
    ) : (
      <span className="inline-flex items-center text-[11px] font-medium text-gray-400 bg-gray-800 border border-gray-700 px-2 py-0.5 rounded-full">
        Cliente
      </span>
    )
  )

  const ordersTemplate = (row) => (
    <span className="text-sm text-gray-300">{row.orders}</span>
  )

  const dateTemplate = (row) => (
    <span className="text-xs text-gray-400">{formatDate(row.createdAt)}</span>
  )

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Users size={22} className="text-white" />
        <h1 className="text-2xl font-bold text-white">Usuários</h1>
      </div>
      <p className="text-sm text-gray-400 mb-6">Lista de contas cadastradas na plataforma.</p>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        <InputText
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome, e-mail ou CPF"
          className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
        />
      </div>

      <DataTable
        value={filtered}
        pt={tablePt}
        rowHover
        stripedRows
        {...adminPaginatorProps}
        emptyMessage="Nenhum usuário encontrado."
      >
        <Column header="Usuário"    body={userTemplate}   pt={columnPt} />
        <Column header="CPF"        body={cpfTemplate}    pt={columnPt} />
        <Column header="Pedidos"    body={ordersTemplate} pt={columnPt} />
        <Column header="Tipo"       body={roleTemplate}   pt={columnPt} />
        <Column header="Cadastrado" body={dateTemplate}   pt={columnPt} />
      </DataTable>
    </div>
  )
}

export default AdminUsers
