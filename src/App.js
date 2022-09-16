import React from 'react';
import '../src/index.css'
const api = {
  key: '4bda5f6561dd08e45209a1ef2a12dbdf',
  base: 'https://api.openweathermap.org/data/2.5/'
}
export default 
function App() {

  const [query, setQuery] = React.useState('');
  const [ weather, setWeather] = React.useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json()).then(result => {
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
    let year = d.getFullYear()

    return ` ${day} ${date} ${month} ${year} `


  }



  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'app'}>
      <main className='wrapper'>
        <div className="search-box">
          <input 
            type="text"
            className="search-input"
            placeholder="Search..."
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
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

