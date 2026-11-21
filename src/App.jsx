
import { useRef, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import CartPanel from "./components/CartPanel";
import CheckoutModal from "./components/CheckoutModal";
import OrderConfirmation from "./components/OrderConfirmation";
import { PRODUCTS } from "./data/products";
import { useCart } from "./hooks/useCart";
import { createOrderReference } from "./utils/orderReference";

export default function App() {
  const { items, itemCount, total, dispatch } = useCart();

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Products");

  const submissionLock = useRef(false);

  const addProduct = (product) => {
    if (submissionLock.current) return;
    dispatch({ type: "ADD", product });
  };

  const openCheckout = () => {
    setCartOpen(false);

    if (items.length === 0) {
      setError("Your cart is empty. Add at least one product before checkout.");
      setCheckoutOpen(false);
      setCartOpen(true);
      return;
    }

    setError("");
    setCheckoutOpen(true);
  };

  const placeOrder = () => {
    if (submissionLock.current) return;

    if (items.length === 0) {
      setError("Your cart is empty. Add at least one product before checkout.");
      setCheckoutOpen(false);
      setCartOpen(true);
      return;
    }

    if (!customerName.trim()) {
      setError("Please enter your name before placing the order.");
      return;
    }

    // Prevent duplicate orders from rapid repeated clicks.
    submissionLock.current = true;

    const placedOrder = {
      reference: createOrderReference(),
      customerName: customerName.trim(),
      items: items.map((item) => ({ ...item })),
      total,
    };

    setOrder(placedOrder);
    setCheckoutOpen(false);
    setCartOpen(false);
    setError("");
  };

  const startAgain = () => {
    submissionLock.current = false;
    dispatch({ type: "CLEAR" });
    setCustomerName("");
    setError("");
    setOrder(null);
    setCheckoutOpen(false);
    setCartOpen(false);
    setSearchQuery("");
    setActiveCategory("All Products");
  };

  // Product search and category filtering.
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === "All Products" ||
      product.category === activeCategory;

    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.color.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-shell" id="top">
      <div className="page-container">

        <Header
          itemCount={itemCount}
          onCartClick={() => setCartOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <main>
          {!order ? (
            <>
              {/* Hero section */}
              <section
                className="hero"
                aria-label="Seasonal fashion collection"
              >
                <div className="hero-copy">
                  <p className="hero-kicker">THE EVERYDAY EDIT</p>

                  <h1>
                    Style that feels<br />
                    <em>like you.</em>
                  </h1>

                  <p>
                    Thoughtful essentials for wherever the day takes you.
                  </p>

                  <a href="#collection" className="hero-button">
                    Explore the collection <span>→</span>
                  </a>
                </div>

                <div className="hero-art" aria-hidden="true">
                  <div className="hero-orbit orbit-one" />
                  <div className="hero-orbit orbit-two" />
                  <div className="hero-sun" />

                  <div className="hero-ribbon">
                    NEW SEASON<br />
                    <strong>JUST LANDED</strong>
                  </div>

                  <div className="hero-shape shape-one" />
                  <div className="hero-shape shape-two" />

                  <span className="hero-star star-one">✳</span>
                  <span className="hero-star star-two">✳</span>
                </div>

                <div className="hero-index">
                  <span /> 01 / 01
                </div>
              </section>

              {/* Product collection */}
              <section className="collection-section" id="collection">
                <div className="section-intro">
                  <div>
                    <p className="eyebrow">CURATED FOR EVERY DAY</p>
                    <h2>Pieces to make your own.</h2>
                  </div>

                  <span className="collection-count">
                    THE MINI COLLECTION{" "}
                    <b>
                      {filteredProducts.length.toString().padStart(2, "0")}
                    </b>
                  </span>
                </div>

                <div className="product-grid">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        quantity={
                          items.find(
                            (item) => item.id === product.id
                          )?.quantity ?? 0
                        }
                        onAdd={addProduct}
                      />
                    ))
                  ) : (
                    <div className="no-products" role="status">
                      <h3>No products found</h3>

                      <p>
                        Try another search or choose a different category.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("All Products");
                        }}
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {/* Store information */}
              <section
                className="promise-strip"
                aria-label="Store information"
              >
                <div>
                  <span>✳</span>
                  <strong>Considered essentials</strong>
                  <small>Made for everyday moments</small>
                </div>

                <div>
                  <span>◇</span>
                  <strong>Easy checkout</strong>
                  <small>Clear totals, no surprises</small>
                </div>

                <div>
                  <span>♡</span>
                  <strong>Demo storefront</strong>
                  <small>Built for checkout testing</small>
                </div>
              </section>
            </>
          ) : (
            <OrderConfirmation
              order={order}
              onStartAgain={startAgain}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="site-footer">
          <span className="footer-brand">
            MiniCheckout<span>.</span>
          </span>

          <span>
            Independent demo storefront · No real payments
          </span>

          <span>
            © 2026 Ishanya Jha. All rights reserved.
          </span>
        </footer>
      </div>

      {/* Cart and checkout */}
      {!order && (
        <>
          <CartPanel
            items={items}
            total={total}
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            onIncrease={(id) =>
              dispatch({ type: "INCREASE", id })
            }
            onDecrease={(id) =>
              dispatch({ type: "DECREASE", id })
            }
            onRemove={(id) =>
              dispatch({ type: "REMOVE", id })
            }
            onCheckout={openCheckout}
            error={error}
          />

          <CheckoutModal
            open={checkoutOpen}
            name={customerName}
            onNameChange={(value) => {
              setCustomerName(value);
              setError("");
            }}
            error={error}
            onSubmit={placeOrder}
            onClose={() => {
              setCheckoutOpen(false);
              setError("");
            }}
          />
        </>
      )}
    </div>
  );
}
