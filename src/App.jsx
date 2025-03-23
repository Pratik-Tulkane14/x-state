import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "https://crio-location-selector.onrender.com";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [error, setError] = useState("");

  const getCountries = async () => {
    try {
      const response = await fetch(`${BASE_URL}/countries`);
      if (!response.ok) throw new Error("Failed to fetch countries");
      const data = await response.json();
      setCountries(data);
    } catch (err) {
      setError("Failed to fetch countries. Please try again later.");
      console.error(err);
    }
  };

  const getStates = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/country=${selectedCountry}/states`
      );
      if (!response.ok) throw new Error("Failed to fetch states");
      const data = await response.json();
      setStates(data);
    } catch (err) {
      setError("Failed to fetch states. Please try again later.");
      console.error(err);
    }
  };

  const getCities = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/country=${selectedCountry}/state=${selectedState}/cities`
      );
      if (!response.ok) throw new Error("Failed to fetch cities");
      const data = await response.json();
      setCities(data);
    } catch (err) {
      setError("Failed to fetch cities. Please try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setError("");
      getStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      setError("");
      getCities();
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="container">
      <h1>Select Location</h1>
      {error && <p className="error">{error}</p>}
      <div className="wrapper">
        <select
          id="country"
          className="dropdown"
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedState("");
            setSelectedCity("");
          }}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          id="state"
          className="dropdown"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
          }}
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          id="city"
          className="dropdown"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <h3>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </h3>
      )}
    </div>
  );
}

export default App;
