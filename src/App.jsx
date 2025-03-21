import { useEffect, useState } from "react";
import "./App.css";
const BASE_URL = "https://crio-location-selector.onrender.com";
function App() {
  const [location, setLocation] = useState({
    country: "",
    state: "",
    city: "",
  });
  const [countries, setCountries] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [city, setCity] = useState([]);
  const getStates = async () => {
    try {
      const result = await fetch(
        `${BASE_URL}/country=${location.country}/states`
      );

      const jsonResult = await result.json();
      setStateList(jsonResult);
    } catch (err) {
      console.log(err);
    }
  };
  const getCities = async () => {
    try {
      const result = await fetch(
        `${BASE_URL}/country=${location.country}/state=${location.state}/cities`
      );

      const jsonResult = await result.json();
      setCity(jsonResult);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getCountries = async () => {
      try {
        const result = await fetch(`${BASE_URL}/countries`);
        const jsonResult = await result.json();
        // const res = jsonResult.filter((item) => {
        //   return item.toLowerCase() !== "india";
        // });
        // res.push("India");
        setCountries(jsonResult);
      } catch (err) {
        console.log(err);
      }
    };
    getCountries();
    setLocation((prev) => ({ ...prev, state: "" }));
    setLocation((prev) => ({ ...prev, city: "" }));
  }, []);
  useEffect(() => {
    if (location.country !== "") {
      getStates();
      setLocation((prev) => ({ ...prev, city: "" }));
    }
  }, [location.country]);
  useEffect(() => {
    if (location.state !== "") {
      getCities();
    }
  }, [location.state]);
  return (
    <div className="container">
      <div className="">
        <h1>Select Location</h1>
      </div>
      <div className="wrapper">
        <select
          name="country"
          id="country"
          value={location.country}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, country: e.target.value }))
          }
        >
          <option>Select Country</option>
          {countries.map((item) => {
            return <option key={item}>{item}</option>;
          })}
        </select>
        <select
          name="state"
          id="state"
          disabled={location.country === ""}
          value={location.state}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, state: e.target.value }))
          }
        >
          <option>Select State</option>
          {stateList.map((item) => {
            return <option key={item}>{item}</option>;
          })}
        </select>
        <select
          name="city"
          id="city"
          disabled={location.state === ""}
          value={location.city}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, city: e.target.value }))
          }
        >
          <option>Select City</option>
          {city.map((item) => {
            return <option key={item}>{item}</option>;
          })}
        </select>
      </div>
      <div className="">
        {location.city && (
          <h3>
            You selected {location.city}, {location.state}, {location.country}
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
