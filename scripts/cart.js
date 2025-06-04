document.addEventListener('DOMContentLoaded', () => {
  const cartTableBody = document.querySelector('#cart-table tbody');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Cargar carrito desde localStorage o inicializar vacío
  let cart = JSON.parse(localStorage.getItem('fixDepotCart')) || [];

  // Función para guardar carrito en localStorage
  function saveCart() {
    localStorage.setItem('fixDepotCart', JSON.stringify(cart));
  }

  // Función para calcular total
  function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Función para renderizar el carrito
  function renderCart() {
    cartTableBody.innerHTML = '';
    if (cart.length === 0) {
      cartTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Tu carrito está vacío</td></tr>`;
      cartTotalEl.textContent = '$0.00';
      return;
    }

    cart.forEach((item, index) => {
      const subtotal = (item.price * item.quantity).toFixed(2);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
          ${item.quantity}
          <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
        </td>
        <td>$${subtotal}</td>
        <td><button class="remove-btn" data-index="${index}">Eliminar</button></td>
      `;

      cartTableBody.appendChild(row);
    });

    cartTotalEl.textContent = `$${calculateTotal().toFixed(2)}`;
  }

  // Manejo de clicks para botones cantidad y eliminar
  cartTableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('qty-btn')) {
      const index = e.target.dataset.index;
      if (e.target.dataset.action === 'increase') {
        cart[index].quantity++;
      } else if (e.target.dataset.action === 'decrease') {
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        }
      }
      saveCart();
      renderCart();
    } else if (e.target.classList.contains('remove-btn')) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });

  // Evento para finalizar compra
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    alert('¡Compra realizada con éxito! Gracias por preferir FixDepot.');
    cart = [];
    saveCart();
    renderCart();
  });

  // Render inicial
  renderCart();
});
