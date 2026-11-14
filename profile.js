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
