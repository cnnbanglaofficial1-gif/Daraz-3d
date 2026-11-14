const products = [
  { id: 1, name: "Haylou Solar Neo 2 Smart Watch", cat: "Watch", price: 3369, old: 4499, off: "-25%", rate: "4.9 (120)", img: "https://unsplash.com" },
  { id: 2, name: "Premium Cotton Winter Hoodie", cat: "Fashion", price: 410, old: 840, off: "-51%", rate: "4.7 (85)", img: "https://unsplash.com" },
  { id: 3, name: "Lotto Super Light Running Shoes", cat: "Fashion", price: 967, old: 1290, off: "-25%", rate: "4.8 (210)", img: "https://unsplash.com" },
  { id: 4, name: "TWS Wireless Noise Cancelling Buds", cat: "Gadgets", price: 890, old: 1450, off: "-38%", rate: "4.6 (94)", img: "https://unsplash.com" },
  { id: 5, name: "RFL SS Single Wall Water Bottle", cat: "Gadgets", price: 270, old: 350, off: "-23%", rate: "4.8 (310)", img: "https://unsplash.com" },
  { id: 6, name: "RGB Mechanical Gaming Keyboard", cat: "Gadgets", price: 1850, old: 2500, off: "-26%", rate: "4.9 (65)", img: "https://unsplash.com" }
];

let cart = [];

function render(list) {
  const grid = document.getElementById('prodGrid');
  grid.innerHTML = '';
  list.forEach(p => {
    grid.innerHTML += '<div class="card">' +
      '<span class="off-tag">' + p.off + '</span>' +
      '<img src="' + p.img + '" class="prod-img" />' +
      '<div class="prod-title">' + p.name + '</div>' +
      '<div class="price-row"><span class="price">৳' + p.price + '</span><span class="old-price">৳' + p.old + '</span></div>' +
      '<div class="rating">⭐ ' + p.rate + ' | Free Delivery</div>' +
      '<button class="btn-add" onclick="addCart(' + p.id + ')">কার্টে যোগ করুন</button>' +
    '</div>';
  });
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
  list.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    list.innerHTML += '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #222;">' +
      '<span>' + item.name + '</span><span style="color:#f85606;">৳' + item.price + '</span></div>';
  });
  document.getElementById('totalBill').innerText = total;
  document.getElementById('cartModal').classList.add('open');
}

function closeCart() { document.getElementById('cartModal').classList.remove('open'); }
function selectPay(btn) {
  document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}
function placeOrder() {
  if (!cart.length) return alert('কার্ট খালি!');
  alert('অভিনন্দন! আপনার অর্ডারটি সফলভাবে কনফার্ম হয়েছে।');
  cart = [];
  document.getElementById('cartCount').innerText = '0';
  closeCart();
}

// Flash Sale Timer
let sec = 9930;
setInterval(() => {
  sec--;
  let h = String(Math.floor(sec / 3600)).padStart(2, '0');
  let m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  let s = String(sec % 60).padStart(2, '0');
  document.getElementById('countdown').innerText = h + ' : ' + m + ' : ' + s;
}, 1000);

render(products);

// Pro 3D Glowing Ring + Particles (Three.js)
const box = document.getElementById('canvas-3d');
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(50, box.clientWidth / box.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(box.clientWidth, box.clientHeight);
box.appendChild(renderer.domElement);

const ring = new THREE.Mesh(
  new THREE.TorusGeometry(1.1, 0.28, 32, 100),
  new THREE.MeshStandardMaterial({ color: 0xf85606, emissive: 0x551100, metalness: 0.85, roughness: 0.15 })
);
scene.add(ring);

const innerCore = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.55, 1),
  new THREE.MeshStandardMaterial({ color: 0xa855f7, wireframe: true })
);
scene.add(innerCore);

const pLight = new THREE.PointLight(0xffffff, 2);
pLight.position.set(4, 4, 4);
scene.add(pLight, new THREE.AmbientLight(0xff7733, 1));
cam.position.z = 3.8;

let drag = false, px = 0, py = 0;
box.addEventListener('pointerdown', e => { drag = true; px = e.clientX; py = e.clientY; });
window.addEventListener('pointerup', () => drag = false);
window.addEventListener('pointermove', e => {
  if (!drag) return;
  ring.rotation.y += (e.clientX - px) * 0.015;
  ring.rotation.x += (e.clientY - py) * 0.015;
  px = e.clientX; py = e.clientY;
});

function animate() {
  requestAnimationFrame(animate);
  if (!drag) { ring.rotation.x += 0.01; ring.rotation.y += 0.015; }
  innerCore.rotation.y -= 0.02;
  renderer.render(scene, cam);
}
animate();
