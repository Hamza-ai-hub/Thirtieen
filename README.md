# 👕 THREAD & COLLAR — Premium ₹500 Polo & T-Shirt Store (India)

A modern, responsive, high-converting e-commerce storefront crafted for selling polos and t-shirts across India for **₹500 each**. Built purely with **HTML5, CSS3, and Vanilla JavaScript** — zero complex dependencies or build steps. Ready to open and run immediately in **VS Code**!

---

## 🚀 How to Run in VS Code

### Method 1: Using VS Code "Live Server" (Recommended)
1. Open **VS Code**.
2. Go to **File ➔ Open Folder...** and select this directory:
   `/Users/macbook/.gemini/antigravity/scratch/tshirt-store`
3. If you don't have it installed yet, install the **Live Server** extension (by Ritwick Dey) from the VS Code Extensions tab (`Ctrl+Shift+X` or `Cmd+Shift+X`).
4. Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
5. Your default browser will launch at `http://127.0.0.1:5500` with hot-reloading!

### Method 2: Double-Click Directly
- Simply open the `tshirt-store` folder in Finder / File Explorer and double-click `index.html`. It runs directly in Chrome, Safari, Edge, or Firefox!

### Method 3: Using VS Code Terminal
Open the VS Code integrated terminal (`Ctrl+` `~` or `Cmd+` `~`) inside the project folder and run:
```bash
python3 -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

---

## ✨ Features Built Specifically for the Indian Market

1. **₹500 Price Positioning & Value Combos**:
   - Every polo & tee is priced at **₹500** (MRP ₹999 / 50% OFF).
   - Value combo packs: 2 Polos for **₹950** (Save ₹50 + Free Shipping) and 3 Polos for **₹1,399**.
2. **Indian Sizing Standards (S to XXL)**:
   - Size picker right on each card and inside the Quick View modal.
   - Interactive **Size Chart Modal** displaying Chest (38" to 46"), Length, Shoulder, and Sleeve in inches.
3. **Cash on Delivery (COD) & Instant UPI**:
   - Full checkout modal with Indian fields (10-digit mobile, 6-digit PIN code, state dropdown).
   - Selection for Cash on Delivery (Doorstep payment) and UPI (GPay, PhonePe, Paytm).
4. **1-Click WhatsApp Ordering**:
   - Indian shoppers love buying directly over WhatsApp!
   - Every product card has an instant WhatsApp order button that generates an itemized message with product name, selected size, and price.
   - Cart drawer also includes "Order via WhatsApp Directly".
5. **Interactive 6-Digit Indian Pincode Delivery Checker**:
   - Check real-time serviceability across Indian postal circles (Delhi NCR, Mumbai, Bengaluru, Pune, etc.) with estimated delivery days (2-4 business days via BlueDart/Delhivery).
6. **Persistent Shopping Cart**:
   - Items and quantities persist across browser refreshes via `localStorage`.
   - Free shipping progress bar (Free shipping on 2+ items / ₹999+).
   - Promo coupon code system (try `POLO50` for ₹50 off!).

---

## 🛠️ How to Customize

### 1. Update WhatsApp Seller Number
In `app.js` (line 117):
```javascript
const WHATSAPP_SELLER_NUMBER = "919876543210";
```
Change `"919876543210"` to your real 10-digit WhatsApp phone number with country code `91` (e.g., `919812345678`).

### 2. Add or Edit Products
In `app.js`, look at the `PRODUCTS` array at the top. You can adjust prices, descriptions, or add new images to the `images/` folder:
```javascript
{
  id: 1,
  name: "Burgundy Royal Pique Polo",
  category: "polo",
  price: 500,
  mrp: 999,
  tag: "BESTSELLER",
  material: "220 GSM Honeycomb Pique Cotton",
  image: "images/polo-burgundy.jpg",
  rating: 4.9,
  sizes: ["S", "M", "L", "XL", "XXL"]
}
```

### 3. Change Brand Name & Colors
- **Brand Name**: Open `index.html` and search for `THREAD & COLLAR` to change it to your brand name.
- **Colors**: Open `styles.css` and modify the CSS variables in `:root`:
```css
:root {
  --color-primary: #5c1426;  /* Main brand color (Wine / Burgundy) */
  --color-accent: #2563eb;   /* Secondary accent */
  --color-whatsapp: #25d366; /* WhatsApp brand green */
}
```

---

## 🌐 Free Deployment Options

- **GitHub Pages**: Push this repo to GitHub and enable Pages in repository settings.
- **Netlify / Vercel**: Drag and drop this folder directly into Netlify Drop (netlify.com/drop) or deploy via Vercel for instant live hosting with a free URL!
