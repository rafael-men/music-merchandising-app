import { useEffect, useMemo, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { ShoppingBag, Search, Clock, CheckCircle2, Truck, XCircle, Pencil, MapPin } from 'lucide-react'
import { adminTablePt, adminColumnPt, adminPaginatorProps } from '../components/tableStyles'
import { ordersApi } from '../../api/orders'
import { usersApi } from '../../api/users'
import { extractErrorMessage } from '../../api/client'

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

// Transições permitidas a partir de cada status
const ALLOWED_TRANSITIONS = {
  PENDING:   ['PENDING', 'CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['CONFIRMED', 'SHIPPED', 'CANCELLED'],
  SHIPPED:   ['SHIPPED', 'DELIVERED'],
  DELIVERED: ['DELIVERED'],
  CANCELLED: ['CANCELLED'],
}

// Status em que tracking pode ser editado
const TRACKING_EDITABLE_STATUSES = new Set(['CONFIRMED', 'SHIPPED'])

const formatBRL = (value) =>
  (typeof value === 'number' ? value : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—'

const formatAddressShort = (address) => {
  if (!address) return '—'
  const city = address.city
  const state = address.state
  if (city && state) return `${city}/${state}`
  return city || state || '—'
}

const formatAddressFull = (address) => {
  if (!address) return ''
  const parts = []
  if (address.street) parts.push(address.street + (address.number ? `, ${address.number}` : ''))
  if (address.complement) parts.push(address.complement)
  if (address.neighborhood) parts.push(address.neighborhood)
  if (address.city || address.state) parts.push(`${address.city || ''}${address.state ? '/' + address.state : ''}`)
  if (address.zipCode) parts.push(`CEP ${address.zipCode}`)
  return parts.join(' · ')
}

const dropdownPt = {
  root: { className: 'w-full h-[38px] bg-gray-800 border border-gray-700 rounded-lg flex items-center hover:border-gray-600 focus-within:border-gray-500 transition-colors' },
  input: { className: 'bg-transparent border-0 text-white text-sm px-3 flex-1 focus:outline-none focus:shadow-none' },
  trigger: { className: 'text-gray-500 w-8 flex items-center justify-center shrink-0' },
  clearIcon: { className: 'text-gray-500 mr-2 cursor-pointer hover:text-gray-300' },
  panel: { className: 'bg-gray-800 border border-gray-700 rounded-lg mt-1 shadow-xl shadow-black/40 overflow-hidden' },
  list: { className: 'list-none m-0 p-1' },
  item: ({ context }) => ({
    className: `text-sm px-3 py-2 cursor-pointer list-none rounded ${
      context?.disabled
        ? 'text-gray-600 opacity-50 cursor-not-allowed'
        : 'text-gray-200 hover:bg-gray-700'
    }`,
  }),
}

const tablePt = adminTablePt
const columnPt = adminColumnPt

const inputClass = 'w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors'
const inputDisabledClass = 'w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-500 placeholder-gray-700 cursor-not-allowed'
const labelClass = 'block text-xs font-medium text-gray-400 mb-1.5'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [usersById, setUsersById] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState(null)
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const toast = useRef(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    Promise.all([
      ordersApi.list().catch(() => []),
      usersApi.list().catch(() => []),
    ])
      .then(([ordersData, usersData]) => {
        if (cancelled) return
        const userMap = {}
        for (const u of usersData || []) userMap[u.id] = u
        setUsersById(userMap)
        setOrders(Array.isArray(ordersData) ? ordersData : [])
      })
      .catch((err) => {
        if (!cancelled) setError(extractErrorMessage(err, 'Falha ao carregar pedidos.'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const enriched = useMemo(
    () => orders.map((o) => {
      const user = usersById[o.userId]
      return {
        ...o,
        customer: user?.name || '—',
        email: user?.email || o.userId,
        address: user?.address || null,
        itemsCount: (o.items || []).reduce((sum, i) => sum + (i.quantity || 0), 0),
      }
    }),
    [orders, usersById]
  )

  const filtered = useMemo(() => {
    return enriched.filter((o) => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        (o.id || '').toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
      const matchStatus = !statusFilter || o.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [enriched, search, statusFilter])

  const openEdit = (row) => {
    setEditing(row)
    setEditForm({
      status: row.status,
      trackingCode: row.trackingCode || '',
      carrier: row.carrier || 'Correios',
      trackingUrl: row.trackingUrl || '',
    })
  }

  const closeEdit = () => {
    setEditing(null)
    setEditForm(null)
  }

  const allowedNextStatuses = useMemo(() => {
    if (!editing) return STATUS_OPTIONS
    const allowed = new Set(ALLOWED_TRANSITIONS[editing.status] || [editing.status])
    return STATUS_OPTIONS.map((opt) => ({
      ...opt,
      disabled: !allowed.has(opt.value),
    }))
  }, [editing])

  const canEditTracking = editing && TRACKING_EDITABLE_STATUSES.has(editForm?.status || editing.status)

  const handleSave = async () => {
    setSaving(true)
    try {
      let updated = null

      // Bloqueio de transição inválida no client (defesa em profundidade)
      const allowed = new Set(ALLOWED_TRANSITIONS[editing.status] || [editing.status])
      if (!allowed.has(editForm.status)) {
        toast.current?.show({
          severity: 'warn',
          summary: 'Transição não permitida',
          detail: `Não é possível mudar de ${STATUS_META[editing.status].label} para ${STATUS_META[editForm.status].label}.`,
          life: 3500,
        })
        return
      }

      if (editForm.status && editForm.status !== editing.status) {
        updated = await ordersApi.updateStatus(editing.id, editForm.status)
      }

      if (canEditTracking && editForm.trackingCode && editForm.carrier) {
        updated = await ordersApi.updateTracking(editing.id, {
          trackingCode: editForm.trackingCode.trim(),
          carrier: editForm.carrier.trim(),
          trackingUrl: editForm.trackingUrl?.trim() || null,
        })
      }

      if (updated) {
        setOrders((prev) => prev.map((o) => (o.id === editing.id ? updated : o)))
      }

      toast.current?.show({
        severity: 'success',
        summary: 'Pedido atualizado',
        detail: `#${editing.id} salvo com sucesso.`,
        life: 2500,
      })
      closeEdit()
    } catch (err) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro ao salvar',
        detail: extractErrorMessage(err, 'Falha ao atualizar pedido.'),
        life: 3500,
      })
    } finally {
      setSaving(false)
    }
  }

  const idTemplate = (row) => (
    <span className="font-mono text-xs text-white">#{row.id?.slice(-8) || '—'}</span>
  )

  const customerTemplate = (row) => (
    <div className="min-w-0">
      <p className="text-sm text-white truncate leading-tight">{row.customer}</p>
      <p className="text-xs text-gray-500 truncate">{row.email}</p>
    </div>
  )

  const addressTemplate = (row) => (
    <span
      className="text-xs text-gray-300"
      title={formatAddressFull(row.address)}
    >
      {formatAddressShort(row.address)}
    </span>
  )

  const statusTemplate = (row) => {
    const meta = STATUS_META[row.status] || STATUS_META.PENDING
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
        emptyMessage={loading ? 'Carregando...' : 'Nenhum pedido encontrado.'}
      >
        <Column header="Pedido"    body={idTemplate}       pt={columnPt} />
        <Column header="Cliente"   body={customerTemplate} pt={columnPt} />
        <Column header="Endereço"  body={addressTemplate}  pt={columnPt} />
        <Column header="Total"     body={totalTemplate}    pt={columnPt} />
        <Column header="Status"    body={statusTemplate}   pt={columnPt} />
        <Column header="Rastreio"  body={trackingTemplate} pt={columnPt} />
        <Column header="Data"      body={dateTemplate}     pt={columnPt} />
        <Column header=""          body={actionsTemplate}  pt={columnPt} />
      </DataTable>

      <Dialog
        visible={!!editing}
        onHide={closeEdit}
        showHeader={false}
        modal
        dismissableMask
        pt={{
          mask: { className: 'bg-black/70 backdrop-blur-sm' },
          root: { className: 'w-full max-w-lg mx-4 max-h-[90vh]' },
          content: { className: 'bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden p-0 flex flex-col max-h-[90vh]' },
        }}
      >
        {editing && editForm && (
          <div className="flex flex-col max-h-[90vh]">
            <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between shrink-0">
              <div className="min-w-0">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Editar pedido</p>
                <p className="text-sm font-mono font-semibold text-white truncate">#{editing.id}</p>
              </div>
              <button
                type="button"
                onClick={closeEdit}
                className="text-gray-500 hover:text-white transition-colors shrink-0"
                aria-label="Fechar"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto flex-1 min-h-0">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-500 mb-0.5">Cliente</p>
                  <p className="text-white truncate">{editing.customer}</p>
                  <p className="text-gray-500 truncate text-[11px]">{editing.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Total pago</p>
                  <p className="text-green-400 font-medium">{formatBRL(editing.total)}</p>
                  <p className="text-gray-500 text-[11px]">{formatDate(editing.createdAt)}</p>
                </div>
              </div>

              {editing.address && (
                <div className="bg-gray-800/40 border border-gray-800 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <MapPin size={12} className="text-gray-400" />
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider">Endereço de entrega</p>
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    {formatAddressFull(editing.address) || '—'}
                  </p>
                </div>
              )}

              <div>
                <label className={labelClass}>Status</label>
                <Dropdown
                  value={editForm.status}
                  onChange={(e) => setEditForm((f) => ({ ...f, status: e.value }))}
                  options={allowedNextStatuses}
                  optionDisabled="disabled"
                  pt={dropdownPt}
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Apenas transições válidas estão habilitadas.
                </p>
              </div>

              <div className={canEditTracking ? '' : 'opacity-60'}>
                <label className={labelClass}>
                  Código de rastreio
                  {!canEditTracking && (
                    <span className="ml-2 text-[10px] text-yellow-400 normal-case">
                      Disponível após confirmação do pagamento
                    </span>
                  )}
                </label>
                <InputText
                  value={editForm.trackingCode}
                  onChange={(e) => setEditForm((f) => ({ ...f, trackingCode: e.target.value }))}
                  placeholder="BR123456789MS"
                  disabled={!canEditTracking}
                  className={canEditTracking ? inputClass : inputDisabledClass}
                />
              </div>

              <div className={canEditTracking ? '' : 'opacity-60'}>
                <label className={labelClass}>Transportadora</label>
                <InputText
                  value={editForm.carrier}
                  onChange={(e) => setEditForm((f) => ({ ...f, carrier: e.target.value }))}
                  placeholder="Correios"
                  disabled={!canEditTracking}
                  className={canEditTracking ? inputClass : inputDisabledClass}
                />
              </div>
            </div>

            <div className="flex gap-2 px-5 py-4 border-t border-gray-800 shrink-0">
              <Button
                type="button"
                onClick={closeEdit}
                label="Cancelar"
                className="flex-1 text-sm font-medium text-gray-300 border border-gray-700 py-2 rounded-lg hover:border-gray-500 hover:text-white transition-colors bg-transparent"
              />
              <Button
                type="button"
                onClick={handleSave}
                disabled={saving}
                label={saving ? 'Salvando...' : 'Salvar alterações'}
                className="flex-1 text-sm font-medium text-black bg-white py-2 rounded-lg hover:bg-gray-200 transition-colors border-0 disabled:opacity-60"
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default AdminOrders
