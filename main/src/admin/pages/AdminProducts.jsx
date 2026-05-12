import { useEffect, useMemo, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { MultiSelect } from 'primereact/multiselect'
import { Checkbox } from 'primereact/checkbox'
import { Package, Search, Plus, Pencil, Trash2, XCircle, AlertTriangle } from 'lucide-react'
import ProductImage from '../../Components/ProductImage'
import { adminTablePt, adminColumnPt, adminPaginatorProps } from '../components/tableStyles'
import { productsApi } from '../../api/products'
import { extractErrorMessage } from '../../api/client'
import { formatCategory } from '../../utils/categories'

const FALLBACK_IMAGE_URL = '/assets/652292.png'

const formatBRL = (value) =>
  (typeof value === 'number' ? value : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const tablePt = adminTablePt
const columnPt = adminColumnPt

const ALL_CATEGORIES = [
  'DEATH_METAL', 'NEW_ARRIVALS', 'DAILY_DEALS', 'BLACK_METAL', 'POP',
  'BRAZILLIAN_MUSIC', 'INTERNATIONAL', 'FOLK', 'PROG_METAL', 'ROCK',
  'ELECTRONIC', 'NU_METAL', 'HARD_ROCK', 'SLUDGE_METAL', 'HEAVY_METAL',
  'UNDERGROUND', 'CD', 'VINYL', 'OFFICIAL_MERCHANDISE',
].map((c) => ({ label: formatCategory(c), value: c }))

const emptyForm = {
  title: '',
  description: '',
  price: null,
  imageUrl: '',
  categories: [],
  stockQuantity: 0,
  available: true,
}

const inputClass = 'w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors'
const labelClass = 'block text-xs font-medium text-gray-400 mb-1.5'

const dropdownPt = {
  root: { className: 'w-full min-h-[38px] bg-gray-800 border border-gray-700 rounded-lg flex items-center hover:border-gray-600 focus-within:border-gray-500 transition-colors' },
  labelContainer: { className: 'flex-1 min-w-0 overflow-hidden' },
  label: { className: 'bg-transparent text-white text-sm px-3 py-2 truncate' },
  trigger: { className: 'text-gray-500 w-8 flex items-center justify-center shrink-0' },
  panel: { className: 'bg-gray-900 border border-gray-700 rounded-lg mt-1 shadow-xl shadow-black/50 overflow-hidden' },
  list: { className: 'list-none m-0 p-1 max-h-64 overflow-y-auto' },
  item: ({ context }) => ({
    className: `text-sm px-3 py-2 cursor-pointer list-none flex items-center gap-2.5 transition-colors rounded ${
      context?.selected
        ? 'bg-white/10 text-white font-medium'
        : 'text-gray-200 hover:bg-gray-800'
    }`,
  }),
  header: { className: 'flex items-center px-2 py-2 border-b border-gray-800 bg-gray-900' },
  headerCheckboxContainer: { className: 'hidden' },
  filterContainer: { className: 'relative flex-1' },
  filterInput: { className: 'w-full bg-gray-800 border border-gray-700 rounded-md pl-3 pr-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500' },
  filterIcon: { className: 'hidden' },
  closeButton: { className: 'hidden' },
  checkboxContainer: { className: 'flex items-center justify-center shrink-0' },
  checkbox: {
    root: ({ context }) => ({
      className: `w-4 h-4 rounded-sm border flex items-center justify-center transition-colors shrink-0 ${
        context?.checked
          ? 'bg-white border-white'
          : 'bg-transparent border-gray-500'
      }`,
    }),
    input: { className: 'absolute opacity-0 w-0 h-0 pointer-events-none' },
    icon: { className: 'text-black w-3 h-3' },
  },
}

const numberInputPt = {
  root: { className: 'w-full' },
  input: { root: { className: inputClass } },
  buttonGroup: { className: 'hidden' },
}

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const [deleting, setDeleting] = useState(null)
  const [deletingInProgress, setDeletingInProgress] = useState(false)

  const toast = useRef(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    productsApi
      .list()
      .then((data) => { if (!cancelled) setProducts(Array.isArray(data) ? data : []) })
      .catch((err) => { if (!cancelled) setError(extractErrorMessage(err, 'Falha ao carregar produtos.')) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const filtered = useMemo(() => {
    if (!search) return products
    return products.filter((p) => (p.title || '').toLowerCase().includes(search.toLowerCase()))
  }, [search, products])

  const normalized = filtered.map((p) => ({
    ...p,
    available: p.available ?? (p.stockQuantity > 0),
    stock: p.stock ?? p.stockQuantity ?? 0,
    categories: p.categories || [],
  }))

  const openCreate = () => {
    setEditing({ mode: 'create' })
    setEditForm(emptyForm)
    setFormError('')
  }

  const openEdit = (row) => {
    setEditing({ mode: 'edit', id: row.id })
    setEditForm({
      title: row.title || '',
      description: row.description || '',
      price: typeof row.price === 'number' ? row.price : null,
      imageUrl: row.imageUrl || '',
      categories: row.categories || [],
      stockQuantity: row.stockQuantity ?? row.stock ?? 0,
      available: row.available ?? true,
    })
    setFormError('')
  }

  const closeEdit = () => {
    setEditing(null)
    setEditForm(emptyForm)
    setFormError('')
  }

  const validateForm = () => {
    if (!editForm.title.trim()) return 'Informe o título.'
    if (!editForm.description.trim()) return 'Informe a descrição.'
    if (editForm.price == null || editForm.price <= 0) return 'Informe um preço válido.'
    if (!editForm.categories || editForm.categories.length === 0) return 'Selecione ao menos uma categoria.'
    if (editForm.stockQuantity == null || editForm.stockQuantity < 0) return 'Estoque inválido.'
    return ''
  }

  const handleSave = async () => {
    const err = validateForm()
    if (err) { setFormError(err); return }

    setSaving(true)
    try {
      const imageUrl = editForm.imageUrl.trim() || FALLBACK_IMAGE_URL
      const payload = {
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        price: editForm.price,
        imageUrl,
        categories: editForm.categories,
        maxInstallments: 1,
        stockQuantity: editForm.stockQuantity,
        available: editForm.available,
      }

      let saved
      if (editing.mode === 'create') {
        saved = await productsApi.create(payload)
        setProducts((prev) => [saved, ...prev])
      } else {
        saved = await productsApi.update(editing.id, payload)
        setProducts((prev) => prev.map((p) => (p.id === editing.id ? saved : p)))
      }

      toast.current?.show({
        severity: 'success',
        summary: editing.mode === 'create' ? 'Produto criado' : 'Produto atualizado',
        detail: saved.title,
        life: 2500,
      })
      closeEdit()
    } catch (err) {
      setFormError(extractErrorMessage(err, 'Falha ao salvar produto.'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setDeletingInProgress(true)
    try {
      await productsApi.remove(deleting.id)
      setProducts((prev) => prev.filter((p) => p.id !== deleting.id))
      toast.current?.show({
        severity: 'success',
        summary: 'Produto removido',
        detail: deleting.title,
        life: 2500,
      })
      setDeleting(null)
    } catch (err) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro ao remover',
        detail: extractErrorMessage(err, 'Falha ao remover produto.'),
        life: 3500,
      })
    } finally {
      setDeletingInProgress(false)
    }
  }

  const productTemplate = (row) => (
    <div className="flex items-center gap-3 min-w-0">
      <ProductImage
        src={row.imageUrl}
        alt={row.title}
        className="w-10 h-10 rounded-lg object-cover shrink-0 bg-gray-800"
      />
      <p className="text-sm text-white truncate">{row.title}</p>
    </div>
  )

  const categoriesTemplate = (row) => (
    <div className="flex flex-wrap gap-1">
      {row.categories.slice(0, 2).map((cat) => (
        <span key={cat} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
          {formatCategory(cat)}
        </span>
      ))}
      {row.categories.length > 2 && (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-500 border border-gray-700">
          +{row.categories.length - 2}
        </span>
      )}
    </div>
  )

  const priceTemplate = (row) => (
    <span className="text-sm font-medium text-green-400">{formatBRL(row.price)}</span>
  )

  const stockTemplate = (row) => (
    <span className={`text-sm font-medium ${row.stock === 0 ? 'text-red-400' : row.stock < 10 ? 'text-yellow-400' : 'text-gray-300'}`}>
      {row.stock}
    </span>
  )

  const statusTemplate = (row) => (
    <span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border ${
      row.available
        ? 'text-green-400 bg-green-500/10 border-green-500/30'
        : 'text-gray-400 bg-gray-800 border-gray-700'
    }`}>
      {row.available ? 'Ativo' : 'Inativo'}
    </span>
  )

  const actionsTemplate = (row) => (
    <div className="flex items-center gap-1 justify-end">
      <button
        type="button"
        onClick={() => openEdit(row)}
        aria-label="Editar"
        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
      >
        <Pencil size={14} />
      </button>
      <button
        type="button"
        onClick={() => setDeleting(row)}
        aria-label="Remover"
        className="p-1.5 rounded-lg text-gray-400 hover:bg-red-900/30 hover:text-red-400 transition-colors"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )

  return (
    <div>
      <Toast ref={toast} position="top-right" />

      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <Package size={22} className="text-white" />
          <h1 className="text-2xl font-bold text-white">Produtos</h1>
        </div>
        <Button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors border-0 shrink-0"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Novo produto</span>
          <span className="sm:hidden">Novo</span>
        </Button>
      </div>
      <p className="text-sm text-gray-400 mb-6">Cadastre, edite e gerencie o catálogo da loja.</p>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        <InputText
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar produtos..."
          className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
        />
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-900/40 rounded-lg px-4 py-3 mb-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <DataTable
        value={normalized}
        pt={tablePt}
        rowHover
        stripedRows
        loading={loading}
        {...adminPaginatorProps}
        emptyMessage={loading ? 'Carregando...' : 'Nenhum produto encontrado.'}
      >
        <Column header="Produto"    body={productTemplate}    pt={columnPt} />
        <Column header="Categorias" body={categoriesTemplate} pt={columnPt} />
        <Column header="Preço"      body={priceTemplate}      pt={columnPt} />
        <Column header="Estoque"    body={stockTemplate}      pt={columnPt} />
        <Column header="Status"     body={statusTemplate}     pt={columnPt} />
        <Column header=""           body={actionsTemplate}    pt={columnPt} />
      </DataTable>

      <Dialog
        visible={!!editing}
        onHide={closeEdit}
        showHeader={false}
        modal
        dismissableMask
        pt={{
          mask: { className: 'bg-black/70 backdrop-blur-sm' },
          root: { className: 'w-full max-w-2xl mx-4 max-h-[90vh]' },
          content: { className: 'bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden p-0 flex flex-col max-h-[90vh]' },
        }}
      >
        {editing && (
          <div className="flex flex-col max-h-[90vh]">
            <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between shrink-0">
              <div className="min-w-0">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {editing.mode === 'create' ? 'Novo produto' : 'Editar produto'}
                </p>
                <p className="text-sm font-semibold text-white truncate">
                  {editing.mode === 'create' ? 'Cadastrar no catálogo' : editForm.title || '—'}
                </p>
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

            <div className="p-5 space-y-3 overflow-y-auto flex-1 min-h-0">
              {formError && (
                <div className="bg-red-900/20 border border-red-900/40 rounded-lg px-3 py-2 text-xs text-red-300">
                  {formError}
                </div>
              )}

              <div>
                <label className={labelClass}>Título</label>
                <InputText
                  value={editForm.title}
                  onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Nome do produto"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Descrição</label>
                <InputTextarea
                  value={editForm.description}
                  onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  autoResize
                  placeholder="Descrição detalhada"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>URL da imagem (opcional)</label>
                <InputText
                  value={editForm.imageUrl}
                  onChange={(e) => setEditForm((f) => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="https://..."
                  className={inputClass}
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Se vazio, será usada uma imagem padrão.
                </p>
                <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
                  <ProductImage src={editForm.imageUrl} alt="preview" className="w-full h-full object-cover" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Categorias</label>
                <MultiSelect
                  value={editForm.categories}
                  onChange={(e) => setEditForm((f) => ({ ...f, categories: e.value }))}
                  options={ALL_CATEGORIES}
                  placeholder="Selecione categorias"
                  filter
                  display="comma"
                  pt={dropdownPt}
                />
                {editForm.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {editForm.categories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-200 border border-gray-700"
                      >
                        {formatCategory(cat)}
                        <button
                          type="button"
                          onClick={() => setEditForm((f) => ({
                            ...f,
                            categories: f.categories.filter((c) => c !== cat),
                          }))}
                          aria-label={`Remover ${formatCategory(cat)}`}
                          className="text-gray-500 hover:text-white transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Preço (R$)</label>
                  <InputNumber
                    value={editForm.price}
                    onValueChange={(e) => setEditForm((f) => ({ ...f, price: e.value }))}
                    mode="decimal"
                    minFractionDigits={2}
                    maxFractionDigits={2}
                    placeholder="0,00"
                    pt={numberInputPt}
                  />
                </div>
                <div>
                  <label className={labelClass}>Estoque</label>
                  <InputNumber
                    value={editForm.stockQuantity}
                    onValueChange={(e) => setEditForm((f) => ({ ...f, stockQuantity: e.value ?? 0 }))}
                    min={0}
                    pt={numberInputPt}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  inputId="available"
                  checked={editForm.available}
                  onChange={(e) => setEditForm((f) => ({ ...f, available: e.checked }))}
                />
                <label htmlFor="available" className="text-sm text-gray-300 cursor-pointer">
                  Produto ativo (visível na loja)
                </label>
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
                label={saving ? 'Salvando...' : (editing.mode === 'create' ? 'Criar produto' : 'Salvar alterações')}
                className="flex-1 text-sm font-medium text-black bg-white py-2 rounded-lg hover:bg-gray-200 transition-colors border-0 disabled:opacity-60"
              />
            </div>
          </div>
        )}
      </Dialog>

      <Dialog
        visible={!!deleting}
        onHide={() => setDeleting(null)}
        showHeader={false}
        modal
        dismissableMask
        pt={{
          mask: { className: 'bg-black/70 backdrop-blur-sm' },
          root: { className: 'w-full max-w-sm mx-4' },
          content: { className: 'bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden p-0' },
        }}
      >
        {deleting && (
          <div>
            <div className="p-5 text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle size={22} className="text-red-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Remover produto?</h3>
              <p className="text-sm text-gray-400">
                <span className="text-gray-200">{deleting.title}</span> será removido permanentemente do catálogo.
              </p>
            </div>
            <div className="flex gap-2 px-5 pb-5">
              <Button
                type="button"
                onClick={() => setDeleting(null)}
                label="Cancelar"
                className="flex-1 text-sm font-medium text-gray-300 border border-gray-700 py-2 rounded-lg hover:border-gray-500 hover:text-white transition-colors bg-transparent"
              />
              <Button
                type="button"
                onClick={handleDelete}
                disabled={deletingInProgress}
                label={deletingInProgress ? 'Removendo...' : 'Remover'}
                className="flex-1 text-sm font-medium text-white bg-red-600 py-2 rounded-lg hover:bg-red-500 transition-colors border-0 disabled:opacity-60"
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default AdminProducts
