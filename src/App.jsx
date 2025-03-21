import  { useEffect, useState } from 'react';
import "./XState.css";

function XState() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const apiData = await fetch("https://crio-location-selector.onrender.com/countries");
                const actualData = await apiData.json();
                const filteredData = await actualData.map((item) => item.trim());
                console.log(filteredData);
                console.log(actualData);
                setCountries(filteredData);
            } catch (error) {
                console.log("Failed to fetch country data : ", error.message);
            }
        }
        fetchCountry();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const fetchState = async () => {
                try {
                    const apiData = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
                    const actualData = await apiData.json();
                    console.log(actualData);
                    setStates(actualData);
                } catch (error) {
                    console.log("Failed to fetch State data : ", error.message);
                }
            }
            fetchState();
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            const fetchCity = async () => {
                try {
                    const apiData = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
                    const actualData = await apiData.json();
                    console.log(actualData);
                    setCities(actualData);
                } catch (error) {
                    console.log("Failed to fetch State data : ", error.message);
                }
            }
            fetchCity();
        }
    }, [selectedCountry, selectedState]);

    return (
        <>
            <h1>Select Location</h1>
            <select id="field1" value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(""); setSelectedCity(""); }}>
                <option                      disabled>Select Country</option>
                {countries.map((item, index) => {
                    return (
                        <option key={index} value={item}>{item}</option>
                    )
                })}
            </select>

            <select id="field2" value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(""); }}>
                <option value="" disabled>Select State</option>
                {states.map((item, index) => {
                    return (
                        <option key={index} value={item}>{item}</option>
                    )
                })}
            </select>

            <select id="field3" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} >
                <option value="" disabled>Select City</option>
                {Array.isArray(cities) && cities.map((item, index) => {
                    return (
                        <option key={index} value={item}>{item}</option>
                    )
                })}
            </select>

            {selectedCity && <h3>You selected {selectedCity}, {selectedState}, {selectedCountry}</h3>}
        </>
    )
}

export default XState;
// import { useEffect, useState } from "react";
// import "./App.css";
// const BASE_URL = "https://crio-location-selector.onrender.com";
// function App() {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [city, setCity] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const getStates = async () => {
//     try {
//       const result = await fetch(
//         `${BASE_URL}/country=${selectedCountry}/states`
//       );

//       const jsonResult = await result.json();
//       setStates(jsonResult);
//     } catch (err) {
//             setStates("");
//       console.log("Failed to fetch country data : ", err.message);
//     }
//   };
//   const getCities = async () => {
//     try {
//       const result = await fetch(
//         `${BASE_URL}/country=${selectedCountry}/state=${selectedState}/cities`
//       );

//       const jsonResult = await result.json();
//       setCity(jsonResult);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     const getCountries = async () => {
//       try {
//         const result = await fetch(`${BASE_URL}/countries`);
//         const jsonResult = await result.json();
//         setCountries(jsonResult);
//       } catch (err) {
//         console.log("Failed to fetch country data : ", err.message);
//       }
//     };
//     getCountries();
//   }, []);
//   useEffect(() => {
//     if (selectedCountry !== "") {
//       getStates();
//     }
//   }, [selectedCountry]);
//   useEffect(() => {
//     if (selectedCountry && selectedState) {
//       getCities();
//     }
//   }, [selectedCountry, selectedState]);
//   return (
//     <div className="container">
//       <div className="">
//         <h1>Select Location</h1>
//       </div>
//       <div className="wrapper">
//         <select
//           name="country"
//           id="country"
//           className="dropdown"
//           value={selectedCountry}
//           onChange={(e) => {
//             setSelectedCountry(e.target.value);
//             setSelectedState("");
//             setSelectedCity("");
//           }}
//         >
//           <option value="" disabled>
//             Select Country
//           </option>
//           {countries.map((item) => {
//             return <option key={item}>{item}</option>;
//           })}
//         </select>
//         <select
//           name="state"
//           id="state"
//           className="dropdown"
//           value={selectedState}
//           onChange={(e) => {
//             setSelectedState(e.target.value);
//             setSelectedCity("");
//           }}
//         >
//           <option value="" disabled>
//             Select State
//           </option>
//           {states.map((item) => {
//             return <option key={item}>{item}</option>;
//           })}
//         </select>
//         <select
//           name="city"
//           id="city"
//           className="dropdown"
//           // disabled={location.state === ""}
//           value={selectedCity}
//           onChange={(e) => setSelectedCity(e.target.value)}
//         >
//           <option value="" disabled>
//             Select City
//           </option>
//           {city.map((item) => {
//             return <option key={item}>{item}</option>;
//           })}
//         </select>
//       </div>
//       <div className="">
//         {selectedCity && (
//           <h3>
//             You selected {selectedCity}, {selectedState}, {selectedCountry}
//           </h3>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
