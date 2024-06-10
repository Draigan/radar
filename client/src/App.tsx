import { useEffect, useState } from "react";
import "./App.css";
import { DisplayData } from "./components/DisplayData";

function App() {
  const [data, setData] = useState();
  const [weather, setWeather] = useState("snow");
  const [processType, setProcessType] = useState("cappi");

  function fetchData() {
    fetch("https://ec2.draigan.com/radar")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        console.log("date: ", res.date);
        console.log("cappi length: ", res.cappi.snowLinks.length);
      });
  }

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => fetchData(), 10000);

    return clearInterval(timer);
  }, []);

  return (
    data && (
      <div style={{ maxWidth: 677 }}>
        <h2>King Station Radar</h2>
        <DisplayData data={data} weather={weather} processType={processType} />
        <div className="card">
          <div>
            <button
              style={{
                borderColor: weather === "snow" ? "#646cff" : "transparent",
              }}
              onClick={() => setWeather("snow")}
            >
              Snow
            </button>
            <button
              style={{
                borderColor: weather === "rain" ? "#646cff" : "transparent",
              }}
              onClick={() => {
                setWeather("rain");
              }}
            >
              Rain
            </button>
          </div>
          <div>
            <button
              style={{
                borderColor:
                  processType === "cappi" ? "#646cff" : "transparent",
              }}
              onClick={() => setProcessType("cappi")}
            >
              CAPPI
            </button>
            <button
              style={{
                borderColor:
                  processType === "dpqpe" ? "#646cff" : "transparent",
              }}
              onClick={() => setProcessType("dpqpe")}
            >
              DPQPE
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default App;
