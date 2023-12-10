var APIKey = "12961d5b9ebac62ba8cdb709a0e71473";


function SearchWeather() {
    const city = document.getElementById('search-input').value;
    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}`)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);
                addSearchToHistory(city);
        })
            .catch(error => console.error('Error fetching current weather', error));
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}`)
            .then(response => response.json())
            .then(data => displayFutureWeather(data))
            .catch(error => console.error('Error fetching future weather:', error));

    }
}

function displayCurrentWeather(data) {
    const CurrentWeather = document.getElementById('current-weather');
    CurrentWeather.innerHTML = `
        <h2> ${data.name}</h2>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayFutureWeather(data) {
    const futureWeather = document.getElementById('future-weather');
    futureWeather.innerHTML = '<h2>5Day Forecast</h2>';
    for (let i = 0; i < data.list.length; i += 8) {
        const dayData = data.list[i];
        const date = new Date(dayData.dt_txt);
        futureWeather.innerHTML += `
            <div class="forecast-card">
                <p>Date: ${date.toLocaleDateString()}</p>
                <p>Temperature: ${Math.round(dayData.main.temp - 273.15)}°C</p>
                <p>Humidity: ${dayData.main.humidity}%</p>
                <p>Wind Speed: ${day.Data.wind.speed} m/s</p>
            </div>
        `;
    }
}

function addSearchToHistory(city) {
    searchHistory.push(city);
    const searchHistoryElement = document.getElementById('search-history')
    searchHistoryElement.innerHTML = `<p>Search History: ${searchHistory.join(', ')}</p>`;
}

