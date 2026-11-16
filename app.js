/**
 * THREAD & COLLAR — E-COMMERCE CORE APPLICATION
 * Plain Vanilla JavaScript for effortless running in VS Code & Modern Browsers
 */

// ==========================================
// 1. PRODUCT CATALOG DATA
// ==========================================
const PRODUCTS = [
  {
    id: 1,
    name: "Burgundy Royal Pique Polo",
    category: "polo",
    price: 500,
    mrp: 999,
    tag: "BESTSELLER",
    tagType: "tag-bestseller",
    material: "220 GSM Honeycomb Pique Cotton",
    image: "images/polo-burgundy.jpg",
    rating: 4.9,
    reviewsCount: 542,
    description: "Our signature heavy pique polo in rich burgundy. Tailored specifically for Indian weather with breathable honeycomb knit, stiffened anti-roll ribbed collar, and tone-on-tone buttons. Pre-shrunk and bio-washed for all-day comfort.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "220 GSM Heavyweight Pique Cotton",
      "Stiffened Ribbed Collar (Won't curl)",
      "Zero Shrinkage Guarantee",
      "Reinforced Side Slits for ease of movement"
    ]
  },
  {
    id: 2,
    name: "Royal Navy Pique Polo",
    category: "polo",
    price: 500,
    mrp: 999,
    tag: "NEW ARRIVAL",
    tagType: "tag-bestseller",
    material: "220 GSM Honeycomb Pique Cotton",
    image: "images/polo-navy.jpg",
    rating: 4.8,
    reviewsCount: 384,
    description: "Deep royal navy blue polo crafted for both office casuals and weekend brunches. High color-fast reactive dyes ensure the shade remains as deep and striking as day one.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "220 GSM Heavyweight Pique Cotton",
      "Azo-Free Color Lock Technology",
      "Comfort regular fit across shoulders",
      "Enzyme-washed for ultra-smooth texture"
    ]
  },
  {
    id: 3,
    name: "Midnight Black Classic Polo",
    category: "polo",
    price: 500,
    mrp: 999,
    tag: "TRENDING",
    tagType: "tag-deal",
    material: "220 GSM Honeycomb Pique Cotton",
    image: "images/polo-black.jpg",
    rating: 4.9,
    reviewsCount: 467,
    description: "The quintessential jet black polo shirt. Premium heavyweight pique weave that doesn't attract lint and maintains a clean structured silhouette with jeans, chinos, or trousers.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "220 GSM Heavyweight Pique Cotton",
      "Fade-proof deep black reactive dye",
      "Formal-to-casual versatile collar",
      "Anti-pilling fabric finish"
    ]
  },
  {
    id: 4,
    name: "Deep Maroon Crew Neck Tee",
    category: "crew",
    price: 500,
    mrp: 899,
    tag: "100% COTTON",
    tagType: "tag-bestseller",
    material: "190 GSM Super-Combed Cotton",
    image: "images/crew-maroon.jpg",
    rating: 4.8,
    reviewsCount: 295,
    description: "Rich maroon round neck t-shirt engineered from 100% super-combed cotton. Elastane ribbed collar prevents neck sagging, while the bio-wash gives it an exceptionally soft hand-feel.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "190 GSM Super-Combed Single Jersey",
      "Ribbed Lycra Neckband (No sagging)",
      "Breathable, lightweight drape",
      "Tagless itch-free printed label"
    ]
  },
  {
    id: 5,
    name: "Essential Pure White Crew Neck",
    category: "crew",
    price: 500,
    mrp: 899,
    tag: "HEAVYWEIGHT",
    tagType: "tag-deal",
    material: "200 GSM Non-See-Through Cotton",
    image: "images/crew-white.jpg",
    rating: 4.9,
    reviewsCount: 618,
    description: "The heavyweight white tee you have been searching for. Completely non-transparent under bright sun, treated with optical brightness retainers, and built to survive frequent washing.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "200 GSM Heavyweight Cotton (Not see-through)",
      "Optical Brightener for long-lasting crisp white",
      "Double-stitched hem and sleeves",
      "Pre-shrunk fabric"
    ]
  }
];

// WhatsApp Seller Phone Number (Replace with actual phone number)
const WHATSAPP_SELLER_NUMBER = "919876543210";

// ==========================================
// 2. APPLICATION STATE
// ==========================================
let cart = [];
let appliedCoupon = null;
let currentFilter = "all";
let userSelectedSizes = {}; // Tracks selected size per product card { productId: 'M' }

// Load Cart from LocalStorage
function initCart() {
  try {
    const saved = localStorage.getItem("tc_cart");
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Could not load cart from localStorage", e);
  }
}

function saveCart() {
  try {
    localStorage.setItem("tc_cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Could not save cart", e);
  }
}

// ==========================================
// 3. UI RENDERING
// ==========================================

// Render Product Catalog
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const filtered = PRODUCTS.filter(p => {
    if (currentFilter === "all") return true;
    return p.category === currentFilter;
  });

  grid.innerHTML = filtered.map(product => {
    const selectedSize = userSelectedSizes[product.id] || "M";

    return `
      <article class="product-card" data-id="${product.id}">
        <span class="product-tag ${product.tagType}">${product.tag}</span>
        
        <div class="product-img-box" onclick="openQuickView(${product.id})">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="product-quick-btn" type="button">Quick View</button>
        </div>

        <div class="product-info">
          <div class="product-rating">
            <span>★★★★★</span>
            <span class="count">${product.rating} (${product.reviewsCount})</span>
          </div>

          <h3 class="product-title">${product.name}</h3>
          <div class="product-material-pill">${product.material}</div>

          <div class="product-price-row">
            <span class="current-price">₹${product.price}</span>
            <span class="original-price">₹${product.mrp}</span>
            <span class="off-percent">50% OFF</span>
          </div>

          <!-- Size selector -->
          <div class="product-size-select-row">
            <div class="size-label-row">
              <span>Size: <strong>${selectedSize}</strong></span>
              <span class="size-guide-link" onclick="openSizeChartModal()">Size Chart</span>
            </div>
            <div class="size-chips">
              ${product.sizes.map(size => `
                <button 
                  type="button" 
                  class="size-chip ${size === selectedSize ? 'selected' : ''}" 
                  onclick="selectCardSize(${product.id}, '${size}', event)"
                >${size}</button>
              `).join('')}
            </div>
          </div>

          <div class="product-card-actions">
            <button class="btn-card-add" onclick="handleAddToCart(${product.id})">
              Add to Bag • ₹500
            </button>
            <button class="btn-card-wa" onclick="orderSingleProductWhatsApp(${product.id})" title="Order directly on WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 17.84c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a7.92 7.92 0 0 1-1.22-4.17c0-4.41 3.59-8 8-8 2.14 0 4.15.83 5.66 2.34a7.95 7.95 0 0 1 2.35 5.66c.01 4.41-3.58 8-8.02 8zm4.39-5.99c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.21-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.55-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Select size on product card
window.selectCardSize = function(productId, size, event) {
  if (event) event.stopPropagation();
  userSelectedSizes[productId] = size;
  renderProducts();
};

// Render Cart Drawer
function renderCart() {
  const listEl = document.getElementById("cartItemsList");
  const countBadge = document.getElementById("cartCountBadge");
  const headerCount = document.getElementById("cartHeaderCount");
  const subtotalEl = document.getElementById("summarySubtotal");
  const shippingEl = document.getElementById("summaryShipping");
  const discountRow = document.getElementById("summaryDiscountRow");
  const discountEl = document.getElementById("summaryDiscount");
  const totalEl = document.getElementById("summaryTotal");
  const shippingText = document.getElementById("shippingBarText");
  const shippingProgress = document.getElementById("shippingProgressFill");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update badges
  if (countBadge) countBadge.textContent = totalItems;
  if (headerCount) headerCount.textContent = `(${totalItems} item${totalItems === 1 ? '' : 's'})`;

  // Free delivery calculation: Free if items >= 2 or subtotal >= 999
  const isFreeShipping = totalItems >= 2 || subtotal >= 999;
  let shippingFee = 0;
  if (totalItems > 0) {
    shippingFee = isFreeShipping ? 0 : 50;
  }

  // Calculate discount
  let discountAmount = 0;
  if (appliedCoupon === "POLO50" && subtotal >= 500) {
    discountAmount = 50;
  } else if (appliedCoupon === "COMBO3" && totalItems >= 3) {
    discountAmount = Math.round(subtotal * 0.10);
  }

  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  // Free shipping progress bar
  if (shippingText && shippingProgress) {
    if (totalItems === 0) {
      shippingText.innerHTML = "Add 2+ items (₹999+) for <strong>FREE Delivery</strong> across India!";
      shippingProgress.style.width = "0%";
    } else if (isFreeShipping) {
      shippingText.innerHTML = "🎉 Congratulations! You have unlocked <strong>FREE Pan-India Delivery</strong>!";
      shippingProgress.style.width = "100%";
      shippingProgress.style.backgroundColor = "#16a34a";
    } else {
      const remaining = 2 - totalItems;
      shippingText.innerHTML = `Add <strong>${remaining} more polo/tee</strong> to get <strong>FREE Delivery</strong>! (Save ₹50)`;
      shippingProgress.style.width = `${(totalItems / 2) * 100}%`;
      shippingProgress.style.backgroundColor = "var(--color-primary)";
    }
  }

  // Update summary fields
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (shippingEl) shippingEl.textContent = totalItems === 0 ? "₹0" : (shippingFee === 0 ? "FREE" : `₹${shippingFee}`);
  if (totalEl) totalEl.textContent = `₹${grandTotal}`;

  if (discountRow && discountEl) {
    if (discountAmount > 0) {
      discountRow.style.display = "flex";
      discountEl.textContent = `-₹${discountAmount}`;
    } else {
      discountRow.style.display = "none";
    }
  }

  // Render items list
  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">🛍️</div>
        <h4>Your Shopping Bag is Empty</h4>
        <p>Pick your favorite polos at just ₹500 each and enjoy premium comfort.</p>
        <button class="btn btn-primary btn-sm" style="margin-top: 16px;" onclick="closeCart()">
          Browse Polos Now
        </button>
      </div>
    `;
    return;
  }

  listEl.innerHTML = cart.map((item, index) => `
    <div class="cart-item-card">
      <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
      <div class="cart-item-details">
        <div>
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-variant">Size: <strong>${item.size}</strong> • 220 GSM Pique</div>
        </div>
        <div class="cart-item-price-row">
          <span class="cart-item-price">₹${item.price * item.quantity}</span>
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="updateItemQuantity(${index}, -1)" title="Decrease">−</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" onclick="updateItemQuantity(${index}, 1)" title="Increase">+</button>
          </div>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeCartItem(${index})" title="Remove item">&times;</button>
    </div>
  `).join('');
}

// ==========================================
// 4. CART ACTIONS
// ==========================================

function handleAddToCart(productId, sizeOverride = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const size = sizeOverride || userSelectedSizes[productId] || "M";

  // Check if item with same ID and size exists
  const existing = cart.find(item => item.id === productId && item.size === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  showToast(`Added ${product.name} (${size}) to your bag!`, "success");
  openCart();
}

window.handleAddToCart = handleAddToCart;

window.updateItemQuantity = function(index, delta) {
  if (!cart[index]) return;
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  renderCart();
};

window.removeCartItem = function(index) {
  if (!cart[index]) return;
  const removedName = cart[index].name;
  cart.splice(index, 1);
  saveCart();
  renderCart();
  showToast(`Removed ${removedName} from bag`, "info");
};

// Add Combo Pack of 2 or 3 to Cart
window.addComboToCart = function(count) {
  if (count === 2) {
    // Add Burgundy Polo and Navy Polo
    handleAddToCart(1, "L");
    handleAddToCart(2, "L");
    showToast("Added 2 Bestselling Polos (Size L) to Bag for ₹950!", "success");
  } else if (count === 3) {
    // Add Burgundy, Navy, Black
    handleAddToCart(1, "L");
    handleAddToCart(2, "L");
    handleAddToCart(3, "L");
    appliedCoupon = "POLO50";
    showToast("Added 3 Polos with Free Delivery & Promo Applied!", "success");
  }
  openCart();
};

// Open / Close Cart Drawer
function openCart() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeCart() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ==========================================
// 5. QUICK VIEW MODAL
// ==========================================
window.openQuickView = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("quickViewModal");
  const container = document.getElementById("quickViewDetails");
  if (!modal || !container) return;

  const currentSize = userSelectedSizes[productId] || "M";

  container.innerHTML = `
    <div class="quickview-media">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="quickview-body">
      <h2>${product.name}</h2>
      <div class="product-rating" style="margin-bottom: 8px;">
        <span>★★★★★</span>
        <span class="count">${product.rating} / 5 (${product.reviewsCount} verified reviews)</span>
      </div>

      <div class="product-price-row">
        <span class="current-price" style="font-size: 1.8rem;">₹${product.price}</span>
        <span class="original-price" style="font-size: 1.1rem;">₹${product.mrp}</span>
        <span class="off-percent">50% DISCOUNT</span>
      </div>

      <p style="font-size: 0.9rem; color: #4b5563; line-height: 1.5; margin-bottom: 14px;">
        ${product.description}
      </p>

      <div class="quickview-specs">
        <strong>Fabric & Build Highlights:</strong>
        ${product.features.map(f => `<span>✓ ${f}</span>`).join('')}
      </div>

      <div class="product-size-select-row" style="margin-top: 10px;">
        <div class="size-label-row">
          <span>Choose Size: <strong>${currentSize}</strong></span>
          <span class="size-guide-link" onclick="openSizeChartModal()">Size Chart Guide</span>
        </div>
        <div class="size-chips" id="qvSizeChips">
          ${product.sizes.map(size => `
            <button 
              type="button" 
              class="size-chip ${size === currentSize ? 'selected' : ''}" 
              onclick="selectQvSize(${product.id}, '${size}')"
            >${size}</button>
          `).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 20px;">
        <button class="btn btn-primary btn-lg" style="flex: 1;" onclick="handleAddToCart(${product.id}, '${currentSize}'); modal.close();">
          Add to Bag (₹500)
        </button>
        <button class="btn btn-whatsapp" onclick="orderSingleProductWhatsApp(${product.id}, '${currentSize}')" title="Buy via WhatsApp">
          Order on WhatsApp
        </button>
      </div>
      <div style="font-size: 0.75rem; color: #6b7280; text-align: center; margin-top: 12px;">
        🚚 Cash on Delivery Available • Delivers in 2-4 days across India
      </div>
    </div>
  `;

  modal.showModal();
};

window.selectQvSize = function(productId, size) {
  userSelectedSizes[productId] = size;
  openQuickView(productId);
  renderProducts();
};

// ==========================================
// 6. SIZE CHART MODAL
// ==========================================
window.openSizeChartModal = function() {
  const modal = document.getElementById("sizeChartModal");
  if (modal) modal.showModal();
};

// ==========================================
// 7. PINCODE DELIVERY CHECKER
// ==========================================
function initPincodeChecker() {
  const form = document.getElementById("pincodeForm");
  const input = document.getElementById("pincodeInput");
  const result = document.getElementById("pincodeResult");
  const headerText = document.getElementById("headerPincodeText");

  if (!form || !input || !result) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const pin = input.value.trim();

    if (!/^\d{6}$/.test(pin)) {
      result.className = "pincode-result error";
      result.style.display = "block";
      result.innerHTML = "❌ Please enter a valid 6-digit Indian PIN code.";
      return;
    }

    const firstDigit = pin.charAt(0);
    let region = "India";
    let days = "2-4";

    // Basic Indian Postal Circle zone mapping
    switch (firstDigit) {
      case '1': region = "Delhi NCR / Haryana / Punjab"; days = "2-3"; break;
      case '2': region = "Uttar Pradesh / Uttarakhand"; days = "2-4"; break;
      case '3': region = "Rajasthan / Gujarat"; days = "2-4"; break;
      case '4': region = "Maharashtra / Goa / MP"; days = "2-3"; break;
      case '5': region = "Andhra Pradesh / Telangana / Karnataka"; days = "2-3"; break;
      case '6': region = "Tamil Nadu / Kerala"; days = "2-4"; break;
      case '7': region = "West Bengal / Odisha / North East"; days = "3-5"; break;
      case '8': region = "Bihar / Jharkhand"; days = "3-5"; break;
    }

    result.className = "pincode-result success";
    result.style.display = "block";
    result.innerHTML = `
      ✅ <strong>Delivery Available to Pincode ${pin} (${region})!</strong><br>
      • Estimated Delivery: <strong>${days} Business Days</strong><br>
      • <strong>Cash on Delivery (COD)</strong> & Instant UPI supported.<br>
      • Ships via BlueDart / Delhivery Express.
    `;

    if (headerText) {
      headerText.textContent = `Deliver to: ${pin}`;
    }

    showToast(`Serviceable: ${pin} (${days} days delivery)`, "success");
  });
}

// ==========================================
// 8. WHATSAPP DIRECT ORDER GENERATOR
// ==========================================
window.orderSingleProductWhatsApp = function(productId, sizeOverride = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const size = sizeOverride || userSelectedSizes[productId] || "M";
  const message = `Hello Thread & Collar India! 🇮🇳%0A%0AI would like to order:%0A• Product: ${encodeURIComponent(product.name)}%0A• Size: ${size}%0A• Price: ₹${product.price}%0A• Quantity: 1%0A%0APlease let me know the delivery details and payment options (COD / UPI).`;
  
  const waUrl = `https://wa.me/${WHATSAPP_SELLER_NUMBER}?text=${message}`;
  window.open(waUrl, "_blank");
};

function generateCartWhatsAppOrder() {
  if (cart.length === 0) {
    showToast("Please add items to your cart first!", "info");
    return;
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFree = totalItems >= 2 || subtotal >= 999;
  const shipping = isFree ? 0 : 50;
  const discount = appliedCoupon === "POLO50" ? 50 : 0;
  const grandTotal = Math.max(0, subtotal + shipping - discount);

  let itemsListText = cart.map(i => `• ${i.name} (Size: ${i.size}) x ${i.quantity} = ₹${i.price * i.quantity}`).join("%0A");

  const message = `Hello Thread & Collar! 🇮🇳%0A%0AI want to place an order:%0A${itemsListText}%0A%0A• Subtotal: ₹${subtotal}%0A• Delivery: ${shipping === 0 ? 'FREE' : '₹50'}%0A• Total Payable: ₹${grandTotal}%0A%0APlease send order confirmation and dispatch details.`;

  const waUrl = `https://wa.me/${WHATSAPP_SELLER_NUMBER}?text=${message}`;
  window.open(waUrl, "_blank");
}

// ==========================================
// 9. CHECKOUT & ORDER CONFIRMATION
// ==========================================
function initCheckout() {
  const proceedBtn = document.getElementById("proceedCheckoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutForm = document.getElementById("checkoutForm");
  const summaryMini = document.getElementById("checkoutSummaryMini");
  const finalAmountText = document.getElementById("checkoutFinalAmountText");
  const successModal = document.getElementById("orderSuccessModal");

  if (proceedBtn) {
    proceedBtn.addEventListener("click", function() {
      if (cart.length === 0) {
        showToast("Your cart is empty!", "info");
        return;
      }

      closeCart();

      // Populate Mini Summary
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const isFree = totalItems >= 2 || subtotal >= 999;
      const shipping = isFree ? 0 : 50;
      const discount = appliedCoupon === "POLO50" ? 50 : 0;
      const grandTotal = Math.max(0, subtotal + shipping - discount);

      if (summaryMini) {
        summaryMini.innerHTML = `
          <div style="font-weight: 700; margin-bottom: 6px;">Order Summary (${totalItems} items):</div>
          ${cart.map(i => `<div>• ${i.name} [Size: ${i.size}] × ${i.quantity} — <strong>₹${i.price * i.quantity}</strong></div>`).join('')}
          <div style="margin-top: 8px; border-top: 1px dashed #cbd5e1; padding-top: 6px;">
            Delivery: <strong>${shipping === 0 ? 'FREE' : '₹50'}</strong> | Total: <strong style="color:var(--color-primary); font-size: 1.1rem;">₹${grandTotal}</strong>
          </div>
        `;
      }

      if (finalAmountText) {
        finalAmountText.textContent = `₹${grandTotal}`;
      }

      if (checkoutModal) checkoutModal.showModal();
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("custName").value.trim();
      const phone = document.getElementById("custPhone").value.trim();
      const address = document.getElementById("custAddress").value.trim();
      const pincode = document.getElementById("custPincode").value.trim();
      const city = document.getElementById("custCity").value.trim();
      const state = document.getElementById("custState").value;
      const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

      const orderId = "TC-IND-" + Math.floor(100000 + Math.random() * 900000);
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const isFree = totalItems >= 2 || subtotal >= 999;
      const shipping = isFree ? 0 : 50;
      const discount = appliedCoupon === "POLO50" ? 50 : 0;
      const grandTotal = Math.max(0, subtotal + shipping - discount);

      // Render Receipt
      const receiptCard = document.getElementById("successReceiptCard");
      const idBadge = document.getElementById("successOrderId");
      if (idBadge) idBadge.textContent = `#${orderId}`;

      if (receiptCard) {
        receiptCard.innerHTML = `
          <p><strong>Customer:</strong> ${name} (+91 ${phone})</p>
          <p><strong>Shipping Address:</strong> ${address}, ${city}, ${state} - ${pincode}</p>
          <p><strong>Payment Mode:</strong> ${paymentMethod === 'COD' ? 'Cash on Delivery (Pay at Doorstep)' : 'Instant UPI (Scan on Delivery / Prepaid)'}</p>
          <hr style="margin: 10px 0; border: none; border-top: 1px dashed #cbd5e1;">
          <p><strong>Ordered Items (${totalItems}):</strong></p>
          ${cart.map(i => `<p>• ${i.name} (Size: ${i.size}) × ${i.quantity} = ₹${i.price * i.quantity}</p>`).join('')}
          <hr style="margin: 10px 0; border: none; border-top: 1px dashed #cbd5e1;">
          <p><strong>Total Amount to Pay:</strong> <span style="font-size: 1.2rem; font-weight: 800; color: var(--color-primary);">₹${grandTotal}</span></p>
          <p style="font-size: 0.75rem; color: #64748b; margin-top: 6px;">📦 Estimated Delivery: 2-4 Business Days via Express Courier</p>
        `;
      }

      // Prepare WhatsApp confirmation button
      const waBtn = document.getElementById("sendWhatsAppReceiptBtn");
      if (waBtn) {
        const orderSummaryMsg = `*ORDER CONFIRMED - ${orderId}*%0A%0ACustomer: ${name} (${phone})%0AAddress: ${address}, ${city}, ${state} - ${pincode}%0APayment: ${paymentMethod}%0A%0A*Items:*%0A${cart.map(i => `• ${i.name} [Size: ${i.size}] x ${i.quantity} = ₹${i.price * i.quantity}`).join('%0A')}%0A%0A*Grand Total: ₹${grandTotal}*`;
        waBtn.onclick = function() {
          window.open(`https://wa.me/${WHATSAPP_SELLER_NUMBER}?text=${orderSummaryMsg}`, '_blank');
        };
      }

      // Close checkout modal, clear cart, open success modal
      if (checkoutModal) checkoutModal.close();
      cart = [];
      saveCart();
      renderCart();
      checkoutForm.reset();

      if (successModal) successModal.showModal();
    });
  }
}

// ==========================================
// 10. COUPON SYSTEM
// ==========================================
function initCoupons() {
  const couponInput = document.getElementById("couponInput");
  const applyBtn = document.getElementById("applyCouponBtn");
  const feedback = document.getElementById("couponFeedback");

  if (!applyBtn || !couponInput || !feedback) return;

  applyBtn.addEventListener("click", function() {
    const code = couponInput.value.trim().toUpperCase();

    if (code === "POLO50") {
      appliedCoupon = "POLO50";
      feedback.style.color = "var(--color-success)";
      feedback.textContent = "🎉 Coupon POLO50 applied! ₹50 discount added.";
      renderCart();
      showToast("Coupon POLO50 applied! Saved ₹50", "success");
    } else if (code === "COMBO3") {
      appliedCoupon = "COMBO3";
      feedback.style.color = "var(--color-success)";
      feedback.textContent = "🎉 Coupon COMBO3 applied! 10% combo discount added.";
      renderCart();
      showToast("Coupon COMBO3 applied!", "success");
    } else {
      feedback.style.color = "var(--color-discount)";
      feedback.textContent = "❌ Invalid coupon code. Try POLO50.";
    }
  });
}

// ==========================================
// 11. TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// ==========================================
// 12. HERO THUMBNAIL SWITCHER
// ==========================================
function initHeroSwitcher() {
  const heroImg = document.getElementById("heroFeaturedImg");
  const thumbBtns = document.querySelectorAll(".thumb-btn");

  thumbBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      thumbBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      const targetImg = this.getAttribute("data-img");
      if (heroImg && targetImg) {
        heroImg.src = targetImg;
      }
    });
  });
}

// ==========================================
// 13. FILTER TABS & NAVIGATION
// ==========================================
function initFilters() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", function() {
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.getAttribute("data-filter");
      renderProducts();
    });
  });
}

// ==========================================
// 14. MOBILE DRAWER & MODAL CLOSE HANDLERS
// ==========================================
function initDrawersAndModals() {
  // Mobile Drawer
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileOverlay = document.getElementById("mobileDrawerOverlay");
  const mobileCloseBtn = document.getElementById("mobileDrawerClose");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function toggleMobileDrawer(open) {
    if (mobileDrawer && mobileOverlay) {
      if (open) {
        mobileDrawer.classList.add("active");
        mobileOverlay.classList.add("active");
      } else {
        mobileDrawer.classList.remove("active");
        mobileOverlay.classList.remove("active");
      }
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", () => toggleMobileDrawer(true));
  if (mobileCloseBtn) mobileCloseBtn.addEventListener("click", () => toggleMobileDrawer(false));
  if (mobileOverlay) mobileOverlay.addEventListener("click", () => toggleMobileDrawer(false));
  mobileLinks.forEach(l => l.addEventListener("click", () => toggleMobileDrawer(false)));

  // Cart Drawer
  const cartTrigger = document.getElementById("cartTriggerBtn");
  const cartClose = document.getElementById("cartCloseBtn");
  const cartOverlay = document.getElementById("cartOverlay");
  const waCartBtn = document.getElementById("whatsappCheckoutBtn");

  if (cartTrigger) cartTrigger.addEventListener("click", openCart);
  if (cartClose) cartClose.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
  if (waCartBtn) waCartBtn.addEventListener("click", generateCartWhatsAppOrder);

  // Modal Closers
  const qvClose = document.getElementById("quickViewCloseBtn");
  if (qvClose) qvClose.addEventListener("click", () => document.getElementById("quickViewModal").close());

  const sizeChartClose = document.getElementById("sizeChartCloseBtn");
  if (sizeChartClose) sizeChartClose.addEventListener("click", () => document.getElementById("sizeChartModal").close());

  const checkoutClose = document.getElementById("checkoutCloseBtn");
  if (checkoutClose) checkoutClose.addEventListener("click", () => document.getElementById("checkoutModal").close());

  // Quick Pincode shortcut in header
  const pincodeQuickBtn = document.getElementById("pincodeQuickBtn");
  if (pincodeQuickBtn) {
    pincodeQuickBtn.addEventListener("click", () => {
      const section = document.getElementById("pincode-section");
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Hero size chart button
  const heroSizeChartBtn = document.getElementById("heroSizeChartBtn");
  if (heroSizeChartBtn) {
    heroSizeChartBtn.addEventListener("click", openSizeChartModal);
  }

  // Current year in footer
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ==========================================
// 15. BOOTSTRAP APPLICATION
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
  initCart();
  renderProducts();
  renderCart();
  initHeroSwitcher();
  initFilters();
  initPincodeChecker();
  initCoupons();
  initCheckout();
  initDrawersAndModals();
});
