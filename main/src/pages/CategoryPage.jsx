import { useParams } from 'react-router-dom'
import { Tag } from 'lucide-react'
import { getByCategory } from '../data/catalog'
import ProductCard from '../Components/ProductCard'

const categoryMeta = {
  'black-metal':               { label: 'Black Metal',                  category: 'Black Metal',                 accent: 'text-purple-400',  border: 'border-purple-500/20', description: 'O som mais sombrio e atmosférico do metal extremo.' },
  'death-metal':               { label: 'Death Metal',                  category: 'Death Metal',                 accent: 'text-red-400',     border: 'border-red-500/20',    description: 'Riffs pesados, baterias brutais e vocais guturais.' },
  'pop':                       { label: 'PoP',                          category: 'PoP',                         accent: 'text-pink-400',    border: 'border-pink-500/20',   description: 'Os maiores hits da música pop mundial.' },
  'brasileira':                { label: 'Brasileira',                   category: 'Brasileira',                  accent: 'text-yellow-400',  border: 'border-yellow-500/20', description: 'O melhor da música nacional.' },
  'produtos-licenciados':      { label: 'Produtos Licenciados',         category: 'Produtos Licenciados',        accent: 'text-orange-400',  border: 'border-orange-500/20', description: 'Merchandise oficial das suas bandas favoritas.' },
  'vinil':                     { label: 'Vinil',                        category: 'Vinil',                       accent: 'text-blue-400',    border: 'border-blue-500/20',   description: 'A experiência analógica e o som quente do vinil.' },
  'cds-importados-e-nacionais':{ label: 'CDs Importados e Nacionais',   category: 'CDs Importados e Nacionais', accent: 'text-cyan-400',    border: 'border-cyan-500/20',   description: 'CDs originais importados e nacionais.' },
  'nu-metal':                  { label: 'Nu Metal',                     category: 'Nu Metal',                    accent: 'text-green-400',   border: 'border-green-500/20',  description: 'A fusão pesada de metal, rap e rock alternativo.' },
}


const CategoryPage = () => {
  const { slug } = useParams()
  const meta = categoryMeta[slug]

  if (!meta) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Categoria não encontrada.</p>
      </div>
    )
  }

  const products = getByCategory(meta.category)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className={`border-l-4 ${meta.border.replace('border-', 'border-l-').replace('/20', '')} pl-4 mb-8`}>
          <div className="flex items-center gap-2 mb-1">
            <Tag size={14} className={`${meta.accent} shrink-0`} />
            <span className="text-xs text-gray-500 uppercase tracking-widest">Categoria</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-bold ${meta.accent}`}>{meta.label}</h1>
          <p className="text-gray-400 text-sm mt-1">{meta.description}</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 text-gray-600">
            <p className="text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-500 mb-6">{products.length} {products.length === 1 ? 'produto' : 'produtos'}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
