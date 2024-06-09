import { useMemo, useState } from "react";
import "./App.css";
import { DisplayData } from "./components/DisplayData";

function App() {
  const [data, setData] = useState();
  const [weather, setWeather] = useState("snow");
  const [processType, setProcessType] = useState("cappi");

  useMemo(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, [weather, processType]);
  return (
    data && (
      <>
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
      </>
    )
  );
}

export default App;
