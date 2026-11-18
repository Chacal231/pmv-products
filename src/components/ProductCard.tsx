import type { Product } from '../types/Product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

// Formatea la fecha al estilo español: 18 de noviembre de 2026
const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article className="card h-100 shadow-sm overflow-hidden product-card">
      {/* Imagen PNG dentro de <figure> con su pie de foto */}
      <figure className="figure m-0">
        <img
          src={product.image_url}
          className="card-img-top figure-img m-0"
          alt={`Imagen de ${product.name}`}
          loading="lazy"
        />
        <figcaption className="figure-caption text-center py-1">{product.name}</figcaption>
      </figure>

      <div className="card-body d-flex flex-column">
        <h2 className="card-title h5">{product.name}</h2>
        {product.description && <p className="card-text text-secondary">{product.description}</p>}

        {/* Vídeo MP4: <video> y, si el navegador no lo soporta, <object> como alternativa */}
        <div className="ratio ratio-4x3 rounded overflow-hidden mb-3 bg-dark">
          <video controls muted playsInline preload="metadata">
            <source src={product.video_url} type="video/mp4" />
            <object data={product.video_url} type="video/mp4">
              Tu navegador no puede reproducir el vídeo.{' '}
              <a href={product.video_url}>Descárgalo aquí</a>.
            </object>
          </video>
        </div>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="badge text-bg-primary fs-6">{formatPrice(product.price)}</span>
          {/* Fecha con la etiqueta semántica <time> */}
          <time className="small text-body-secondary" dateTime={product.created_at}>
            📅 {formatDate(product.created_at)}
          </time>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
