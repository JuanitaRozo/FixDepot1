// scripts/main.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("recommendation-container");

  const recommendedProducts = [
    {
      name: "Cemento Portland",
      price: "$12.00 por bolsa",
      image: "https://via.placeholder.com/150?text=Cemento"
    },
    {
      name: "Ladrillo Hueco",
      price: "$0.50 por unidad",
      image: "https://via.placeholder.com/150?text=Ladrillo"
    },
    {
      name: "Arena Fina (m3)",
      price: "$25.00 por m³",
      image: "https://via.placeholder.com/150?text=Arena"
    },
    {
      name: "Pintura Blanca 4L",
      price: "$15.00",
      image: "https://via.placeholder.com/150?text=Pintura"
    }
  ];

  recommendedProducts.forEach(product => {
    const productDiv = document.createElement("div");

    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius: 8px;">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    `;

    container.appendChild(productDiv);
  });
});
