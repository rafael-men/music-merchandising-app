import { useEffect, useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Users, Search, ShieldCheck, User as UserIcon } from 'lucide-react'
import { adminTablePt, adminColumnPt, adminPaginatorProps } from '../components/tableStyles'
import { usersApi } from '../../api/users'
import { extractErrorMessage } from '../../api/client'

const tablePt = adminTablePt
const columnPt = adminColumnPt

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    usersApi
      .list()
      .then((data) => {
        if (!cancelled) setUsers(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (!cancelled) setError(extractErrorMessage(err, 'Falha ao carregar usuários.'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const filtered = useMemo(() => {
    if (!search) return users
    const q = search.toLowerCase()
    return users.filter((u) =>
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.cpf || '').includes(search)
    )
  }, [search, users])

  const userTemplate = (row) => (
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0 overflow-hidden">
        {row.profilePhotoUrl ? (
          <img src={row.profilePhotoUrl} alt={row.name} className="w-full h-full object-cover" />
        ) : (
          <UserIcon size={14} className="text-gray-500" />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-white truncate">{row.name}</p>
        <p className="text-xs text-gray-500 truncate">{row.email}</p>
      </div>
    </div>
  )

  const cpfTemplate = (row) => (
    <span className="text-xs font-mono text-gray-400">{row.cpf || '—'}</span>
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

  const favoritesTemplate = (row) => (
    <span className="text-sm text-gray-300">{(row.favoriteProductIds || []).length}</span>
  )

  const cityTemplate = (row) => (
    <span className="text-xs text-gray-400">
      {row.address?.city ? `${row.address.city}/${row.address.state}` : '—'}
    </span>
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

      {error && (
        <div className="bg-red-900/20 border border-red-900/40 rounded-lg px-4 py-3 mb-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <DataTable
        value={filtered}
        pt={tablePt}
        rowHover
        stripedRows
        loading={loading}
        {...adminPaginatorProps}
        emptyMessage={loading ? 'Carregando...' : 'Nenhum usuário encontrado.'}
      >
        <Column header="Usuário"   body={userTemplate}      pt={columnPt} />
        <Column header="CPF"       body={cpfTemplate}       pt={columnPt} />
        <Column header="Cidade"    body={cityTemplate}      pt={columnPt} />
        <Column header="Favoritos" body={favoritesTemplate} pt={columnPt} />
        <Column header="Tipo"      body={roleTemplate}      pt={columnPt} />
      </DataTable>
    </div>
  )
}

export default AdminUsers
