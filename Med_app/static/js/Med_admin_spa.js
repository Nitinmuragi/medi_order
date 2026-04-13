const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

function setActiveNav(route){
  qsa('.nav-btn').forEach(el => {
    el.classList.toggle('active', el.dataset.route === route);
  });
}

/* Components */
function DashboardHome(){
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="cards">
      <div class="card">
        <h3>Manage Users</h3>
        <p class="muted">View, edit, and manage user accounts.</p>
        <a class="cta" href="#/users">Open</a>
      </div>
      <div class="card">
        <h3>Manage Stores</h3>
        <p class="muted">Add or modify store information and locations.</p>
        <a class="cta" href="#/stores">Open</a>
      </div>
      <div class="card">
        <h3>View Orders</h3>
        <p class="muted">Browse and track orders from customers.</p>
        <a class="cta" href="#/orders">Open</a>
      </div>
    </div>
    <div class="content">
      <h4>Welcome to Admin</h4>
      <p class="muted">Use the controls above to manage users, stores, and view orders without reloading the page.</p>
    </div>
  `;
  return el;
}

function ManageUsers(){
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="content">
      <h3>Manage Users</h3>
      <p class="muted">A simple, client-side listing. Connect real data as needed.</p>
      <table class="table" style="margin-top:12px">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          <tr><td>Jane Doe</td><td>jane@example.com</td><td>Admin</td><td><a class="btn">Edit</a></td></tr>
          <tr><td>John Smith</td><td>john@example.com</td><td>Med_User</td><td><a class="btn">Edit</a></td></tr>
        </tbody>
      </table>
    </div>
  `;
  return el;
}

function ManageStores(){
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="content">
      <h3>Manage Stores</h3>
      <p class="muted">Stores can be added, edited, or disabled from here.</p>
      <table class="table" style="margin-top:12px">
        <thead><tr><th>Med_Store</th><th>City</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <tr><td>Central Pharmacy</td><td>Seattle</td><td>Active</td><td><a class="btn">Edit</a></td></tr>
          <tr><td>Downtown Clinic</td><td>Portland</td><td>Active</td><td><a class="btn">Edit</a></td></tr>
        </tbody>
      </table>
    </div>
  `;
  return el;
}

function ViewOrders(){
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="content">
      <h3>View Orders</h3>
      <p class="muted">Recent orders. Use filters or connect to real APIs to populate.</p>
      <table class="table" style="margin-top:12px">
        <thead><tr><th>Med_Order ID</th><th>Customer</th><th>Status</th><th>Total</th><th>Actions</th></tr></thead>
        <tbody>
          <tr><td>#1001</td><td>Jane Doe</td><td>Delivered</td><td>$42.00</td><td><a class="btn">View</a></td></tr>
          <tr><td>#1002</td><td>John Smith</td><td>In Transit</td><td>$18.50</td><td><a class="btn">View</a></td></tr>
        </tbody>
      </table>
    </div>
  `;
  return el;
}

const routes = {
  '': DashboardHome,
  '#/': DashboardHome,
  '#/users': ManageUsers,
  '#/stores': ManageStores,
  '#/orders': ViewOrders
};

function renderRoute(){
  const root = qs('#app-root');
  const hash = location.hash || '#/';
  const routeKey = routes[hash] ? hash : (hash.split('?')[0]);
  const comp = routes[routeKey] || DashboardHome;
  root.innerHTML = '';
  root.appendChild(comp());
  setActiveNav(routeKey);
  qs('.page-title').textContent = (routeKey === '#/users') ? 'Manage Users' : (routeKey === '#/stores') ? 'Manage Stores' : (routeKey === '#/orders') ? 'View Orders' : 'Admin Dashboard';
}

function init(){
  // Attach link interception for internal links
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    if(!href) return;
    if(href.startsWith('#')){
      e.preventDefault();
      location.hash = href.slice(1);
    }
  });

  window.addEventListener('hashchange', renderRoute);
  renderRoute();
}

document.addEventListener('DOMContentLoaded', init);
