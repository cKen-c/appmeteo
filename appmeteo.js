//// APP METEO 

// let et lng ici juste pour l'exemple
let lat = 48.84840999387403
let lng = 2.3878419973094007
let apiKey = "d53a335f75c15b4b771382c57e3eaa50"

let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`

// Vous allez réaliser une application de type Météo

// Première requete de test
fetch(url)
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err))

// OBJECTIFS :

// 1) Vous allez faire une première version de l'app ou l'on peut se géolocaliser en cliquant sur un bouton 
// 2) Afin de se géolocaliser vous allez utiliser la fonction geolocate (https://www.w3schools.com/html/html5_geolocation.asp)
// 3) Quand on clique sur le bouton vous devez récupérer latitude et longitude de votre position et inclure ces infos 
// dans le lien de la requete
// 4) On va vouloir afficher une image du temps qu'il fait via des icones prévues (https://openweathermap.org/weather-conditions)
// 5) On voudra afficher également l atempérature en degrés, la ville et le pays

// ETAPES A SUIVRE : 

// Coder les éléments HTML (le bouton geolocate, les div - ou autre - destinés à recevoir les infos depuis le JS)
// Dans le JS on récupère ces éléments (querySelector tout ca), on écoute le bouton Geolocate qui lors du click
// viendra déclencher la fonction de geolocalisation (cf le lien plus haut) et la requete API avec les bonnes lat et lng
// Enfin vous afficherez les éléments pertinents que vous recevez de l'API dans le HTML (depuis le JS)
// Pourquoi pas styliser le tout eà la fin

document.getElementById("geolocate").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric&lang=fr`;
           
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    document.getElementById("city").textContent = `${data.name}, ${data.sys.country}`;
                    document.getElementById("temperature").textContent = `Température: ${data.main.temp}°C`;
                    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                    document.getElementById("weather-icon").alt = data.weather[0].description;
                })
                .catch(err => console.log(err));
        }, error => {
            console.log("Erreur de géolocalisation", error);
        });
    } else {
        console.log("La géolocalisation n'est pas supportée par ce navigateur.");
    }
});