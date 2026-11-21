
export default function Header({
  itemCount,
  onCartClick,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}) {
  const categories = ["All Products", "Footwear", "Accessories"];

  return (
    <header className="site-header">
      <div className="header-main">
        <a className="brand" href="#top" aria-label="MiniCheckout home">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span>MiniCheckout<span className="brand-dot">.</span></span>
        </a>

        <label className="search-box">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        <div className="header-actions">
          <button
            className="icon-button cart-trigger"
            onClick={onCartClick}
            aria-label={`Open cart, ${itemCount} items`}
          >
            <span aria-hidden="true">♧</span>
            <span className="cart-count" data-testid="cart-count">
              {itemCount}
            </span>
          </button>
          <span className="avatar" aria-label="Guest account">G</span>
        </div>
      </div>

      <nav className="category-nav" aria-label="Main categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-link ${
              activeCategory === category ? "active" : ""
            }`}
            aria-pressed={activeCategory === category}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </nav>
    </header>
  );
}
