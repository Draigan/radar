import { useEffect, useState, useRef } from "react";

type Props = {
  images: any;
  processType: string;
};

export const Animate = (props: Props) => {
  const { images, processType } = props;
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [intervalSpeed, setIntervalSpeed] = useState(6);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, intervalSpeed * 100);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, intervalSpeed]);

  const handlePause = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  const handleResume = () => {
    setIsRunning(true);
  };

  function handleSpeedChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIntervalSpeed(Number(event.target.value));
  }

  function handleSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentImageIndex(Number(event.target.value));
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <input
          style={{ width: "20%", transform: "scaleX(-1)" }}
          type="range"
          max={10}
          step={1}
          min={1}
          className="slider"
          value={intervalSpeed}
          onChange={handleSpeedChange}
        />
        &nbsp;&nbsp; {11 - intervalSpeed}x
        <div style={{ marginLeft: "auto" }}>
          {currentImageIndex + 1} of {images.length}
        </div>
      </div>
      <img
        style={{ width: "100%", maxWidth: 677 }}
        src={`https://dd.meteo.gc.ca/radar/${processType.toUpperCase()}/GIF/CASKR/${
          images[currentImageIndex]
        }`}
        alt="Slideshow"
      />
      <input
        style={{ width: "80%" }}
        type="range"
        max={images.length - 1}
        step={1}
        min={0}
        onMouseDown={() => handlePause()}
        onMouseUp={() => handleResume()}
        onTouchStart={() => handlePause()}
        onTouchEnd={() => handleResume()}
        value={currentImageIndex}
        onChange={handleSliderChange}
        className="slider"
      />
    </div>
  );
};
