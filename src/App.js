import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = '384e601cb35001ae545fd783e37b5db0'; // Dein OpenWeatherMap API-Schlüssel

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
      setWeatherData((prevWeatherData) => {
        const newWeatherData = [...prevWeatherData, response.data];
        if (newWeatherData.length > 3) {
          newWeatherData.shift(); // Entferne die erste Stadt, wenn mehr als 3 Städte vorhanden sind
        }
        return newWeatherData;
      });
      setError(null);
      setCity('');
    } catch (error) {
      setError('Fehler beim Abrufen der Wetterdaten: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Wetter App</h1>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        placeholder="Stadtnamen eingeben"
      />
      <button variant="contained" onClick={getWeatherData}>Wetter abrufen</button>

      {weatherData.map((data, index) => (
        <div key={index}>
          <h2>Wetterdaten für {data.name}</h2>
          <p>Temperatur: {data.main.temp.toFixed(1)} °C</p>
          <p>Luftfeuchtigkeit: {data.main.humidity} %</p>
          <p>Wetterbeschreibung: {data.weather[0].description}</p>
        </div>
      ))}

      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
