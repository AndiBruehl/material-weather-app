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
import img from './img.jpg';
import Footer from './Footer.js'

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

  return (
    <div style={{
      backgroundImage: `url(${img})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh',
      backgroundAttachment: 'fixed',
      overflow: 'hidden',
    }}>
      <Container maxWidth="md" align="center">
        <div className="App">
          <Typography variant="h1" fontFamily="Roboto" style={{ marginBottom: '20px', color: '#90caf9' }}>
            Wetter App
          </Typography>
          <TextField
            InputProps={{
              style: {
                color: '#90caf9', // Hier die gewünschte Farbe für den Text im Textfeld angeben
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
            error={Boolean(error)} // Apply error style if error exists
            id="outlined-textarea"
            className="ein"
            label="Stadtnamen eingeben"
            size="small"
            variant="outlined"
            value={city}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            helperText={error} // Display the error message as the helper text
            color="primary" // Set the same color code as h1
          />
          <Button startIcon={<SendIcon />} variant="contained" onClick={getWeatherData} size="medium" style={{ marginLeft: '20px' }}>
            Absenden
          </Button>

          <Stack spacing={2} sx={{ marginTop: '20px' }} direction='row'>
            {weatherData.map((data, index) => (
              <Card key={index} style={{ background: '#90caf9' }}>
                <CardContent>
                  <Typography variant="h5">Wetterdaten für {data.name}</Typography>
                  <Typography variant="body1">Temperatur: {data.main.temp.toFixed(1)} °C</Typography>
                  <Typography variant="body1">Luftfeuchtigkeit: {data.main.humidity} %</Typography>
                  <Typography variant="body1">Wetterbeschreibung: {data.weather[0].description}</Typography>
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
