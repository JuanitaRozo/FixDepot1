// main.js

document.addEventListener("DOMContentLoaded", () => {
  // 🔐 LOGIN
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
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

  // 📝 REGISTRO
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
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

  // 🛒 CATÁLOGO
  const catalog = document.getElementById('catalog');
  if (catalog) {
    const loadCatalog = async () => {
      const res = await fetch('/api/products');
      const products = await res.json();

      catalog.innerHTML = products.map(p => `
        <div class="product-card">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <strong>$${p.price}</strong><br>
          <button onclick="addToCart('${p._id}', '${p.name}', ${p.price})">Agregar al carrito</button>
        </div>
      `).join('');
    };
    loadCatalog();
  }

  // 🤖 RECOMENDACIONES
  const container = document.getElementById("recommendation-container");
  if (container) {
    const recommendedProducts = [
      {
        name: "Cemento Portland",
        price: "$12000 por bolsa",
        image: "https://via.placeholder.com/150?text=Cemento"
      },
      {
        name: "Ladrillo Hueco",
        price: "$5000 por unidad",
        image: "https://via.placeholder.com/150?text=Ladrillo"
      },
      {
        name: "Arena Fina (m3)",
        price: "$25000 por m³",
        image: "https://via.placeholder.com/150?text=Arena"
      },
      {
        name: "Pintura Blanca 4L",
        price: "$15000",
        image: "https://via.placeholder.com/150?text=Pintura"
      }
    ];

    recommendedProducts.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.className = "product-card";
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius: 8px;">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
      `;
      container.appendChild(productDiv);
    });
  }
});

// 🛒 CARRITO GLOBAL (localStorage)
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ id, name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`Producto "${name}" agregado al carrito`);
}
