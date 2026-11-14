const products = [
  { id: 1, name: "Haylou Solar Smart Watch", price: 3369, old: 4499, off: "-25%", color: "#ff6b35" },
  { id: 2, name: "Premium Winter Hoodie", price: 410, old: 840, off: "-51%", color: "#3b82f6" },
  { id: 3, name: "Lotto Running Shoes", price: 967, old: 1290, off: "-25%", color: "#10b981" },
  { id: 4, name: "TWS Wireless Earbuds", price: 750, old: 1200, off: "-37%", color: "#a855f7" },
  { id: 5, name: "RGB Gaming Keyboard", price: 1850, old: 2500, off: "-26%", color: "#ec4899" },
  { id: 6, name: "3D Hologram Projector", price: 2490, old: 3500, off: "-29%", color: "#f59e0b" }
];

let cart = [];

function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  list.forEach(function(p) {
    const card = document.createElement('div');
    card.className = 'glass card-3d rounded-xl p-3 flex flex-col justify-between relative';
    card.innerHTML =
      '<span class="absolute top-2 right-2 bg-[#f85606] text-[10px] px-1.5 py-0.5 rounded">' + p.off + '</span>' +
      '<div class="h-24 rounded-lg mb-2 flex items-center justify-center" style="background:' + p.color + '22">' +
        '<div class="w-12 h-12 rounded-full animate-pulse" style="background:' + p.color + '"></div>' +
      '</div>' +
      '<h3 class="text-xs font-semibold mb-1">' + p.name + '</h3>' +
      '<div class="mb-2"><span class="text-sm font-bold text-[#f85606]">৳' + p.price + '</span> <span class="text-[10px] text-gray-400 line-through">৳' + p.old + '</span></div>' +
      '<button onclick="addToCart(' + p.id + ')" class="w-full py-1.5 rounded bg-[#f85606] text-xs font-bold">কার্টে যোগ করুন</button>';
    grid.appendChild(card);
  });
}

function filterProducts() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  renderProducts(products.filter(function(p) { return p.name.toLowerCase().includes(q); }));
}

function addToCart(id) {
  const item = products.find(function(p) { return p.id === id; });
  cart.push(item);
  document.getElementById('cartCount').innerText = cart.length;
  updateCartUI();
}

function updateCartUI() {
  const box = document.getElementById('cartItems');
  box.innerHTML = '';
  let total = 0;
  cart.forEach(function(item) {
    total += item.price;
    const row = document.createElement('div');
    row.className = 'flex justify-between bg-white/5 p-2 rounded';
    row.innerHTML = '<span>' + item.name + '</span><span class="text-[#f85606]">৳' + item.price + '</span>';
    box.appendChild(row);
  });
  document.getElementById('totalPrice').innerText = total;
}

function toggleCart() {
  document.getElementById('cartModal').classList.toggle('hidden');
}

function checkout() {
  if (cart.length === 0) return alert('কার্ট খালি!');
  alert('অর্ডার সফলভাবে গ্রহণ করা হয়েছে!');
  cart = [];
  document.getElementById('cartCount').innerText = '0';
  updateCartUI();
  toggleCart();
}

renderProducts(products);

// 3D Animation
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(1.1, 0.35, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xf85606, metalness: 0.7, roughness: 0.2 });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xff8844, 0.8));
camera.position.z = 4.2;

let isDragging = false, prevX = 0, prevY = 0;
container.addEventListener('pointerdown', function(e) { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
window.addEventListener('pointerup', function() { isDragging = false; });
window.addEventListener('pointermove', function(e) {
  if (!isDragging) return;
  torusKnot.rotation.y += (e.clientX - prevX) * 0.01;
  torusKnot.rotation.x += (e.clientY - prevY) * 0.01;
  prevX = e.clientX; prevY = e.clientY;
});

function animate() {
  requestAnimationFrame(animate);
  if (!isDragging) {
    torusKnot.rotation.x += 0.008;
    torusKnot.rotation.y += 0.012;
  }
  renderer.render(scene, camera);
}
animate();
