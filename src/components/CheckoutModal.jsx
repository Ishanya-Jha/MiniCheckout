export default function CheckoutModal({ open, name, onNameChange, error, onSubmit, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
        <div className="modal-heading">
          <div>
            <p className="eyebrow">JUST ONE LAST STEP</p>
            <h2 id="checkout-title">Complete your order</h2>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close checkout">×</button>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
          <label htmlFor="customer-name">Your name <span>*</span></label>
          <input
            id="customer-name"
            name="customerName"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            aria-describedby={error ? "checkout-error" : undefined}
            aria-invalid={Boolean(error)}
          />
          {error && <p className="error-message" id="checkout-error" role="alert">{error}</p>}
          <p className="form-hint">Your order confirmation will be shown here after submission.</p>
          <button className="checkout-button modal-submit" type="submit">Place order <span aria-hidden="true">→</span></button>
        </form>
      </section>
    </div>
  );
}
