import { formatCurrency } from "../utils/currency";

export default function OrderConfirmation({ order, onStartAgain }) {
  return (
    <section className="confirmation-card" data-testid="order-confirmation" aria-live="polite">
      <div className="success-mark" aria-hidden="true">✓</div>
      <p className="eyebrow">ORDER PLACED SUCCESSFULLY</p>
      <h1>Thank you, {order.customerName}.</h1>
      <p className="confirmation-copy">Your order has been confirmed. This is a demo checkout, so no payment was collected.</p>
      <div className="reference-box">
        <span>ORDER REFERENCE</span>
        <strong data-testid="order-reference">{order.reference}</strong>
      </div>
      <div className="confirmation-items">
        {order.items.map((item) => (
          <div className="confirmation-item" key={item.id}>
            <span>{item.name} × {item.quantity}</span>
            <strong>{formatCurrency(item.price * item.quantity)}</strong>
          </div>
        ))}
      </div>
      <div className="confirmation-total"><span>Order total</span><strong>{formatCurrency(order.total)}</strong></div>
      <button className="checkout-button" onClick={onStartAgain}>Start a new order <span aria-hidden="true">→</span></button>
    </section>
  );
}
