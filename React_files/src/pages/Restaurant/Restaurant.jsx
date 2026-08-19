import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/useApp";
import "./Restaurant.css";

const menuData = {
  appetizers: [
    { id: 1, name: "Spring Rolls", emoji: "🥟", price: 5.99, desc: "Crispy vegetable rolls with sweet chili dip" },
    { id: 2, name: "Bruschetta", emoji: "🍞", price: 6.49, desc: "Toasted sourdough with vine tomatoes & basil" },
    { id: 3, name: "Soup of the Day", emoji: "🍲", price: 4.99, desc: "Fresh chef's seasonal daily soup" },
    { id: 4, name: "Garlic Bread", emoji: "🧄", price: 3.99, desc: "Warm artisan baguette with herb garlic butter" },
  ],
  mains: [
    { id: 5, name: "Grilled Chicken", emoji: "🍗", price: 14.99, desc: "Herb-marinated chicken with roasted vegetables" },
    { id: 6, name: "Pasta Primavera", emoji: "🍝", price: 12.99, desc: "Fresh seasonal vegetables in light olive sauce" },
    { id: 7, name: "Veggie Burger", emoji: "🍔", price: 11.49, desc: "Plant-based patty with avocado & crisp greens" },
    { id: 8, name: "Grilled Salmon", emoji: "🐟", price: 16.99, desc: "Pan-seared salmon fillet with lemon & dill" },
    { id: 9, name: "Margherita Pizza", emoji: "🍕", price: 13.49, desc: "San Marzano tomatoes, fresh mozzarella, basil" },
    { id: 10, name: "Stir-Fry Tofu", emoji: "🥘", price: 10.99, desc: "Sesame tofu with crisp wok-tossed greens" },
  ],
  drinks: [
    { id: 11, name: "Fresh Juice", emoji: "🧃", price: 4.49, desc: "Cold-pressed orange, apple, or berry blend" },
    { id: 12, name: "Coffee", emoji: "☕", price: 3.49, desc: "Single-origin pour-over or iced espresso" },
    { id: 13, name: "Sparkling Water", emoji: "💧", price: 2.49, desc: "Mineral water with fresh lemon slice" },
    { id: 14, name: "Smoothie", emoji: "🥤", price: 5.99, desc: "Mango, blueberry, or banana oat blend" },
  ],
  desserts: [
    { id: 15, name: "Chocolate Cake", emoji: "🍫", price: 6.99, desc: "Warm dark chocolate ganache cake" },
    { id: 16, name: "Gelato", emoji: "🍨", price: 4.99, desc: "Artisanal vanilla bean, pistachio, or berry" },
    { id: 17, name: "Fruit Salad", emoji: "🍓", price: 5.49, desc: "Fresh seasonal berries and stone fruits" },
    { id: 18, name: "Cheesecake", emoji: "🍰", price: 7.49, desc: "Classic baked cheesecake with berry compote" },
  ],
};

const categoryLabels = {
  appetizers: { label: "Appetizers", emoji: "🥗" },
  mains: { label: "Main Courses", emoji: "🍽️" },
  drinks: { label: "Drinks", emoji: "🥤" },
  desserts: { label: "Desserts", emoji: "🍰" },
};

const QUICK_SERVER_REQUESTS = [
  "Water with no ice, please. 💧",
  "Could we please have the bill? 🧾",
  "Is this item vegetarian / vegan? 🥗",
  "No spicy ingredients, please. 🌶️",
  "Can I have extra napkins? 🧻",
  "Thank you for your service! 🙏",
];

function Restaurant() {
  const { speakText, language } = useApp();
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("appetizers");
  const [showWaiterView, setShowWaiterView] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [specialRequest, setSpecialRequest] = useState("");

  function addToCart(item) {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(cart.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter((c) => c.id !== id));
  }

  function updateQty(id, delta) {
    setCart(cart.map((c) => {
      if (c.id !== id) return c;
      const newQty = c.qty + delta;
      return newQty > 0 ? { ...c, qty: newQty } : c;
    }).filter((c) => c.qty > 0));
  }

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  function speakOrder() {
    if (cart.length === 0) return;
    const items = cart.map((c) => `${c.qty} ${c.name}`).join(", ");
    const text = `My order is: ${items}. Total is ${total.toFixed(2)} dollars.${specialRequest ? ` Special note: ${specialRequest}` : ""}`;
    speakText(text, language);
  }

  function placeOrder() {
    setOrderPlaced(true);
    try {
      const history = JSON.parse(localStorage.getItem("signbridge-history") || "[]");
      const items = cart.map((c) => `${c.qty}x ${c.name}`).join(", ");
      const orderId = "order-" + (history.length + 1);
      const nowIso = new Date().toISOString();
      history.unshift({
        id: orderId,
        type: "restaurant-order",
        content: `Order: ${items} — Total: $${total.toFixed(2)}${specialRequest ? ` [Note: ${specialRequest}]` : ""}`,
        timestamp: nowIso,
      });
      localStorage.setItem("signbridge-history", JSON.stringify(history));
    } catch (err) {
      console.warn("Could not save restaurant order to history:", err);
    }
  }

  // Waiter Full-Screen View
  if (showWaiterView) {
    return (
      <div className="waiter-view" onClick={() => setShowWaiterView(false)}>
        <div className="waiter-card" onClick={(e) => e.stopPropagation()}>
          <span className="waiter-badge">📋 Table Order Presentation</span>
          <h2>My Order</h2>
          {cart.length === 0 ? (
            <p className="waiter-empty">No items currently in order.</p>
          ) : (
            <>
              <div className="waiter-items">
                {cart.map((item) => (
                  <div className="waiter-item" key={item.id}>
                    <span className="waiter-item-emoji">{item.emoji}</span>
                    <span className="waiter-item-name">{item.name}</span>
                    <span className="waiter-item-qty">×{item.qty}</span>
                  </div>
                ))}
              </div>
              {specialRequest && (
                <div className="waiter-special-note">
                  <strong>Special Note:</strong> {specialRequest}
                </div>
              )}
              <div className="waiter-total">
                Total: ${total.toFixed(2)}
              </div>
            </>
          )}
          <div className="waiter-actions">
            <button className="btn btn-primary" onClick={speakOrder}>
              🔊 Read Order Aloud
            </button>
            <button className="btn btn-outline waiter-close-btn" onClick={() => setShowWaiterView(false)}>
              ✕ Close View
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Order Placed View
  if (orderPlaced) {
    return (
      <div className="restaurant-page">
        <div className="restaurant-hero">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>🍽️ Restaurant Mode</h1>
        </div>
        <div className="restaurant-section-center">
          <div className="order-confirmed-box">
            <span className="confirmed-emoji">✨</span>
            <h2>Order Placed Successfully!</h2>
            <p className="confirmed-desc">
              Your order of {cart.length} item{cart.length !== 1 ? "s" : ""} (${total.toFixed(2)}) has been recorded and saved to your history.
            </p>
            <div className="confirmed-actions">
              <button className="btn btn-restaurant" onClick={() => { setCart([]); setSpecialRequest(""); setOrderPlaced(false); }}>
                Start New Order
              </button>
              <Link to="/history" className="btn btn-outline">View in History</Link>
              <Link to="/" className="btn btn-outline">Go Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-page">
      <div className="restaurant-hero">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>🍽️ Restaurant Mode</h1>
        <p>
          Point-and-tap accessible ordering for restaurants, cafes, and dining.
          Build your order, add dietary notes, and present directly to your server.
        </p>
      </div>

      <div className="restaurant-layout">
        {/* Menu Column */}
        <div className="menu-column">
          {/* Category Tabs */}
          <div className="menu-tabs">
            {Object.entries(categoryLabels).map(([key, val]) => (
              <button
                key={key}
                className={activeCategory === key ? "menu-tab active" : "menu-tab"}
                onClick={() => setActiveCategory(key)}
              >
                {val.emoji} {val.label}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="menu-items">
            {menuData[activeCategory].map((item) => (
              <div className="menu-card" key={item.id}>
                <span className="menu-card-emoji">{item.emoji}</span>
                <div className="menu-card-info">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <span className="menu-card-price">${item.price.toFixed(2)}</span>
                </div>
                <button
                  className="menu-add-btn"
                  onClick={() => addToCart(item)}
                  aria-label={`Add ${item.name} to order`}
                >
                  +
                </button>
              </div>
            ))}
          </div>

          {/* Quick Dining Communication Chips */}
          <div className="dining-quick-requests">
            <h4 className="quick-requests-title">💬 Quick Server Requests</h4>
            <div className="quick-requests-chips">
              {QUICK_SERVER_REQUESTS.map((req, idx) => (
                <button
                  key={idx}
                  className="quick-request-chip"
                  onClick={() => speakText(req, language)}
                  title="Speak request aloud"
                >
                  {req}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Column */}
        <div className="cart-column">
          <h3 className="cart-title">🛒 Your Order</h3>
          {cart.length === 0 ? (
            <p className="cart-empty">Your order is empty. Tap + on any item to add it.</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <span className="cart-item-emoji">{item.emoji}</span>
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                    <div className="cart-qty-controls">
                      <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} aria-label="Increase quantity">+</button>
                    </div>
                    <button className="cart-remove" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Special dietary request input */}
              <div className="special-note-group">
                <label className="note-label">Special Dietary / Prep Note:</label>
                <input
                  type="text"
                  placeholder="e.g. No dairy, dressing on side..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="note-input"
                />
              </div>

              <div className="cart-total">
                <span>Total Amount</span>
                <span className="cart-total-amount">${total.toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <button className="btn btn-restaurant" onClick={() => setShowWaiterView(true)}>
                  📋 Show to Server
                </button>
                <button className="btn btn-outline" onClick={speakOrder}>
                  🔊 Read Order Aloud
                </button>
                <button className="btn btn-primary" onClick={placeOrder}>
                  ✓ Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
