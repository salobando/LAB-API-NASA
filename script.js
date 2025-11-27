// Asignar key generada por la API de la NASA
const apiKey = '7HJcd1G3d2OqH43i7L24BCWG5RbAolcbUar6OxUH';
const url = `https://api.nasa.gov/planetary/apod?apikey=${apiKey}`;
console.log(url);

async function obtenerImagen() {
  const respuesta = await fetch(`api.nasa.gov{apiKey}`);
  const fecha = await response.json();

  console.log(data); // Muestra el objeto de respuesta completo
  // Aquí puedes procesar los datos para mostrar la imagen, título, explicación, etc.
  // Por ejemplo:
  document.getElementById('apod-image').src = data.url;
  document.getElementById('apod-title').innerText = data.title;
}

obtenerImagen();