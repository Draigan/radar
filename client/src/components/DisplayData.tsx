import { useRef } from "react";
import { Animate } from "./Animate";

type Props = {
  data: any;
  weather: string;
  processType: string;
};

export const DisplayData = (props: Props) => {
  const { data, processType, weather } = props;
  let currentDB = useRef(data.cappi.rainLinks);

  if (weather === "rain" && processType === "cappi") {
    currentDB.current = data.cappi.rainLinks;
  }
  if (weather === "rain" && processType === "dpqpe") {
    currentDB.current = data.dpqpe.rainLinks;
  }
  if (weather === "snow" && processType === "cappi") {
    currentDB.current = data.cappi.snowLinks;
  }
  if (weather === "snow" && processType === "dpqpe") {
    currentDB.current = data.dpqpe.snowLinks;
  }

  return (
    <div>
      <Animate images={currentDB.current} processType={processType} />
    </div>
  );
};
