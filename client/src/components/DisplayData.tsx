import { useEffect, useState } from "react";

type Props = {
  images: string[];
};

export const DisplayData = (props: Props) => {
  const { images } = props;
  const [currentImage, setCurrentImage] = useState(
    "https://stock.adobe.com/ca/images/red-heart-icons-set-vector/314564554",
  );

  useEffect(() => {
    let currentImageIndex = 0;
    let timer = setInterval(() => {
      if (currentImageIndex === images.length) {
        currentImageIndex = 0;
      }
      setCurrentImage(images[currentImageIndex + 1]);
      currentImageIndex += 1;
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [images]);
  console.log(images, "from display");
  return (
    <div>
      <img
        src={"https://dd.meteo.gc.ca/radar/CAPPI/GIF/CASKR/" + currentImage}
      />
    </div>
  );
};
