import { useState } from "react"

import Logo from "./assets/Logo.png"
import LogoIcon from "./assets/LogoFavIcon.png"

const api = {
  key: "67b0b8985b22479e53c7a9ff808042d7",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <a href="#">
        <img className="LogoIcon" src={LogoIcon} alt="" />
      </a>
      <main>
        <header>
          <a href="/">
            <img src={Logo} alt="" />
          </a>
        </header>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search City..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
                <div className="feels">
                  <p>Feels Like: <span>{Math.round(weather.main.feels_like)}°c</span></p> <br />
                  <p>Humidity: <span>{Math.round(weather.main.humidity)}°c</span></p> <br />
                  <div>
                    <p>Min: <span>{Math.round(weather.main.temp_min)}°c</span></p>
                    <p>Max: <span>{Math.round(weather.main.temp_max)}°c</span></p>
                  </div>
                </div>
              </div>
              <div className="weather">
                <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} /> <br />
                {weather.weather[0].main}
                <p>Wind Speed: <span>{Math.round(weather.wind.speed)} km/h</span></p>
              </div>
            </div>
          </div>
        ) : (
          <div className="blank">
            <div className="glass">
              <p>Search the city you want on the input then simply press enter.</p>
            </div>
          </div>
        )}
        <div className="Crafted">
          Crafted by: <span>Blert</span>
          <div className="border"></div>
        </div>
      </main>
    </div>
  );
}

export default App;