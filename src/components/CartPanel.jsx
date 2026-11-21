import { formatCurrency } from "../utils/currency";

export default function CartPanel({ items, total, onIncrease, onDecrease, onRemove, onCheckout, onClose, isOpen, error }) {
  return (
    <>
      {isOpen && <button className="drawer-backdrop" aria-label="Close cart" onClick={onClose} />}
      <aside className={`cart-drawer ${isOpen ? "is-open" : ""}`} aria-label="Shopping cart" aria-hidden={!isOpen}>
        <div className="drawer-heading">
          <div>
            <span className="drawer-bag" aria-hidden="true">M</span>
            <h2>Your Cart <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-empty" data-testid="empty-cart">
            <div className="empty-bag" aria-hidden="true">♡</div>
            <h3>Your cart is waiting</h3>
            <p>Add a piece from the collection to get started.</p>
            {error && <p className="error-message" role="alert">{error}</p>}
            <button className="checkout-button empty-checkout" onClick={onCheckout}>Proceed to checkout <span aria-hidden="true">→</span></button>
            <button className="text-button" onClick={onClose}>Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {items.map((item) => (
                <article className="cart-line" key={item.id}>
                  <img src={item.image} alt={item.imageAlt} />
                  <div className="cart-line-info">
                    <h3>{item.name}</h3>
                    <span className="cart-line-price">{formatCurrency(item.price)}</span>
                    <div className="quantity-control" aria-label={`${item.name} quantity controls`}>
                      <button aria-label={`Decrease ${item.name} quantity`} onClick={() => onDecrease(item.id)}>−</button>
                      <span data-testid={`quantity-${item.id}`}>{item.quantity}</span>
                      <button aria-label={`Increase ${item.name} quantity`} onClick={() => onIncrease(item.id)}>＋</button>
                    </div>
                  </div>
                  <div className="cart-line-end">
                    <strong>{formatCurrency(item.price * item.quantity)}</strong>
                    <button className="remove-button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>Remove</button>
                  </div>
                </article>
              ))}
            </div>

            <div className="summary-block">
              <div className="summary-row"><span>Subtotal</span><strong>{formatCurrency(total)}</strong></div>
              <div className="summary-row"><span>Shipping</span><strong className="free-shipping">Free</strong></div>
              <div className="summary-total" data-testid="order-total"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
              <button className="checkout-button" onClick={onCheckout}>Proceed to checkout <span aria-hidden="true">→</span></button>
              <p className="secure-note"><span aria-hidden="true">◆</span> Demo checkout · No payment collected</p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
