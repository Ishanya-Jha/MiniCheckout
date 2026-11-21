import { formatCurrency } from "../utils/currency";

export default function ProductCard({ product, onAdd, quantity }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.imageAlt} className="product-image" />
        <span className="product-tag">{product.category}</span>
      </div>
      <div className="product-details">
        <div className="product-meta">{product.color} <span>·</span> Everyday edit</div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card-bottom">
          <strong className="product-price">{formatCurrency(product.price)}</strong>
          <button className="add-button" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`}>
            <span aria-hidden="true">＋</span> {quantity ? `Add another (${quantity})` : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
