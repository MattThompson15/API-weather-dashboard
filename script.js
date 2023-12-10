// API key for OpenWeatherAPP
const APIKey = "12961d5b9ebac62ba8cdb709a0e71473";
// Array to store search history
const searchHistory = []

// Function to initiate weather search
function searchWeather() {
    const city = document.getElementById('search-input').value;
    // Fetch current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            addSearchToHistory(city);
        })
        .catch(error => console.error('Error fetching current weather', error));
    // Fetch and display 5-day forecast
    searchFutureWeather(city);

}
// Function to fetch and display 5-day forecast
function searchFutureWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            displayFutureWeather(data);
        })
        .catch(error => console.error('Error fetching future weather', error));

    }        
// Function to display current weather data  
function displayCurrentWeather(data) {
    console.log(data.weather[0].icon);
    const currentWeather = document.getElementById('current-weather');
    currentWeather.innerHTML = `
        <h2>${data.name}</h2>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
    `;
}
// Function to dislpay 5-day forecast data
function displayFutureWeather(data) {
    const futureWeather = document.getElementById('future-weather');
    futureWeather.innerHTML = '<h2>5-Day Forecast</h2>';
    for (let i = 0; i < data.list.length; i += 8) {
        const dayData = data.list[i];
        const date = new Date(dayData.dt * 1000);
        futureWeather.innerHTML += `
            <div class="forecast-card">
                <p>Date: ${date.toLocaleDateString()}</p>
                <p>Temperature: ${Math.round(dayData.main.temp - 273.15)}°C</p>
                <p>Humidity: ${dayData.main.humidity}%</p>
                <p>Wind Speed: ${dayData.wind.speed} m/s</p>
                <img src="https://openweathermap.org/img/w/${dayData.weather[0].icon}.png" alt="Weather Icon">
            </div>
        `;
    }
}
// Function to add searched history to tge search history
function addSearchToHistory(city) {
    searchHistory.push(city);
    updateSearchHistory();
}
// FUnction to update and display search history
function updateSearchHistory() {  
    const searchHistoryElement = document.getElementById('search-history');
    searchHistoryElement.innerHTML = `<p>Search History: ${searchHistory.join(', ')}</p>`;
}

