import { useEffect, useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Package, Search, Plus, Pencil, Trash2 } from 'lucide-react'
import ProductImage from '../../Components/ProductImage'
import { adminTablePt, adminColumnPt, adminPaginatorProps } from '../components/tableStyles'
import { productsApi } from '../../api/products'
import { extractErrorMessage } from '../../api/client'
import { formatCategory } from '../../utils/categories'

const formatBRL = (value) =>
  (typeof value === 'number' ? value : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const tablePt = adminTablePt
const columnPt = adminColumnPt

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    productsApi
      .list()
      .then((data) => {
        if (!cancelled) setProducts(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (!cancelled) setError(extractErrorMessage(err, 'Falha ao carregar produtos.'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
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

  const actionsTemplate = () => (
    <div className="flex items-center gap-1 justify-end">
      <button
        type="button"
        aria-label="Editar"
        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
      >
        <Pencil size={14} />
      </button>
      <button
        type="button"
        aria-label="Remover"
        className="p-1.5 rounded-lg text-gray-400 hover:bg-red-900/30 hover:text-red-400 transition-colors"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <Package size={22} className="text-white" />
          <h1 className="text-2xl font-bold text-white">Produtos</h1>
        </div>
        <Button
          type="button"
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
    </div>
  )
}

export default AdminProducts
