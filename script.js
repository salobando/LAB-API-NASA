document.addEventListener("DOMContentLoaded", () => {
    flatpickr("#calendario", {
        dateFormat: "Y-m-d",
        maxDate: "today",
        defaultDate: "today",
        onChange: function (selectedDates, dateStr) {
            cargarAPOD(dateStr);
        }
    });

    cargarAPOD();
});

const apiKey = "Vaqi7NS9GFoC4pvgD4dsjBxhPctg7zrO1TkXwuE6";

let imagenSeleccionada = null;

//--------------------------------------------------------------------------------------

function cargarAPOD(fecha = "") {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    if (fecha !== "") {
        url += `&date=${fecha}`;
    }

    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            document.getElementById("title").textContent = data.title;
            document.getElementById("date").textContent = data.date;
            document.getElementById("explanation").textContent = data.explanation;

            const mediaDiv = document.getElementById("media");

            if (data.media_type === "image") {
                mediaDiv.innerHTML = `<img src="${data.url}" class="img-fluid" width="600">`;
            } else if (data.media_type === "video") {
                mediaDiv.innerHTML = `
<iframe width="600" height="400" src="${data.url}"
frameborder="0" allowfullscreen></iframe>`;
            }

            imagenSeleccionada = {
                title: data.title,
                date: data.date,
                explanation: data.explanation,
                img: data.url
            };
        })
        .catch(err => console.error("Error APOD:", err));
}

// ----------------------------------------------------------------------------------

function guardarFavorito() {
    if (!imagenSeleccionada) {
        alert("Selecciona una imagen");
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const repetido = favoritos.some(p => p.date === imagenSeleccionada.date);

    if (repetido) {
        alert("Ya está en favoritos");
        return;
    }

    favoritos.push(imagenSeleccionada);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    actualizarListaFavoritos();
}

//----------------------------------------------------------------------------------------
function actualizarListaFavoritos() {
    const lista = JSON.parse(localStorage.getItem("favoritos")) || [];
    const cont = document.getElementById("favoritos");

    cont.innerHTML = "";

    lista.forEach(p => {
        const div = document.createElement("div");
        div.className = "card p-2";
        div.style.width = "250px";

        div.innerHTML = `
<img src="${p.img}" class="img-fluid">
<h6 class="mt-2">${p.title}</h6>
<p class="text-muted">${p.date}</p>
`;

        cont.appendChild(div);
    });
}

actualizarListaFavoritos();