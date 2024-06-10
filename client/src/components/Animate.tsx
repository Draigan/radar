import { useEffect, useState, useRef } from "react";

type Props = {
  images: any;
  processType: string;
};

export const Animate = (props: Props) => {
  const { images, processType } = props;
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 300); // Adjust interval time as needed
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handlePause = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  const handleResume = () => {
    setIsRunning(true);
  };

  function handleSliderChange(event: React.ChangeEvent<HTMLElement>) {
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
          style={{ width: "20%" }}
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

        <div style={{ marginLeft: "auto" }}>
          {currentImageIndex} of {images.length}
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
        style={{ width: "75%" }}
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
