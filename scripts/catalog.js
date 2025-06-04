// scripts/catalog.js

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const searchInput = document.getElementById("search");

  fetch("../data/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      function renderProducts(filtered = products) {
        productList.innerHTML = "";

        filtered.forEach(product => {
          const card = document.createElement("div");
          card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <strong>$${product.price.toFixed(2)}</strong>
            <button data-id="${product.id}">Agregar al carrito</button>
          `;
          productList.appendChild(card);
        });

        // Agregar al carrito
        document.querySelectorAll("button[data-id]").forEach(btn => {
          btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            addToCart(id);
          });
        });
      }

      renderProducts();

      searchInput.addEventListener("input", () => {
        const q = searchInput.value.toLowerCase();
        const filtered = products.filter(p =>
          p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
        );
        renderProducts(filtered);
      });
    });

  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Producto agregado al carrito");
  }
});
