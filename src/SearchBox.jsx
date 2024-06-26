import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import { useState } from 'react';
import axios from 'axios';
import "./SearchBox.css";


function SearchBox() {

  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [weatherResult, setWeatherResult] = useState(null);

  const apiKey = "fc341fa661721fad071653b5ebf96d18";

  const cold_URL = "https://media.istockphoto.com/id/1091792844/photo/snowy-branches.jpg?s=1024x1024&w=is&k=20&c=qQxGaVlAD9nEwWwS14x7JJU-WOZFei4JVH3p0F71XRw="
  const rainy_URL = 'https://plus.unsplash.com/premium_photo-1675968514495-7f3be70dddd6?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  const hot_URL = 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  const weatherInfo = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      console.log(response.data);

      let result = {
        name: response.data.name,
        temp: response.data.main.temp,
        maxTemp: response.data.main.temp_max,
        minTemp: response.data.main.temp_min,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        Description: response.data.weather[0].description

      };
      // console.log(result);
      setWeatherResult(result);
      setError(""); // Clear any previous error
   
    } catch (error) {
      setError("No such place in our API");
      setWeatherResult(null); // Clear previous result if there is an error
    }
  }

  const handleChange = (event) => {
    setCity(event.target.value);
  }

  const handlerSubmit = (event) => {
    event.preventDefault();
    weatherInfo();
    setCity(" ")
  }

  return (
    <>
     
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      <h1>Search for Weather</h1>
      <form onSubmit={handlerSubmit} style={{ textAlign: 'center' }}>
        <TextField
          id="outlined-basic"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
          style={{ marginBottom: '16px' }}
        />
        <br />
        <Button variant="contained" type="submit">Search</Button>
      </form>
      <br />
      {weatherResult && (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="Weather Image"
            height="140"
            image={weatherResult.humidity > 80 ? rainy_URL : weatherResult.temp >15 ? hot_URL:cold_URL}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {weatherResult.name} 
              <span style={{ marginLeft: '10px' }}></span>
              {weatherResult.humidity > 80 ? 
              <ThunderstormIcon/> :
               weatherResult.temp >15 ? 
               <WbSunnyIcon/>:
                <AcUnitIcon/>}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Temperature: {weatherResult.temp}°C<br />
              Max Temperature: {weatherResult.maxTemp}°C<br />
              Min Temperature: {weatherResult.minTemp}°C<br />
              {/* Feels Like: {weatherResult.feelsLike}°C<br /> */}
              Humidity: {weatherResult.humidity}%<br />
              The weather can be described as <i> <b>{weatherResult.Description}  </b>  </i> and feels_like {weatherResult.feelsLike}°C
            </Typography>
          </CardContent>
        </Card>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </div>
    </>
  );
}

export default SearchBox;
