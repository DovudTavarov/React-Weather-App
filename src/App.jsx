import "./App.css";
import Button from "./component/Button";
import { useEffect, useState } from "react";
import Form from "./component/Form";

export default function App() {
  const [data, setData] = useState(null);
  const [inputVal, setInputVal] = useState("chicago");
  const [selectTempUnit, setSelectTempUnit] = useState("");
  const [night, setNight] = useState(false);
  useEffect(() => {
    if (inputVal) {
      fetchReq(inputVal);
    }
  }, [selectTempUnit]);

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchReq(inputVal);
  };
  const handleUnitChangeToFaren = () => {
    setSelectTempUnit("farenheit");
  };
  const handleUnitChangeToCel = () => {
    setSelectTempUnit("celcius");
  };
  const toggleNightMode = () => {
    setNight((prev) => !prev);
  };

  const fetchReq = async (cityName) => {
    const unit = selectTempUnit === "farenheit" ? "imperial" : "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=d030ac84773f6c1da5dcb6a7fe964373`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      setData(result);
    } catch (error) {
      console.log(error);
    }
  };
  if (!data) {
    return <h1>Loading...</h1>;
  }
  const { name, main, wind } = data;

  return (
    <div className={night ? "night" : "App"}>
      <div className="button-container">
        <button onClick={handleUnitChangeToFaren} className="farenheit">
          Farenheit
        </button>
        <button onClick={handleUnitChangeToCel} className="celcius">
          Celcius
        </button>
      </div>
      <Form
        inputVal={inputVal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="button-container">
        <button onClick={toggleNightMode} className="save-location-btn">
          {night ? "Day Mode" : "Night Mode"}
        </button>
      </div>
      <div className="content">
        <div className="top">
          <p className="location">{name}</p>
          <h1 className="temp">
            {main.temp}
            {selectTempUnit === "farenheit" ? "F°" : "C°"}
          </h1>
          <div className="app-name">Weather App</div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">{`${main.feels_like}°`}</p>
            <p>Feels like</p>
          </div>
          <div className="humidity">
            <p className="bold">{main.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">{wind.speed}miles/hr</p>
            <p>Wind speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
