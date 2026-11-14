const products = [
  { id: 1, name: "Haylou Solar Neo 2 Smart Watch", cat: "Watch", price: 3369, old: 4499, off: "-25%", rate: "4.9 (120)", icon: "⌚", desc: "1.43 AMOLED ডিসপ্লে, ৪৫ দিনের ব্যাটারি ব্যাকআপ এবং ওয়াটারপ্রুফ স্মার্ট ওয়াচ।" },
  { id: 2, name: "Premium Cotton Winter Hoodie", cat: "Fashion", price: 410, old: 840, off: "-51%", rate: "4.7 (85)", icon: "🧥", desc: "১০০% প্রিমিয়াম কটন ফ্লিস হুডি, শীতের জন্য অত্যন্ত আরামদায়ক ও স্টাইলিশ।" },
  { id: 3, name: "Lotto Super Light Running Shoes", cat: "Fashion", price: 967, old: 1290, off: "-25%", rate: "4.8 (210)", icon: "👟", desc: "হালকা ওজনের রানিং সুজ, দীর্ঘক্ষণ হাঁটা বা দৌড়ানোর জন্য পারফেক্ট।" },
  { id: 4, name: "TWS Wireless ANC Earbuds Pro", cat: "Gadgets", price: 890, old: 1450, off: "-38%", rate: "4.6 (94)", icon: "🎧", desc: "নয়েজ ক্যান্সেলেশন ও ডিপ বেস সাউন্ড কোয়ালিটি সহ ওয়্যারলেস ইয়ারবাডস।" },
  { id: 5, name: "RFL SS Single Wall Water Bottle", cat: "Gadgets", price: 270, old: 350, off: "-23%", rate: "4.8 (310)", icon: "🍶", desc: "৬৫০ মিলি স্টেইনলেস স্টিল পানির বোতল, অফিস বা স্কুলের জন্য সেরা।" },
  { id: 6, name: "RGB Mechanical Gaming Keyboard", cat: "Gadgets", price: 1850, old: 2500, off: "-26%", rate: "4.9 (65)", icon: "⌨️", desc: "মাল্টিকালার RGB ব্যাকলাইট ও ব্লু সুইচ গেমিং মেকানিক্যাল কিবোর্ড।" }
];

let cart = [];
let orders = JSON.parse(localStorage.getItem('jinneee_orders') || '[]');
let selectedPay = 'bKash';

function render(list) {
  const grid = document.getElementById('prodGrid');
  grid.innerHTML = '';
  list.forEach(p => {
    grid.innerHTML += '<div class="card" onclick="openDetail(' + p.id + ')">' +
      '<span class="off-tag">' + p.off + '</span>' +
      '<div class="prod-visual">' + p.icon + '</div>' +
      '<div class="prod-title">' + p.name + '</div>' +
      '<div><span class="price">৳' + p.price + '</span><span class="old-price">৳' + p.old + '</span></div>' +
      '<div class="rating">⭐ ' + p.rate + '</div>' +
      '<button class="btn-main" onclick="event.stopPropagation(); addCart(' + p.id + ')">কার্টে যোগ করুন</button>' +
    '</div>';
  });
}

function openDetail(id) {
  const p = products.find(x => x.id === id);
  document.getElementById('detailContent').innerHTML =
    '<div style="display:flex;justify-content:space-between;margin-bottom:10px;">' +
      '<span style="color:#38bdf8;font-size:12px;">Jinneee 3D Product View</span>' +
      '<span onclick="closeModals()" style="cursor:pointer;font-size:22px;">&times;</span>' +
    '</div>' +
    '<div class="prod-visual" style="height:160px;font-size:75px;">' + p.icon + '</div>' +
    '<h2 style="font-size:18px;margin:8px 0;">' + p.name + '</h2>' +
    '<div style="margin-bottom:8px;"><span class="price" style="font-size:22px;">৳' + p.price + '</span><span class="old-price">৳' + p.old + '</span></div>' +
    '<p style="font-size:13px;color:#bbb;line-height:1.5;margin-bottom:15px;">' + p.desc + '</p>' +
    '<button class="btn-main" onclick="addCart(' + p.id + '); closeModals(); openCart();">এখনই অর্ডার করুন (Buy Now)</button>';
  document.getElementById('detailModal').classList.add('open');
}

function filterCat(cat, el) {
  document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  render(cat === 'All' ? products : products.filter(p => p.cat === cat));
}

function searchItems() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  render(products.filter(p => p.name.toLowerCase().includes(q)));
}

function addCart(id) {
  cart.push(products.find(p => p.id === id));
  document.getElementById('cartCount').innerText = cart.length;
}

function openCart() {
  const list = document.getElementById('cartList');
  list.innerHTML = cart.length ? '' : '<p style="color:#888;">কার্ট খালি আছে</p>';
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    list.innerHTML += '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #222;">' +
      '<span>' + item.icon + ' ' + item.name + '</span><span style="color:#ff6b00;">৳' + item.price + '</span></div>';
  });
  document.getElementById('totalBill').innerText = total ? total + 60 : 0;
  document.getElementById('orderAddress').value = localStorage.getItem('jinneee_addr') || '';
  document.getElementById('cartModal').classList.add('open');
}

function closeModals() {
  document.getElementById('cartModal').classList.remove('open');
  document.getElementById('detailModal').classList.remove('open');
}

function setPay(btn, method) {
  selectedPay = method;
  document.querySelectorAll('.pay-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function confirmOrder() {
  if (!cart.length) return alert('কার্টে পণ্য যোগ করুন!');
  const addr = document.getElementById('orderAddress').value.trim();
  if (!addr) return alert('ডেলিভারি ঠিকানা ও ফোন নম্বর দিন!');
  const newOrder = {
    id: 'JIN-' + Math.floor(10000 + Math.random() * 90000),
    items: cart.map(c => c.name).join(', '),
    total: document.getElementById('totalBill').innerText,
    pay: selectedPay,
    addr: addr,
    status: 'Order Confirmed (Processing)'
  };
  orders.unshift(newOrder);
  localStorage.setItem('jinneee_orders', JSON.stringify(orders));
  cart = [];
  document.getElementById('cartCount').innerText = '0';
  closeModals();
  alert('অভিনন্দন! আপনার অর্ডার কনফার্ম হয়েছে। অর্ডার আইডি: ' + newOrder.id);
  switchTab('profile');
}

function switchTab(tab) {
  document.getElementById('homeView').style.display = tab === 'home' ? 'block' : 'none';
  document.getElementById('profileView').style.display = tab === 'profile' ? 'block' : 'none';
  document.getElementById('navHome').classList.toggle('active', tab === 'home');
  document.getElementById('navProf').classList.toggle('active', tab === 'profile');
  if (tab === 'profile') loadProfileAndOrders();
}

function saveProfile() {
  localStorage.setItem('jinneee_name', document.getElementById('profName').value);
  localStorage.setItem('jinneee_phone', document.getElementById('profPhone').value);
  localStorage.setItem('jinneee_addr', document.getElementById('profAddr').value);
  alert('প্রোফাইল তথ্য সফলভাবে সেভ হয়েছে!');
}

function loadProfileAndOrders() {
  document.getElementById('profName').value = localStorage.getItem('jinneee_name') || '';
  document.getElementById('profPhone').value = localStorage.getItem('jinneee_phone') || '';
  document.getElementById('profAddr').value = localStorage.getItem('jinneee_addr') || '';
  const box = document.getElementById('orderHistoryList');
  if (!orders.length) return;
  box.innerHTML = orders.map(o =>
    '<div style="background:#12121c;padding:12px;border-radius:12px;border:1px solid #2a2a3d;margin-bottom:10px;">' +
      '<div style="display:flex;justify-content:space-between;font-weight:bold;"><span>ID: ' + o.id + '</span><span style="color:#ff6b00;">৳' + o.total + '</span></div>' +
      '<div style="font-size:12px;margin:4px 0;">পণ্য: ' + o.items + '</div>' +
      '<div style="font-size:11px;color:#888;">পেমেন্ট: ' + o.pay + ' | ঠিকানা: ' + o.addr + '</div>' +
      '<span class="status-badge">🚚 ' + o.status + '</span>' +
    '</div>'
  ).join('');
}

// Native 100% Working 3D Hologram Sphere & Rings (Zero External Dependency)
const canvas = document.getElementById('canvas-3d');
const ctx = canvas.getContext('2d');
let angleX = 0, angleY = 0, dragging = false, lastX = 0, lastY = 0;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth || 340;
  canvas.height = canvas.offsetHeight || 220;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const points = [];
for (let i = 0; i < 160; i++) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(Math.random() * 2 - 1);
  const r = 75;
  points.push({ x: r * Math.sin(phi) * Math.cos(theta), y: r * Math.sin(phi) * Math.sin(theta), z: r * Math.cos(phi) });
}

canvas.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; lastY = e.clientY; });
window.addEventListener('pointerup', () => dragging = false);
window.addEventListener('pointermove', e => {
  if (!dragging) return;
  angleY += (e.clientX - lastX) * 0.015;
  angleX += (e.clientY - lastY) * 0.015;
  lastX = e.clientX; lastY = e.clientY;
});

function draw3D() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2, cy = canvas.height / 2;
  if (!dragging) { angleY += 0.018; angleX += 0.008; }

  points.forEach((p, idx) => {
    let x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
    let z1 = p.z * Math.cos(angleY) + p.x * Math.sin(angleY);
    let y2 = p.y * Math.cos(angleX) - z1 * Math.sin(angleX);
    let z2 = z1 * Math.cos(angleX) + p.y * Math.sin(angleX);

    const scale = 250 / (250 + z2);
    const sx = cx + x1 * scale;
    const sy = cy + y2 * scale;

    ctx.beginPath();
    ctx.arc(sx, sy, Math.max(1.5, 3 * scale), 0, Math.PI * 2);
    ctx.fillStyle = idx % 2 === 0 ? '#ff6b00' : '#38bdf8';
    ctx.fill();
  });
  requestAnimationFrame(draw3D);
}
draw3D();
render(products);
