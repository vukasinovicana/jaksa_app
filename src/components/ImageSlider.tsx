import { Box, Button, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./css/ImageSlider.css";

type ImageSliderProps = {
  imageUrls: string[];
};

export function ImageSlider({ imageUrls }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const clearAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const startAutoSlide = () => {
    clearAutoSlide();
    intervalRef.current = setInterval(() => {
      setImageIndex((index) =>
        index === imageUrls.length - 1 ? 0 : index + 1
      );
    }, 3000);
  };

  const showNextImage = () => {
    setImageIndex((index) => (index === imageUrls.length - 1 ? 0 : index + 1));
    startAutoSlide(); // Reset timer
  };

  const showPrevImage = () => {
    setImageIndex((index) => (index === 0 ? imageUrls.length - 1 : index - 1));
    startAutoSlide(); // Reset timer
  };

  useEffect(() => {
    startAutoSlide(); // Start on mount
    return () => clearAutoSlide(); // Cleanup on unmount
  }, []);

  return (
    <Box className="sliderContainer">
      <Image
        src={imageUrls[imageIndex]}
        className="sliderImage"
        alt={`Slide ${imageIndex + 1}`}
      />
      <Button className="sliderButton prevButton" onClick={showPrevImage}>
        <IoIosArrowBack />
      </Button>
      <Button className="sliderButton nextButton" onClick={showNextImage}>
        <IoIosArrowForward />
      </Button>
    </Box>
  );
}
