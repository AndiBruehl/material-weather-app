import React, { useState } from 'react';
import axios from 'axios';
import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SendIcon from '@mui/icons-material/Send';
import '@fontsource/roboto/500.css';

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
    <Container maxWidth="md" align="center">
      <div className="App">
        <Typography variant="h1" fontFamily="Roboto" style={{ marginBottom: '20px' }}>
          Wetter App
        </Typography>
        <TextField
          id="standard-basic"
          label="Stadtnamen eingeben"
          size="small"
          variant="outlined"
          value={city}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
        />
        <Button startIcon={<SendIcon />} variant="contained" onClick={getWeatherData} size="medium" style={{ marginLeft: '20px' }}>
          Absenden
        </Button>

        <Stack spacing={2} sx={{ marginTop: '20px'}} direction= 'row'>
          {weatherData.map((data, index) => (
            <Card key={index} >
              <CardContent>
                <Typography variant="h5">Wetterdaten für {data.name}</Typography>
                <Typography variant="body1">Temperatur: {data.main.temp.toFixed(1)} °C</Typography>
                <Typography variant="body1">Luftfeuchtigkeit: {data.main.humidity} %</Typography>
                <Typography variant="body1">Wetterbeschreibung: {data.weather[0].description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {error && <p>{error}</p>}
      </div>
    </Container>
  );
};

export default App;
