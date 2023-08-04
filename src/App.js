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
import './App.css';
import Footer from './footer.js'


const API_KEY = '384e601cb35001ae545fd783e37b5db0'; // Dein OpenWeatherMap API-Schlüssel

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setError(null); // Clear the error when user starts typing
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

  const getWeatherIcon = (description) => {
    switch (description) {
      case 'Clear':
        return < img src='sun.png' alt='sonnig' style={{ width: '80px', height: '80px' }} />;
      case 'Clouds':
        return < img src='overcastClouds.png' alt='Starkbewölkt' style={{ width: '80px', height: '80px' }} />;
      case 'Rain':
        return < img src='raindrop.png' alt='Regen' style={{ width: '80px', height: '80px' }} />;
      case 'Snow':
        return < img src='snow.png' alt='Schnee' style={{ width: '80px', height: '80px' }} />;
      case 'Thunderstorm':
        return < img src='storm.png' alt='Gewitter' style={{ width: '80px', height: '80px' }} />;
      default:
        return < img src='cloudy.png' alt='wolkig' style={{ width: '80px', height: '80px' }} />;
    }
  };

  return (
    <div className="background" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="md" align="center" >
        <div className="App">
          <Typography variant="h1" fontFamily="Playfair Display" style={{ marginBottom: '30px', color: '#90caf9', marginTop: '30px' }}>
            WeatherNow
          </Typography>
          <TextField
            InputProps={{
              style: {
                color: '#90caf9',
              },
            }}
            InputLabelProps={{
              style: {
                color: '#90caf9',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#90caf9',
                },
                '&:hover fieldset': {
                  borderColor: '#29b6f6',
                },
                '&:active fieldset': {
                  borderColor: '#0288d1',
                }
              },
            }}
            error={Boolean(error)}
            id="outlined-textarea"
            className="ein"
            label="Stadtnamen eingeben"
            size="small"
            variant="outlined"
            value={city}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            helperText={error}
            color="primary"
          />
          <Button startIcon={<SendIcon />} variant="contained" onClick={getWeatherData} size="medium" style={{ marginLeft: '20px' }}>
            Absenden
          </Button>

          <Stack spacing={2} sx={{ marginTop: '100px', justifyContent: 'center' }} direction='row'>
            {weatherData.map((data, index) => (
              <Card key={index} style={{ background: '#90caf9', margin: '10px', minWidth: '400px', }}>
                <CardContent>
                  <Typography variant="h5" >Wetterdaten für {data.name}</Typography>
                  <Typography variant="body1" >Temperatur: {data.main.temp.toFixed(1)} °C</Typography>
                  <Typography variant="body1" >Luftfeuchtigkeit: {data.main.humidity} %</Typography>
                  <Typography variant="body1">
                    {getWeatherIcon(data.weather[0].main)} { }
                    {/* {data.weather[0].description} */}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default App;