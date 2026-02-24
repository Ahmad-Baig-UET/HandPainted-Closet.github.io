import { useState, useEffect, useRef } from "react";

const ADMIN_PASSWORD = "MySmallBuisness";

const FONT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --cream: #faf6f1;
  --warm: #f0e8dc;
  --blush: #e8cfc3;
  --rose: #c9917a;
  --deep: #8b5e52;
  --brown: #3d2b1f;
  --text: #2a1a12;
  --muted: #8a7060;
  --white: #ffffff;
}

body {
  background: var(--cream);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
}

.playfair { font-family: 'Playfair Display', serif; }
.cormorant { font-family: 'Cormorant Garamond', serif; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--warm); }
::-webkit-scrollbar-thumb { background: var(--blush); border-radius: 3px; }

/* Grain overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.4;
}

/* Header */
.header {
  background: var(--white);
  border-bottom: 1px solid var(--warm);
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(61,43,31,0.06);
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-style: italic;
  color: var(--brown);
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.logo span { color: var(--rose); font-style: normal; }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.cart-btn {
  background: var(--brown);
  color: white;
  border: none;
  padding: 10px 22px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  letter-spacing: 0.3px;
}

.cart-btn:hover { background: var(--deep); transform: translateY(-1px); }

.badge {
  background: var(--rose);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}

.admin-link {
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
}

/* Hero */
.hero {
  background: linear-gradient(135deg, var(--warm) 0%, var(--blush) 50%, var(--cream) 100%);
  padding: 80px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,145,122,0.15), transparent 70%);
  top: -200px;
  left: -100px;
}

.hero-eyebrow {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--rose);
  margin-bottom: 16px;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(42px, 6vw, 72px);
  font-style: italic;
  color: var(--brown);
  line-height: 1.1;
  margin-bottom: 16px;
}

.hero-sub {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  color: var(--muted);
  font-style: italic;
}

/* Shop */
.shop-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  color: var(--brown);
  margin-bottom: 8px;
}

.section-sub {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 40px;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 18px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
}

.product-card {
  background: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(61,43,31,0.07);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(61,43,31,0.13);
}

.product-img {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  background: var(--warm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: var(--blush);
  position: relative;
  overflow: hidden;
}

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 20px;
}

.product-title {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  color: var(--brown);
  margin-bottom: 6px;
  line-height: 1.3;
}

.product-price {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  color: var(--rose);
  font-weight: 500;
  margin-bottom: 14px;
}

.add-cart-btn {
  width: 100%;
  background: var(--cream);
  border: 1.5px solid var(--blush);
  color: var(--brown);
  padding: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  letter-spacing: 0.5px;
}

.add-cart-btn:hover {
  background: var(--brown);
  color: white;
  border-color: var(--brown);
}

.empty-state {
  grid-column: 1/-1;
  text-align: center;
  padding: 80px 20px;
  color: var(--muted);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

/* Modal overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(42,26,18,0.5);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.modal {
  background: var(--white);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

.modal-title {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  color: var(--brown);
  margin-bottom: 6px;
  font-style: italic;
}

.modal-sub {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 28px;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: var(--muted);
  line-height: 1;
}

.modal-relative { position: relative; }

/* Forms */
.form-group { margin-bottom: 20px; }

.form-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--warm);
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: var(--text);
  background: var(--cream);
  transition: border-color 0.2s;
  outline: none;
}

.form-input:focus { border-color: var(--rose); background: white; }

.btn-primary {
  width: 100%;
  background: var(--brown);
  color: white;
  border: none;
  padding: 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s;
  letter-spacing: 0.3px;
  margin-top: 8px;
}

.btn-primary:hover { background: var(--deep); transform: translateY(-1px); }

.btn-secondary {
  width: 100%;
  background: transparent;
  color: var(--brown);
  border: 1.5px solid var(--blush);
  padding: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s;
  margin-top: 10px;
}

.btn-secondary:hover { background: var(--warm); }

/* Cart */
.cart-modal { max-width: 560px; }

.cart-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--warm);
  align-items: center;
}

.cart-item-img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background: var(--warm);
  object-fit: cover;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  overflow: hidden;
}

.cart-item-img img { width: 100%; height: 100%; object-fit: cover; }

.cart-item-info { flex: 1; }

.cart-item-name {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  color: var(--brown);
  margin-bottom: 4px;
}

.cart-item-price {
  color: var(--rose);
  font-size: 15px;
  font-family: 'Cormorant Garamond', serif;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid var(--blush);
  background: white;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--brown);
  transition: all 0.15s;
}

.qty-btn:hover { background: var(--brown); color: white; border-color: var(--brown); }

.cart-total {
  padding: 20px 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  color: var(--brown);
}

.total-amount {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  color: var(--rose);
  font-weight: 600;
}

/* Checkout */
.divider {
  border: none;
  border-top: 1px solid var(--warm);
  margin: 20px 0;
}

/* Admin */
.admin-modal { max-width: 640px; }

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
}

.tab-bar {
  display: flex;
  gap: 4px;
  background: var(--warm);
  padding: 4px;
  border-radius: 10px;
  margin-bottom: 28px;
}

.tab {
  flex: 1;
  padding: 8px;
  border: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 7px;
  color: var(--muted);
  transition: all 0.2s;
}

.tab.active {
  background: white;
  color: var(--brown);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.upload-area {
  border: 2px dashed var(--blush);
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  background: var(--cream);
  transition: all 0.2s;
  margin-bottom: 20px;
  position: relative;
}

.upload-area:hover { border-color: var(--rose); background: var(--warm); }

.upload-area input { 
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.upload-icon { font-size: 40px; margin-bottom: 10px; }

.upload-text { color: var(--muted); font-size: 14px; }

.upload-preview {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 16px;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.orders-table th {
  text-align: left;
  padding: 10px 12px;
  background: var(--warm);
  color: var(--muted);
  font-weight: 500;
  letter-spacing: 0.5px;
  font-size: 12px;
  text-transform: uppercase;
}

.orders-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--warm);
  color: var(--text);
  vertical-align: top;
}

.orders-table tr:hover td { background: var(--cream); }

.order-status {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  background: #e8f5e9;
  color: #388e3c;
}

.csv-btn {
  background: var(--deep);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.csv-btn:hover { background: var(--brown); }

.product-list-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid var(--warm);
}

.product-thumb {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background: var(--warm);
  object-fit: cover;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.product-thumb img { width: 100%; height: 100%; object-fit: cover; }

.delete-btn {
  margin-left: auto;
  background: none;
  border: 1px solid #ffd7d7;
  color: #e57373;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'DM Sans', sans-serif;
}

.delete-btn:hover { background: #ffebee; }

.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--brown);
  color: white;
  padding: 14px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  z-index: 9999;
  animation: toastIn 0.3s ease, toastOut 0.3s ease 2.2s forwards;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}

@keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
@keyframes toastOut { from { opacity: 1; } to { opacity: 0; } }

.success-screen {
  text-align: center;
  padding: 40px 0;
}

.success-icon { font-size: 64px; margin-bottom: 20px; }

.footer {
  background: var(--brown);
  color: rgba(255,255,255,0.7);
  text-align: center;
  padding: 30px;
  font-size: 13px;
  margin-top: 60px;
}

.footer strong { color: white; font-family: 'Playfair Display', serif; font-style: italic; }
`;

export default function HainpaintedCloset() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(null); // 'cart', 'checkout', 'admin', 'login', 'success'
  const [adminTab, setAdminTab] = useState('add');
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [toast, setToast] = useState('');
  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [newProduct, setNewProduct] = useState({ title: '', price: '', imageData: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Load from storage on mount
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const p = await window.storage.get('hc_products');
      if (p) setProducts(JSON.parse(p.value));
    } catch(e) {}
    try {
      const o = await window.storage.get('hc_orders');
      if (o) setOrders(JSON.parse(o.value));
    } catch(e) {}
  }

  async function saveProducts(updated) {
    setProducts(updated);
    try { await window.storage.set('hc_products', JSON.stringify(updated)); } catch(e) {}
  }

  async function saveOrders(updated) {
    setOrders(updated);
    try { await window.storage.set('hc_orders', JSON.stringify(updated)); } catch(e) {}
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  function addToCart(product) {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast('Added to cart ✓');
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function updateQty(id, delta) {
    setCart(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i);
      return updated;
    });
  }

  const cartTotal = cart.reduce((sum, i) => sum + (parseFloat(i.price) * i.qty), 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  async function placeOrder() {
    const { name, email, phone, address } = checkoutForm;
    if (!name || !email || !address) { showToast('Please fill all required fields'); return; }
    
    const order = {
      id: 'ORD-' + Date.now(),
      date: new Date().toLocaleString(),
      customer: name,
      email,
      phone,
      address,
      items: cart.map(i => `${i.title} x${i.qty}`).join('; '),
      total: cartTotal.toFixed(2),
      status: 'Confirmed'
    };
    
    const updated = [...orders, order];
    await saveOrders(updated);
    setOrderSuccess(order);
    setCart([]);
    setCheckoutForm({ name: '', email: '', phone: '', address: '' });
    setModal('success');
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
      setNewProduct(p => ({ ...p, imageData: ev.target.result }));
    };
    reader.readAsDataURL(file);
  }

  async function addProduct() {
    const { title, price, imageData } = newProduct;
    if (!title || !price) { showToast('Please fill title and price'); return; }
    
    const product = {
      id: Date.now().toString(),
      title,
      price: parseFloat(price).toFixed(2),
      imageData: imageData || null
    };
    
    await saveProducts([...products, product]);
    setNewProduct({ title: '', price: '', imageData: null });
    setImagePreview(null);
    showToast('Product added! ✓');
  }

  async function deleteProduct(id) {
    await saveProducts(products.filter(p => p.id !== id));
    showToast('Product removed');
  }

  function downloadCSV() {
    const headers = ['Order ID', 'Date', 'Customer', 'Email', 'Phone', 'Address', 'Items', 'Total', 'Status'];
    const rows = orders.map(o => [
      o.id, o.date, o.customer, o.email, o.phone || '', o.address, o.items, `$${o.total}`, o.status
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${(c||'').replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'hainpainted-orders.csv'; a.click();
  }

  function openAdmin() {
    if (adminAuth) setModal('admin');
    else setModal('login');
  }

  return (
    <>
      <style>{FONT_STYLE}</style>
      
      {/* Header */}
      <header className="header">
        <div className="logo">
          Hain<span>painted</span> Closet
        </div>
        <div className="nav-actions">
          <button className="admin-link" onClick={openAdmin}>Admin</button>
          <button className="cart-btn" onClick={() => setModal('cart')}>
            🛍️ Cart
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-eyebrow">handpicked · handpainted · handcrafted</div>
        <h1 className="hero-title">Wear Your Aesthetic</h1>
        <p className="hero-sub">Curated pieces for the girl with the vision</p>
      </section>

      {/* Shop */}
      <section className="shop-section">
        <h2 className="section-title">The Collection</h2>
        <p className="section-sub">Each piece is one of a kind, just like you.</p>
        <div className="grid">
          {products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🌸</div>
              <p className="cormorant" style={{fontSize:'22px',color:'var(--muted)'}}>The closet is being curated...</p>
              <p style={{fontSize:'14px',color:'var(--blush)',marginTop:'8px'}}>Check back soon for beautiful pieces.</p>
            </div>
          ) : products.map(p => (
            <div className="product-card" key={p.id}>
              <div className="product-img">
                {p.imageData ? <img src={p.imageData} alt={p.title} /> : '🌺'}
              </div>
              <div className="product-info">
                <div className="product-title">{p.title}</div>
                <div className="product-price">₱{p.price}</div>
                <button className="add-cart-btn" onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <strong>Hainpainted Closet</strong> · Handcrafted with love · All pieces are final sale
      </footer>

      {/* Cart Modal */}
      {modal === 'cart' && (
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="modal cart-modal modal-relative" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setModal(null)}>×</button>
            <div className="modal-title">Your Cart</div>
            <div className="modal-sub">{cartCount === 0 ? 'Nothing here yet' : `${cartCount} item${cartCount > 1 ? 's' : ''}`}</div>
            
            {cart.length === 0 ? (
              <div style={{textAlign:'center',padding:'40px 0',color:'var(--muted)'}}>
                <div style={{fontSize:'48px',marginBottom:'12px'}}>🛍️</div>
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-img">
                      {item.imageData ? <img src={item.imageData} alt={item.title} /> : '🌺'}
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.title}</div>
                      <div className="cart-item-price">₱{item.price} each</div>
                    </div>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                      <span style={{fontWeight:'600',minWidth:'20px',textAlign:'center'}}>{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                      <button className="qty-btn" onClick={() => removeFromCart(item.id)} style={{marginLeft:'4px',color:'#e57373',borderColor:'#ffd7d7'}}>🗑</button>
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <span className="total-label">Total</span>
                  <span className="total-amount">₱{cartTotal.toFixed(2)}</span>
                </div>
                <button className="btn-primary" onClick={() => setModal('checkout')}>
                  Proceed to Checkout →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {modal === 'checkout' && (
        <div className="overlay" onClick={() => setModal('cart')}>
          <div className="modal modal-relative" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setModal('cart')}>×</button>
            <div className="modal-title">Checkout</div>
            <div className="modal-sub">Total: ₱{cartTotal.toFixed(2)}</div>
            
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" placeholder="Your full name" value={checkoutForm.name} onChange={e => setCheckoutForm(p => ({...p, name: e.target.value}))} />
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input className="form-input" type="email" placeholder="your@email.com" value={checkoutForm.email} onChange={e => setCheckoutForm(p => ({...p, email: e.target.value}))} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-input" placeholder="+63..." value={checkoutForm.phone} onChange={e => setCheckoutForm(p => ({...p, phone: e.target.value}))} />
            </div>
            <div className="form-group">
              <label className="form-label">Delivery Address *</label>
              <textarea className="form-input" rows="3" placeholder="Full delivery address" style={{resize:'vertical'}} value={checkoutForm.address} onChange={e => setCheckoutForm(p => ({...p, address: e.target.value}))} />
            </div>
            
            <hr className="divider" />
            <div style={{background:'var(--cream)',borderRadius:'10px',padding:'14px',marginBottom:'16px',fontSize:'13px',color:'var(--muted)'}}>
              📦 Payment upon delivery. We'll confirm via your email.
            </div>
            
            <button className="btn-primary" onClick={placeOrder}>Place Order ✨</button>
            <button className="btn-secondary" onClick={() => setModal('cart')}>← Back to Cart</button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {modal === 'success' && orderSuccess && (
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="modal modal-relative" onClick={e => e.stopPropagation()}>
            <div className="success-screen">
              <div className="success-icon">🌸</div>
              <h2 className="playfair" style={{fontSize:'28px',color:'var(--brown)',marginBottom:'8px',fontStyle:'italic'}}>Order Placed!</h2>
              <p style={{color:'var(--muted)',marginBottom:'20px',lineHeight:'1.6'}}>
                Thank you, <strong>{orderSuccess.customer}</strong>!<br/>
                We'll reach out to <strong>{orderSuccess.email}</strong> to confirm your order.
              </p>
              <div style={{background:'var(--cream)',borderRadius:'12px',padding:'16px',textAlign:'left',marginBottom:'24px'}}>
                <div style={{fontSize:'12px',color:'var(--muted)',marginBottom:'4px',letterSpacing:'1px',textTransform:'uppercase'}}>Order ID</div>
                <div style={{fontFamily:'monospace',fontWeight:'600',color:'var(--rose)'}}>{orderSuccess.id}</div>
              </div>
              <button className="btn-primary" onClick={() => setModal(null)}>Continue Shopping 🛍️</button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Login */}
      {modal === 'login' && (
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="modal modal-relative" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setModal(null)}>×</button>
            <div className="modal-title">Admin Access</div>
            <div className="modal-sub">Enter your password to manage the closet</div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••••" value={adminPass} onChange={e => setAdminPass(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    if (adminPass === ADMIN_PASSWORD) { setAdminAuth(true); setAdminPass(''); setModal('admin'); }
                    else showToast('Incorrect password');
                  }
                }}
              />
            </div>
            <button className="btn-primary" onClick={() => {
              if (adminPass === ADMIN_PASSWORD) { setAdminAuth(true); setAdminPass(''); setModal('admin'); }
              else showToast('Incorrect password');
            }}>Enter</button>
          </div>
        </div>
      )}

      {/* Admin Modal */}
      {modal === 'admin' && adminAuth && (
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="modal admin-modal modal-relative" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setModal(null)}>×</button>
            <div className="admin-header">
              <div>
                <div className="modal-title">Admin Panel</div>
                <div className="modal-sub">Hainpainted Closet</div>
              </div>
            </div>
            
            <div className="tab-bar">
              <button className={`tab ${adminTab === 'add' ? 'active' : ''}`} onClick={() => setAdminTab('add')}>Add Product</button>
              <button className={`tab ${adminTab === 'products' ? 'active' : ''}`} onClick={() => setAdminTab('products')}>Products ({products.length})</button>
              <button className={`tab ${adminTab === 'orders' ? 'active' : ''}`} onClick={() => setAdminTab('orders')}>Orders ({orders.length})</button>
            </div>

            {adminTab === 'add' && (
              <div>
                <label className="upload-area">
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="upload-preview" />
                  ) : (
                    <>
                      <div className="upload-icon">🖼️</div>
                      <div className="upload-text">Click to upload product photo</div>
                    </>
                  )}
                </label>
                <div className="form-group">
                  <label className="form-label">Product Title</label>
                  <input className="form-input" placeholder="e.g. Hand-painted Denim Jacket" value={newProduct.title} onChange={e => setNewProduct(p => ({...p, title: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Price (₱)</label>
                  <input className="form-input" type="number" placeholder="0.00" value={newProduct.price} onChange={e => setNewProduct(p => ({...p, price: e.target.value}))} />
                </div>
                <button className="btn-primary" onClick={addProduct}>Add to Closet ✨</button>
              </div>
            )}

            {adminTab === 'products' && (
              <div>
                {products.length === 0 ? (
                  <p style={{color:'var(--muted)',textAlign:'center',padding:'30px'}}>No products yet. Add some!</p>
                ) : products.map(p => (
                  <div className="product-list-item" key={p.id}>
                    <div className="product-thumb">
                      {p.imageData ? <img src={p.imageData} alt={p.title} /> : '🌺'}
                    </div>
                    <div>
                      <div style={{fontWeight:'500',fontSize:'14px',color:'var(--brown)'}}>{p.title}</div>
                      <div style={{color:'var(--rose)',fontSize:'13px'}}>₱{p.price}</div>
                    </div>
                    <button className="delete-btn" onClick={() => deleteProduct(p.id)}>Remove</button>
                  </div>
                ))}
              </div>
            )}

            {adminTab === 'orders' && (
              <div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                  <span style={{color:'var(--muted)',fontSize:'14px'}}>{orders.length} order{orders.length !== 1 ? 's' : ''} total</span>
                  {orders.length > 0 && (
                    <button className="csv-btn" onClick={downloadCSV}>⬇ Download CSV</button>
                  )}
                </div>
                {orders.length === 0 ? (
                  <p style={{color:'var(--muted)',textAlign:'center',padding:'30px'}}>No orders yet.</p>
                ) : (
                  <div style={{overflowX:'auto'}}>
                    <table className="orders-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...orders].reverse().map(o => (
                          <tr key={o.id}>
                            <td><span style={{fontFamily:'monospace',fontSize:'11px',color:'var(--muted)'}}>{o.id}</span><br/><span style={{fontSize:'11px',color:'var(--muted)'}}>{o.date}</span></td>
                            <td><strong>{o.customer}</strong><br/><span style={{fontSize:'11px',color:'var(--muted)'}}>{o.email}</span></td>
                            <td style={{maxWidth:'150px',fontSize:'12px'}}>{o.items}</td>
                            <td style={{fontWeight:'600',color:'var(--rose)'}}>₱{o.total}</td>
                            <td><span className="order-status">{o.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
