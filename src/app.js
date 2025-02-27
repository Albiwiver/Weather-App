const apiKey = "0b06fc604afaf68384afd81331c012eb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";


const weatherBackgrounds = [
    {
        id: 'thunderstorm',
        URL:'https://images.pexels.com/photos/3933949/pexels-photo-3933949.jpeg'
    },
    {
        id: 'drizzle',
        URL:'https://images.pexels.com/photos/2792386/pexels-photo-2792386.jpeg'
    },
    {
        id: 'rain',
        URL:'https://images.pexels.com/photos/9586506/pexels-photo-9586506.jpeg'
    },
    {
        id: 'snow',
        URL:'https://images.pexels.com/photos/3801463/pexels-photo-3801463.jpeg'
    },
    {
        id: 'fog',
        URL:'https://images.pexels.com/photos/163323/fog-dawn-landscape-morgenstimmung-163323.jpeg'
    },
    {
        id: 'haze',
        URL:'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg'
    },
    {
        id: 'mist',
        URL:'https://images.pexels.com/photos/14675/pexels-photo-14675.jpeg'
    },
    {
        id: 'clear',
        URL:'https://images.pexels.com/photos/2456432/pexels-photo-2456432.jpeg'
    },
    {
        id: 'dust',
        URL:'https://images.pexels.com/photos/2669216/pexels-photo-2669216.jpeg'
    },
    {
        id: 'squall',
        URL:'https://images.pexels.com/photos/2792386/pexels-photo-2792386.jpeg'
    },
    {
        id: 'clouds',
        URL:'https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg'
    },
    {
        id: 'sand',
        URL:'https://images.pexels.com/photos/4353210/pexels-photo-4353210.jpeg'
    }
]

const weatherElements = [
    {
        id: 'temp-max-icon',
        icon:'<i class="fas fa-temperature-high text-red-300"></i>'
    },
    {
        id: 'temp-min-icon',
        icon:'<i class="fas fa-temperature-low text-blue-300"></i>'
    },
    {
        id: 'humedad-icon',
        icon: '<i class="fas fa-tint text-white"></i>'
    },
    {
        id: 'nubes-icon',
        icon:'<i class="fas fa-cloud text-white"></i>'
    },  
    {
        id: 'viento-icon',
        icon:'<i class="fas fa-wind text-white"></i>'
    } 
]

const weatherIcons = [
    {
        id: 'thunderstorm',
        icon:'<i class="fa-solid fa-cloud-bolt text-4xl sm:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl"></i>'
    },
    {
        id: 'drizzle',
        icon:'<i class="fa-solid fa-cloud-rain text-4xl sm:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl"></i>'
    },
    {
        id: 'rain',
        icon:'<i class="fa-solid fa-cloud-rain text-4xl sm:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl"></i>'
    },
    {
        id: 'snow',
        icon:'<i class="fa-regular fa-snowflake text-4xl sm:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl"></i>'
    },
    {
        id: 'atmosphere',
        icon:'<i class="fa-solid fa-smog  text-4xl sm:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl"></i>'
    },
    {
        id: 'clear',
        icon:'<i class="fa-regular fa-sun  text-4xl sm:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-amber-300" </i>'
    },
    {
        id: 'clouds',
        icon:'<i class="fa-solid fa-cloud  text-4xl sm:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl"></i>'
    }
    
]


async function obtenerClima(ciudad) {
    try {
        const respuesta = await fetch(`${apiUrl}?q=${ciudad.trim()}&appid=${apiKey}&units=metric&lang=es`);
        const datos = await respuesta.json();

        if (datos.cod === 200) {
            mostrarClima(datos);
            console.log(datos);
        } else {
            alert("Ciudad no encontrada");
        }
    } catch (error) {
        console.error("Error al obtener el clima:", error);
    }
}


function mostrarClima(datos) {

    document.getElementById("temperatura").textContent = `${Math.round(datos.main.temp)}°`;
    document.getElementById("ciudad").textContent = datos.name;
    document.getElementById("estado-clima").textContent = datos.weather[0].description;
    document.getElementById("temp-max").textContent = `${Math.round(datos.main.temp_max)}°C`;
    document.getElementById("temp-min").textContent = `${Math.round(datos.main.temp_min)}°C`;
    document.getElementById("humedad").textContent = `${datos.main.humidity}%`;
    document.getElementById("nubes").textContent = `${datos.clouds.all}%`;
    document.getElementById("viento").textContent = `${datos.wind.speed} km/h`;


    const climaIcon = weatherIcons.find(weatherIcon => weatherIcon.id === datos.weather[0].main.toLowerCase())           
    document.getElementById("clima-icon").innerHTML = climaIcon.icon;

    const weatherCondition = datos.weather[0].main.toLowerCase();
    const background = weatherBackgrounds.find(item => item.id === weatherCondition);
    
    if (background) {
        const weatherElement = document.getElementById("weather-background");
        
        weatherElement.style.backgroundImage = `url('${background.URL}')`;
        weatherElement.style.backgroundSize = 'cover';
        weatherElement.style.backgroundPosition = 'center';
    }


    const timestamp = datos.dt * 1000;
    const fecha = new Date(timestamp);

    const opcionesFecha = { weekday: "short", day: "numeric", month: "short" };
    const opcionesHora = { hour: "2-digit", minute: "2-digit", hour12: false };

    document.getElementById("fecha-hora").innerText = `
        ${fecha.toLocaleDateString("es-ES", opcionesFecha)},
        ${fecha.toLocaleTimeString("es-ES", opcionesHora)}
    `;

    weatherElements.forEach(weatherElement => {
        iconSelector(weatherElement.id, weatherElement.icon)
    })

}

function iconSelector (id, weatherIcon) {
    document.getElementById(id).innerHTML = weatherIcon
}


function keypressListener (id) {
    document.getElementById(id).addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const ciudad = document.getElementById(id).value.trim();
            if (ciudad !== "") {
                obtenerClima(ciudad);
            }
        }
    });
}


function clickListener (buttonId, inputId) {
    document.getElementById(buttonId).addEventListener("click", () => {
        const ciudad = document.getElementById(inputId).value.trim();
        if (ciudad !== "") {
            obtenerClima(ciudad);
        }
    });
}

keypressListener("ciudad-input-sidebar");
keypressListener("ciudad-input");

clickListener("buscar-btn-sidebar", "ciudad-input-sidebar");
clickListener("buscar-btn", "ciudad-input");