import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = '384e601cb35001ae545fd783e37b5db0'; // Your OpenWeatherMap API key

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      getWeatherData();
    }
  };

  const getWeatherData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeatherData((prevWeatherData) => [...prevWeatherData, response.data]);
      setError(null);
      setCity('');
    } catch (error) {
      setError('Fehler beim Abrufen der Wetterdaten: ' + error.message);
      setWeatherData([]);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        placeholder="Enter city name"
      />
      <button onClick={getWeatherData}>Get Weather</button>

      {weatherData.map((data, index) => (
        <div key={index}>
          <h2>Weather data for {data.name}</h2>
          <p>Temperature: {data.main.temp} °C</p>
          <p>Humidity: {data.main.humidity} %</p>
          <p>Weather description: {data.weather[0].description}</p>
        </div>
      ))}

      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
