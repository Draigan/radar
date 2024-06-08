import { useMemo, useState } from "react";
import "./App.css";
import { DisplayData } from "./components/DisplayData";

function App() {
  const [data, setData] = useState();
  const [weather, setWeather] = useState("snow");
  const [processType, setProcessType] = useState("caprpri");

  useMemo(() => {
    console.log("Usememoran");
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        // console.log(res);
      });
  }, [weather]);
  return (
    data && (
      <>
        <h2>King Station Radar</h2>
        <DisplayData images={data.cappi.snowLinks} />
        <p>
          {weather} {processType}
        </p>
        <div className="card">
          <div>
            <button onClick={() => setWeather("snow")}>Snow</button>
            <button
              onClick={() => {
                console.log(data);
                setWeather("rain");
              }}
            >
              Rain
            </button>
          </div>
          <div>
            <button onClick={() => setProcessType("caprpri")}>CAPRPRI</button>
            <button onClick={() => setProcessType("dpqpe")}>DPQPE</button>
          </div>
        </div>
      </>
    )
  );
}

export default App;
