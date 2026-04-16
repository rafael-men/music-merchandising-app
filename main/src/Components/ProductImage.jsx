import { useState } from 'react'
import fallbackImage from '../Assets/652292.png'

const ProductImage = ({ src, alt, className = '', ...rest }) => {
  const [hasError, setHasError] = useState(false)
  const resolvedSrc = !src || hasError ? fallbackImage : src

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  )
}

export default ProductImage
