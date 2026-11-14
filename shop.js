const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

function renderGrid(list) {
  const grid = document.getElementById('homeGrid');
  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'p-card';
    card.onclick = () => openProductDetail(p.id);
    card.innerHTML =
      '<div class="p-img"><span class="p-badge">' + p.off + '</span>' + p.icon + '</div>' +
      '<div class="p-info">' +
        '<div class="p-name">' + p.name + '</div>' +
        '<div><span class="p-price">৳' + p.price + '</span><span class="p-old">৳' + p.old + '</span></div>' +
        '<div class="p-rate">★ ' + p.rate + '</div>' +
      '</div>';
    grid.appendChild(card);
    observer.observe(card);
  });
}

function filterHome(cat) {
  renderGrid(cat === 'All' ? products : products.filter(p => p.cat === cat));
}

function searchProd() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  switchTab('home');
  renderGrid(products.filter(p => p.name.toLowerCase().includes(q)));
}

function openProductDetail(id) {
  const p = products.find(x => x.id === id);
  const obj = document.getElementById('obj3D');
  obj.innerText = p.icon;
  obj.style.transform = 'rotateY(0deg) rotateX(0deg)';

  document.getElementById('detailBody').innerHTML =
    '<div class="detail-card">' +
      '<div><span class="p-price" style="font-size:22px;">৳' + p.price + '</span> <span class="p-old">৳' + p.old + '</span></div>' +
      '<h3 style="font-size:16px;margin:8px 0;">' + p.name + '</h3>' +
      '<div class="p-rate">★★★★★ ' + p.rate + ' | Free Delivery</div>' +
    '</div>' +
    '<div class="detail-card">' +
      '<div style="font-weight:bold;font-size:13px;margin-bottom:6px;">Ratings & Reviews</div>' +
      '<div style="font-size:12px;color:#444;background:#f9f9f9;padding:8px;border-radius:6px;">⭐⭐⭐⭐⭐<br>' + p.review + '</div>' +
    '</div>' +
    '<div class="detail-card"><b>🏪 ' + p.seller + '</b><div style="font-size:11px;color:#666;">95% Positive Seller Ratings</div></div>';

  document.getElementById('btnAddCart').onclick = () => { addToCart(p.id); alert('কার্টে যোগ করা হয়েছে!'); };
  document.getElementById('btnBuyNow').onclick = () => { addToCart(p.id); closeDetail(); switchTab('cart'); };
  document.getElementById('detailPage').style.display = 'block';
}

function closeDetail() { document.getElementById('detailPage').style.display = 'none'; }

const stage = document.getElementById('stage3D');
let sx = 0, sy = 0;
stage.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; });
stage.addEventListener('pointermove', e => {
  if (e.buttons !== 1 && e.pointerType === 'mouse') return;
  const rx = (e.clientY - sy) * 0.5;
  const ry = (e.clientX - sx) * 0.5;
  document.getElementById('obj3D').style.transform = 'rotateX(' + (-rx) + 'deg) rotateY(' + ry + 'deg) scale(1.1)';
});
stage.addEventListener('pointerup', () => {
  document.getElementById('obj3D').style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});
