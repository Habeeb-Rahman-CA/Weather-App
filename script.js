//Assign the API Key and URL to a variable
const apiKey = "6a1da3e0e9351258c132e05f1edd52c8"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

//async function to check weather
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`) //Fetch API

    //If else to check the city name is valid
    if (response.status == 404) { //if it was invalid show there is a error and no data will shown.
        document.querySelector(".error").style.display = "block" 
        document.querySelector(".weather").style.display = "none" 
    } else {
        var data = await response.json() //if it was valid show the name of city, temp, humidity, and wind.

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"

        //show the image according to the weather condition and hide the error message.
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png"
        }
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }
}

//when 'click' the searchBtn show pass the value to the function
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})

//same happens when press the 'enter' key
searchBox.addEventListener('keypress', (enter) => {
    if (enter.key === 'Enter') {
        checkWeather(searchBox.value)
    }
});
