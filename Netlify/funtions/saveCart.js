// netlify/functions/saveCart.js
const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Método no permitido"
    };
  }

  try {
    const data = JSON.parse(event.body);
    const filePath = path.join("/tmp", "cart.json");

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Carrito guardado en Netlify Function" })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al guardar carrito", details: err.message })
    };
  }
};
