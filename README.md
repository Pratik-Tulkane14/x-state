# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# x-state


in short you have to show like this
<p>
            You selected {location.city}, {location.state}, {location.country}
          </p>
this should be in h3 tag
1. Incorrect API Endpoints for States & Cities

Issue: You are using incorrect URLs for fetching states and cities.
Fix: Modify the API request URLs

Using this way -
const getStates = async () => {
  try {
    const result = await fetch(
      `${BASE_URL}/countries/${location.country}/states`
    );
    const jsonResult = await result.json();
    setState(jsonResult);
  } catch (err) {
    console.log(err);
  }
};

const getCities = async () => {
  try {
    const result = await fetch(
      `${BASE_URL}/countries/${location.country}/states/${location.state}/cities`
    );
    const jsonResult = await result.json();
    setCity(jsonResult);
  } catch (err) {
    console.log(err);
  }
};

2. Issue: You have a useState named state, which conflicts with the JavaScript keyword.
Fix: Rename it to statesList to avoid confusion

3. Issue: You need to ensure that countries are properly fetched and assigned.
Fix: Modify the API call in useEffect

4. Issue: Resetting state and city should be done in one setLocation call to avoid multiple renders.
Fix: Update the state handling inside useEffect

useEffect(() => {
  if (location.country !== "") {
    getStates();
    setLocation((prev) => ({ ...prev, state: "", city: "" }));
  }
}, [location.country]);

5. Issue: Resetting the city should be done after fetching the states.
Fix: Update the useEffect handling city reset

Fix these changes and make sure to go through the test file also for a better understanding