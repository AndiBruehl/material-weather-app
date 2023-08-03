import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = '384e601cb35001ae545fd783e37b5db0'; // Your OpenWeatherMap API key

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getWeatherData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError('Fehler beim Abrufen der Wetterdaten: ' + error.message);
      setWeatherData(null);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      <button onClick={getWeatherData}>Get Weather</button>

      {weatherData && (
        <div>
          <h2>Weather data for {city}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Weather description: {weatherData.weather[0].description}</p>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
