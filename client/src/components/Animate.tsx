import { useEffect, useState } from "react";

type Props = {
  images: any;
  processType: string;
};

export const Animate = (props: Props) => {
  const { images, processType } = props;
  // console.log(images);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      console.log(currentImageIndex, "index");
      console.log(images.length, "length");
    }, 300);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          {currentImageIndex} of {images.length}
        </div>
        <div>
          {currentImageIndex} of {images.length}
        </div>
      </div>
      <img
        src={`https://dd.meteo.gc.ca/radar/${processType.toUpperCase()}/GIF/CASKR/${
          images[currentImageIndex]
        }`}
        alt="Slideshow"
        style={{ width: "100%", height: "auto" }}
      />
      <button onClick={() => setCurrentImageIndex(0)}>Restart</button>
    </div>
  );
};
