import { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faTemperatureHigh, faTemperatureLow, faDroplet, faWind, faSun, faMoon, faTemperatureFull, faCalendarDays  } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import 'moment/locale/fi'


function App() {

// State
const [apiData, setApiData] = useState({});
const [getState, setGetState] = useState('');
const [state, setState] = useState('');

// API KEY AND URL
const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}&units=metric&lang=fi`;

// Side effect
useEffect(() => {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => setApiData(data));
}, [apiUrl]);

const inputHandler = (event) => {
  setGetState(event.target.value);
};

const submitHandler = () => {
  setState(getState);
};

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Sää App</h2>
      </header>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div class="col-auto">
            <label for="location-name" class="col-form-label">
              Anna Kaupungin nimi :
            </label>
          </div>
          <div class="col-auto">
            <input
              type="text"
              id="location-name"
              class="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={submitHandler}>
            Hae
          </button>
        </div>
  
        <div className="card mt-3 mx-auto" style={{ width: '60vw' }}>
          {apiData.main ? (
            <div class="card-body text-center">
              <p className="h3">
                Lämpötila: <FontAwesomeIcon icon={faTemperatureFull}  fontSize="25px" color="red"/> {(apiData.main.temp)}&deg; C
              </p>
              <p className="h3">
                Sää: {''}
                <img
                  src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                  alt="weather status icon"
                  className="weather-icon"
                />
                <strong>{apiData.weather[0].description} </strong>
              </p>
              <p className="h3">
                Ilmanpaine: {''}
                <strong>
                  {apiData.main.pressure} hpa
                </strong>
              </p>
              <p className="h3">
              Kaupunki: <FontAwesomeIcon icon={faLocationDot} color="red" />{' '}
                <strong>{apiData.name}</strong>
              </p>
              <p className="h3">Tänään on <FontAwesomeIcon icon={faCalendarDays} fontSize="25px" color="blue" /> {moment().format('dddd, MMMM Do YYYY')}</p>
  
              <div className="row mt-4">
                <div className="col-md-6">
                <p className="h4">
                  Ylin Lämpötila: <FontAwesomeIcon icon={faTemperatureHigh} fontSize="25px" color="red"/>{' '}
                    <strong>
                      {(apiData.main.temp_max)}&deg; C
                    </strong>
                  </p>
                  <p className="h4">
                    Alin Lämpötila: <FontAwesomeIcon icon={faTemperatureLow} fontSize="25px" color="blue"/>{' '}
                    <strong>
                      {(apiData.main.temp_min)}&deg; C
                    </strong>
                  </p>
                  <p className="h4">
                    Suhteelinen Ilmankosteus: <FontAwesomeIcon icon={faDroplet} fontSize="20px" color="blue"/>{' '}
                    <strong>
                      {(apiData.main.humidity)}% 
                    </strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="h4">
                    Tuulen nopeus: <FontAwesomeIcon icon={faWind} fontSize="20px" color="blue"/>{' '}
                    <strong>
                      {(apiData.wind.speed)} m/s
                    </strong>
                  </p>
                  <p className="h4">
                    Aurinko nousee: <FontAwesomeIcon icon={faSun} fontSize="20px" color="orange"/>{' '}
                    <strong>
                      {new Date(apiData.sys.sunrise * 1000).toLocaleTimeString('en-FI')}
                    </strong>
                  </p>
                  <p className="h4">
                    Aurinko laskee: <FontAwesomeIcon icon={faMoon} fontSize="20px" color="silver"/>{' '}
                    <strong>
                      {new Date(apiData.sys.sunset * 1000).toLocaleTimeString('en-FI')}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
