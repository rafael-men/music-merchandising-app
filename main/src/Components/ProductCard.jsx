import { Link } from 'react-router-dom'
import { Card } from 'primereact/card'
import ProductImage from './ProductImage'

const ProductCard = ({ product }) => (
  <Card
    unstyled
    header={
      <div className="bg-black w-full overflow-hidden aspect-square">
        <ProductImage
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    }
    footer={
      <Link
        to={`/produto/${product.id}`}
        className="block text-center no-underline text-xs font-medium bg-white text-black py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
      >
        Ver Detalhes
      </Link>
    }
    pt={{
      root:    { className: 'group h-full flex flex-col rounded-xl border border-gray-800 bg-gray-900 overflow-hidden hover:border-gray-600 hover:shadow-lg hover:shadow-black/50 hover:-translate-y-0.5 transition-all duration-300 cursor-default' },
      body:    { className: 'flex flex-col flex-1 p-3 sm:p-4' },
      content: { className: 'flex flex-col flex-1 p-0' },
      footer:  { className: 'pt-3 mt-auto' },
    }}
  >
    <div className="flex flex-wrap gap-1 mb-2">
      {product.categories.map((cat) => (
        <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-200 transition-colors duration-150 cursor-pointer">
          {cat}
        </span>
      ))}
    </div>
    <p className="text-sm font-semibold text-gray-100 leading-snug mb-2 line-clamp-2">{product.title}</p>
    <p className="text-base font-bold text-green-400 mt-auto">{product.price}</p>
  </Card>
)

export default ProductCard
