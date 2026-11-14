function initCategories() {
  const menu = document.getElementById('catMenu');
  const keys = Object.keys(categories);
  menu.innerHTML = keys.map((k, idx) => '<div class="cat-tab ' + (idx === 0 ? 'active' : '') + '" onclick="loadSubCat(\'' + k + '\', this)">' + k + '</div>').join('');
  loadSubCat(keys);
}

function loadSubCat(key, el) {
  if (el) {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }
  document.getElementById('catSubGrid').innerHTML = categories[key].map(s =>
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

function saveAccount() {
  localStorage.setItem('jin_name', document.getElementById('accName').value);
  localStorage.setItem('jin_phone', document.getElementById('accPhone').value);
  localStorage.setItem('jin_addr', document.getElementById('accAddr').value);
  document.getElementById('userTitle').innerText = document.getElementById('accName').value || 'Jinneee Shopper';
  alert('প্রোফাইল তথ্য সেভ হয়েছে!');
}

function openSubSection(sec) {
  document.getElementById('ordersSec').style.display = sec === 'ordersSec' ? 'block' : 'none';
  document.getElementById('infoSec').style.display = sec === 'infoSec' ? 'block' : 'none';
  if (sec === 'ordersSec') renderOrders('All');
}

function renderOrders(filter, el) {
  if (el) {
    document.querySelectorAll('.o-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }
  const list = filter === 'All' ? orders : orders.filter(o => o.status === filter);
  const box = document.getElementById('ordersContainer');
  if (!list.length) {
    box.innerHTML = '<div class="box-card" style="text-align:center;color:#888;">No Orders Found</div>';
    return;
  }
  box.innerHTML = list.map((o, i) =>
    '<div class="box-card">' +
      '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><b>Order #' + o.id + '</b><span style="color:#ff5e00;font-weight:bold;">' + o.status + '</span></div>' +
      '<div style="font-size:13px;margin-bottom:4px;">' + o.items + '</div>' +
      '<div style="font-size:11px;color:#666;">Payment: ' + o.pay + ' | Total: <b>৳' + o.total + '</b></div>' +
      (o.status !== 'Cancelled' ? '<button onclick="cancelOrder(' + i + ')" style="margin-top:8px;border:1px solid #ddd;background:#fff;padding:4px 10px;border-radius:6px;font-size:11px;">Cancel Order</button>' : '') +
    '</div>'
  ).join('');
}

function cancelOrder(idx) {
  orders[idx].status = 'Cancelled';
  localStorage.setItem('jinneee_orders', JSON.stringify(orders));
  renderOrders('All');
}

function switchTab(tab) {
  ['tabHome', 'tabCat', 'tabCart', 'tabAccount'].forEach(id => document.getElementById(id).style.display = 'none');
  ['nav-home', 'nav-cat', 'nav-cart', 'nav-account'].forEach(id => document.getElementById(id).classList.remove('active'));

  if (tab === 'home') { document.getElementById('tabHome').style.display = 'block'; document.getElementById('nav-home').classList.add('active'); }
  if (tab === 'cat') { document.getElementById('tabCat').style.display = 'block'; document.getElementById('nav-cat').classList.add('active'); }
  if (tab === 'cart') { document.getElementById('tabCart').style.display = 'block'; document.getElementById('nav-cart').classList.add('active'); renderCart(); }
  if (tab === 'account' || tab === 'orders') {
    document.getElementById('tabAccount').style.display = 'block';
    document.getElementById('nav-account').classList.add('active');
    document.getElementById('accName').value = localStorage.getItem('jin_name') || '';
    document.getElementById('accPhone').value = localStorage.getItem('jin_phone') || '';
    document.getElementById('accAddr').value = localStorage.getItem('jin_addr') || '';
    document.getElementById('userTitle').innerText = localStorage.getItem('jin_name') || 'Jinneee Shopper';
    renderOrders('All');
  }
}

renderGrid(products);
initCategories();
