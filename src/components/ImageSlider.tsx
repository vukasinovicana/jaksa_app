import { Box, Button, Image } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./css/ImageSlider.css"; // ✅ Import CSS

type ImageSliderProps = {
  imageUrls: string[];
};

export function ImageSlider({ imageUrls }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => (index === imageUrls.length - 1 ? 0 : index + 1));
  }

  function showPrevImage() {
    setImageIndex((index) => (index === 0 ? imageUrls.length - 1 : index - 1));
  }

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
