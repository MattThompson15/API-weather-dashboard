const apiKey = '2b743678787b12465c353c045903bc46';

const searchHistory = [];

function SearchWeather() {
    const city = document.getElementById('search-input').value;
    if (city) {
        fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={APIkey}')
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);
                addSearchToHistory(city);
        })
            .catch(error => console.error('Error fetching current weather', error));
        
        fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={APIkey}')
            .then(response => response.json())
            .then(data => displayFutureWeather(data))
            .catch(error => console.error('Error fetching future weather:', error));

    }
}