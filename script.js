document.addEventListener("DOMContentLoaded", () => {
    flatpickr("#calendario", {
        dateFormat: "Y-m-d",
        maxDate: "today", // maxima fecha hoy
        defaultDate: "today"
    });   
});

const apiKey = "Vaqi7NS9GFoC4pvgD4dsjBxhPctg7zrO1TkXwuE6"; 
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

let imagenSeleccionada = null;


fetch(url)
    .then(response => response.json())
    .then(data => {
        document.getElementById("title").textContent = data.title;
        document.getElementById("date").textContent = data.date;
        document.getElementById("explanation").textContent = data.explanation;

        const mediaDiv = document.getElementById("media");

        if (data.media_type === "image") {
            mediaDiv.innerHTML = `<img src="${data.url}" width="600">`;
        } else if (data.media_type === "video") {
            mediaDiv.innerHTML = `<iframe width="600" height="400" src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
        } 

        imagenSeleccionada = {
            title: data.title,
            date: data.date,
            explanation: data.explanation,
            img: data.url
        };
    })
    .catch(error => {
        console.error("Error al obtener APOD:", error);
    });


function buscarImagen() {
    const fecha = document.getElementById("calendario").value;
    alert(fecha);
    alert(url);
    //const urlFecha = const url = `https://api.nasa.gov/planetary/apod?date=${fecha]&api_key=${apiKey}`;
    //alert(urlFecha);
    
    if (fecha === "") {
        alert("Ingrese una fecha");
        return;
    }

    fetch(url)
        .then(function(response) {
            alert("Entro00");
            if (!response.ok) {
                alert("Imagen no encontrada");
                return null;
            }
            return response.json();
            alert("Entro01");
        })    
        .then(function(data) {
            if(!data) return

            alert("Entro02");
            alert(data.title);
            alert(data.date);   
            imagenSeleccionada = {
                title: data.title,
                date: data.date,
                explanation: data.explanation,
                img: data.url
            };

            const resultado = document.getElementById("favorito");
            resultado.innerHTML = `<img src="${imagenSeleccionada.img}">
                <h2>${imagenSeleccionada.title}</h2>
            `;
        })
        .catch(function(error) {
            alert("Error en la búsqueda.");
        });
}

 
function guardarFavorito() {
    if (!imagenSeleccionada) {
        alert("Selecciona una imagen");
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const repetido = favoritos.some(function(p) {
        return p.title === imagenSeleccionada.title
    });

    if (repetido) {
        alert("La imagen ya está ingresada en favoritos");
        return;
    }

    favoritos.push(imagenSeleccionada);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    actualizarListaFavoritos();
}


function actualizarListaFavoritos() {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    const contenedor = document.getElementById("favoritos");
    contenedor.innerHTML = "";

    favs.forEach(p => {
        const div = document.createElement("div");
        div.className = "imagen-card listaFavoritos";
        div.innerHTML = `
            <img src="${p.image}" />
            <h3>${p.title}</h3>
        `;
        contenedor.appendChild(div);
    });
}

