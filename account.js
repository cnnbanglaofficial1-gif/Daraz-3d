function initCategories() {
  const menu = document.getElementById('catMenu');
  const keys = Object.keys(categories);
  menu.innerHTML = keys.map((k, idx) => '<div class="cat-tab ' + (idx === 0 ? 'active' : '') + '" onclick="loadSubCat(\'' + k + '\', this)">' + k + '</div>').join('');
  loadSubCat(keys[0]);
}

function loadSubCat(key, el) {
  if (el) {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }
  const items = categories[key] || [];
  document.getElementById('catSubGrid').innerHTML = items.map(s =>
    '<div class="sub-item" onclick="switchTab(\'home\'); filterHome(\'' + s.c + '\');"><div style="font-size:28px;margin-bottom:4px;">' + s.i + '</div>' + s.n + '</div>'
  ).join('');
}

function addToCart(id) {
  cart.push(products.find(p => p.id === id));
  document.getElementById('navBadge').innerText = cart.length;
}

function renderCart() {
  document.getElementById('cartTopCnt').innerText = cart.length;
  const box = document.getElementById('cartItemsBox');
  const chk = document.getElementById('checkoutBox');
  if (!cart.length) {
    box.innerHTML = '<div class="box-card" style="text-align:center;color:#888;padding:30px;">আপনার কার্ট এখন খালি</div>';
    chk.style.display = 'none';
    return;
  }
  let sub = 0;
  box.innerHTML = cart.map((item, idx) => {
    sub += item.price;
    return '<div class="box-card" style="display:flex;justify-content:space-between;align-items:center;">' +
      '<div><b>' + item.icon + ' ' + item.name + '</b><div style="color:#ff5e00;font-weight:bold;">৳' + item.price + '</div></div>' +
      '<button onclick="removeCart(' + idx + ')" style="border:none;background:#fee2e2;color:#dc2626;padding:5px 8px;border-radius:6px;">🗑️</button>' +
    '</div>';
  }).join('');
  document.getElementById('cartTotal').innerText = sub + 60;
  document.getElementById('chkName').value = localStorage.getItem('jin_name') || '';
  document.getElementById('chkPhone').value = localStorage.getItem('jin_phone') || '';
  document.getElementById('chkAddr').value = localStorage.getItem('jin_addr') || '';
  chk.style.display = 'block';
}

function removeCart(idx) {
  cart.splice(idx, 1);
  document.getElementById('navBadge').innerText = cart.length;
  renderCart();
}

function placeOrder() {
  const name = document.getElementById('chkName').value.trim();
  const phone = document.getElementById('chkPhone').value.trim();
  const addr = document.getElementById('chkAddr').value.trim();
  if (!name || !phone || !addr) return alert('নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন!');

  const order = {
    id: 'JIN-' + Math.floor(100000 + Math.random() * 900000),
    items: cart.map(c => c.icon + ' ' + c.name).join(', '),
    total: document.getElementById('cartTotal').innerText,
    pay: document.getElementById('chkPay').value,
    addr: name + ' (' + phone + '), ' + addr,
    status: 'To Ship'
  };
  orders.unshift(order);
  localStorage.setItem('jinneee_orders', JSON.stringify(orders));
  cart = [];
  document.getElementById('navBadge').innerText = '0';
  alert('অর্ডার কনফার্ম হয়েছে! Order ID: ' + order.id);
  switchTab('account');
  openSubSection('ordersSec');
}
