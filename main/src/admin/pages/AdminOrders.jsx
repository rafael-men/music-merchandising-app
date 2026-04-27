import { useMemo, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { ShoppingBag, Search, Clock, CheckCircle2, Truck, XCircle, Pencil } from 'lucide-react'
import { adminTablePt, adminColumnPt, adminPaginatorProps } from '../components/tableStyles'

const STATUS_OPTIONS = [
  { label: 'Pendente',   value: 'PENDING' },
  { label: 'Confirmado', value: 'CONFIRMED' },
  { label: 'Enviado',    value: 'SHIPPED' },
  { label: 'Entregue',   value: 'DELIVERED' },
  { label: 'Cancelado',  value: 'CANCELLED' },
]

const STATUS_META = {
  PENDING:   { label: 'Pendente',   Icon: Clock,        color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  CONFIRMED: { label: 'Confirmado', Icon: CheckCircle2, color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30' },
  SHIPPED:   { label: 'Enviado',    Icon: Truck,        color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30' },
  DELIVERED: { label: 'Entregue',   Icon: CheckCircle2, color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/30' },
  CANCELLED: { label: 'Cancelado',  Icon: XCircle,      color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30' },
}

const initialOrders = [
  { id: 'ord-2026-001', customer: 'Ana Beatriz',   email: 'ana@example.com',     total: 389.80, items: 2, status: 'DELIVERED', createdAt: '2026-04-02T14:32:00', trackingCode: 'BR123456789MS', carrier: 'Correios' },
  { id: 'ord-2026-002', customer: 'João Pereira',  email: 'joao@example.com',    total: 259.90, items: 1, status: 'SHIPPED',   createdAt: '2026-04-18T09:15:00', trackingCode: 'BR987654321MS', carrier: 'Correios' },
  { id: 'ord-2026-003', customer: 'Rafael Silva',  email: 'rafael@example.com',  total: 229.70, items: 3, status: 'CONFIRMED', createdAt: '2026-04-20T18:47:00', trackingCode: '',              carrier: 'Correios' },
  { id: 'ord-2026-004', customer: 'Mariana Costa', email: 'mariana@example.com', total: 84.90,  items: 1, status: 'PENDING',   createdAt: '2026-04-22T08:12:00', trackingCode: '',              carrier: '' },
  { id: 'ord-2026-005', customer: 'Carlos Souza',  email: 'carlos@example.com',  total: 519.80, items: 2, status: 'PENDING',   createdAt: '2026-04-23T10:05:00', trackingCode: '',              carrier: '' },
  { id: 'ord-2026-006', customer: 'Beatriz Lima',  email: 'beatriz@example.com', total: 174.80, items: 2, status: 'CANCELLED', createdAt: '2026-04-15T16:33:00', trackingCode: '',              carrier: '' },
]

const formatBRL = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })

const dropdownPt = {
  root: { className: 'w-full h-[38px] bg-gray-800 border border-gray-700 rounded-lg flex items-center hover:border-gray-600 focus-within:border-gray-500 transition-colors' },
  input: { className: 'bg-transparent border-0 text-white text-sm px-3 flex-1 focus:outline-none focus:shadow-none' },
  trigger: { className: 'text-gray-500 w-8 flex items-center justify-center shrink-0' },
  clearIcon: { className: 'text-gray-500 mr-2 cursor-pointer hover:text-gray-300' },
  panel: { className: 'bg-gray-800 border border-gray-700 rounded-lg mt-1 shadow-xl shadow-black/40 overflow-hidden' },
  list: { className: 'list-none m-0 p-1' },
  item: { className: 'text-sm text-gray-200 px-3 py-2 hover:bg-gray-700 cursor-pointer list-none rounded' },
}

const tablePt = adminTablePt
const columnPt = adminColumnPt

const inputClass = 'w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors'
const labelClass = 'block text-xs font-medium text-gray-400 mb-1.5'

const AdminOrders = () => {
  const [orders, setOrders] = useState(initialOrders)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState(null)
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState(null)
  const toast = useRef(null)

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
      const matchStatus = !statusFilter || o.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [orders, search, statusFilter])

  const openEdit = (row) => {
    setEditing(row)
    setEditForm({
      status: row.status,
      trackingCode: row.trackingCode || '',
      carrier: row.carrier || '',
    })
  }

  const closeEdit = () => {
    setEditing(null)
    setEditForm(null)
  }

  const handleSave = () => {
    setOrders((prev) =>
      prev.map((o) => (o.id === editing.id ? { ...o, ...editForm } : o))
    )
    toast.current?.show({
      severity: 'success',
      summary: 'Pedido atualizado',
      detail: `#${editing.id} salvo com sucesso.`,
      life: 2500,
    })
    closeEdit()
    // TODO: integrar com PATCH /orders/{id}/status e PATCH /orders/{id}/tracking
  }

  const idTemplate = (row) => (
    <span className="font-mono text-xs text-white">#{row.id}</span>
  )

  const customerTemplate = (row) => (
    <div className="min-w-0">
      <p className="text-sm text-white truncate leading-tight">{row.customer}</p>
      <p className="text-xs text-gray-500 truncate">{row.email}</p>
    </div>
  )

  const statusTemplate = (row) => {
    const meta = STATUS_META[row.status]
    const StatusIcon = meta.Icon
    return (
      <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${meta.color} ${meta.bg} ${meta.border} border px-2 py-0.5 rounded-full`}>
        <StatusIcon size={11} />
        {meta.label}
      </span>
    )
  }

  const totalTemplate = (row) => (
    <span className="text-sm font-medium text-green-400">{formatBRL(row.total)}</span>
  )

  const trackingTemplate = (row) =>
    row.trackingCode
      ? <span className="text-xs font-mono text-gray-300">{row.trackingCode}</span>
      : <span className="text-xs text-gray-600">—</span>

  const dateTemplate = (row) => (
    <span className="text-xs text-gray-400">{formatDate(row.createdAt)}</span>
  )

  const actionsTemplate = (row) => (
    <button
      type="button"
      onClick={() => openEdit(row)}
      aria-label={`Editar pedido ${row.id}`}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-300 border border-gray-700 px-2.5 py-1 rounded-lg hover:border-gray-500 hover:text-white transition-colors"
    >
      <Pencil size={12} />
      Editar
    </button>
  )

  return (
    <div>
      <Toast ref={toast} position="top-right" />

      <div className="flex items-center gap-3 mb-2">
        <ShoppingBag size={22} className="text-white" />
        <h1 className="text-2xl font-bold text-white">Pedidos</h1>
      </div>
      <p className="text-sm text-gray-400 mb-6">Gerencie pedidos, atualize status e adicione códigos de rastreio.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10" />
          <InputText
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por pedido, cliente ou e-mail"
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
          />
        </div>
        <Dropdown
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.value)}
          options={STATUS_OPTIONS}
          placeholder="Todos os status"
          showClear
          pt={{
            ...dropdownPt,
            root: { className: 'w-full sm:w-56 h-[38px] bg-gray-900 border border-gray-800 rounded-lg flex items-center hover:border-gray-600 focus-within:border-gray-500 transition-colors' },
          }}
        />
      </div>

      <DataTable
        value={filtered}
        pt={tablePt}
        rowHover
        stripedRows
        {...adminPaginatorProps}
        emptyMessage="Nenhum pedido encontrado."
      >
        <Column header="Pedido"   body={idTemplate}       pt={columnPt} />
        <Column header="Cliente"  body={customerTemplate} pt={columnPt} />
        <Column header="Itens"    field="items"           pt={columnPt} />
        <Column header="Total"    body={totalTemplate}    pt={columnPt} />
        <Column header="Rastreio" body={trackingTemplate} pt={columnPt} />
        <Column header="Status"   body={statusTemplate}   pt={columnPt} />
        <Column header="Data"     body={dateTemplate}     pt={columnPt} />
        <Column header=""         body={actionsTemplate}  pt={columnPt} />
      </DataTable>

      <Dialog
        visible={!!editing}
        onHide={closeEdit}
        header={null}
        showHeader={false}
        modal
        dismissableMask
        pt={{
          mask: { className: 'bg-black/70 backdrop-blur-sm' },
          root: { className: 'w-full max-w-md mx-4' },
          content: { className: 'bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden p-0' },
        }}
      >
        {editing && editForm && (
          <div>
            <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Editar pedido</p>
                <p className="text-sm font-mono font-semibold text-white">#{editing.id}</p>
              </div>
              <button
                type="button"
                onClick={closeEdit}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-500">Cliente</p>
                  <p className="text-white truncate">{editing.customer}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="text-green-400 font-medium">{formatBRL(editing.total)}</p>
                </div>
              </div>

              <div>
                <label className={labelClass}>Status</label>
                <Dropdown
                  value={editForm.status}
                  onChange={(e) => setEditForm((f) => ({ ...f, status: e.value }))}
                  options={STATUS_OPTIONS}
                  pt={dropdownPt}
                />
              </div>

              <div>
                <label className={labelClass}>Código de rastreio</label>
                <InputText
                  value={editForm.trackingCode}
                  onChange={(e) => setEditForm((f) => ({ ...f, trackingCode: e.target.value }))}
                  placeholder="BR123456789MS"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Transportadora</label>
                <InputText
                  value={editForm.carrier}
                  onChange={(e) => setEditForm((f) => ({ ...f, carrier: e.target.value }))}
                  placeholder="Correios"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex gap-2 px-5 py-4 border-t border-gray-800">
              <Button
                type="button"
                onClick={closeEdit}
                label="Cancelar"
                className="flex-1 text-sm font-medium text-gray-300 border border-gray-700 py-2 rounded-lg hover:border-gray-500 hover:text-white transition-colors bg-transparent"
              />
              <Button
                type="button"
                onClick={handleSave}
                label="Salvar alterações"
                className="flex-1 text-sm font-medium text-black bg-white py-2 rounded-lg hover:bg-gray-200 transition-colors border-0"
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default AdminOrders
