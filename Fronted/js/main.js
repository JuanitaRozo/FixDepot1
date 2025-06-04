// Lógica para login
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Inicio de sesión exitoso');
      window.location.href = 'catalog.html';
    } else {
      alert(data.error || 'Error al iniciar sesión');
    }
  });
}

// Lógica para registro
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Registro exitoso. Inicia sesión.');
      window.location.href = 'login.html';
    } else {
      alert(data.error || 'Error al registrarse');
    }
  });
}

// Cargar catálogo
if (document.getElementById('catalog')) {
  const loadCatalog = async () => {
    const res = await fetch('/api/products');
    const products = await res.json();
    const catalog = document.getElementById('catalog');
    catalog.innerHTML = products.map(p => `
      <div class="product-card">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <strong>$${p.price}</strong>
        <button onclick="addToCart('${p._id}', '${p.name}', '${p.price}')">Agregar al carrito</button>
      </div>
    `).join('');
  };

  loadCatalog();
}

function addToCart(productId, name, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.productId === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productId, name, price, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`Producto "${name}" agregado al carrito.`);
}
