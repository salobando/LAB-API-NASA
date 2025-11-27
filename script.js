const apiKey = "Vaqi7NS9GFoC4pvgD4dsjBxhPctg7zrO1TkXwuE6"; 


const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;


fetch(url)
    .then(response => response.json())
    .then(data => {
        document.getElementById("title").textContent = data.title;
        document.getElementById("date").textContent = data.date;
        document.getElementById("explanation").textContent = data.explanation;

        const mediaDiv = document.getElementById("media");

        
        if (data.media_type === "image") {
            mediaDiv.innerHTML = `<img src="${data.url}" width="600">`;
        }
       
        else if (data.media_type === "video") {
            mediaDiv.innerHTML = `<iframe width="600" height="400" src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
        }
    })
    .catch(error => {
        console.error("Error al obtener APOD:", error);
    });
