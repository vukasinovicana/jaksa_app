import { Box, Button, Image } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { colors } from "../constants";

type ImageSliderProps = {
  imageUrls: string[];
};

export function ImageSlider({ imageUrls }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === imageUrls.length - 1) return 0;
      return index + 1;
    });
  }
  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return imageUrls.length - 1;
      return index - 1;
    });
  }

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src={imageUrls[imageIndex]}
        maxWidth="600px"
        width="100%"
        maxHeight="300px"
        objectFit="cover"
      ></Image>
      <Button
        className="arrow arrow-left"
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        onClick={showPrevImage}
        bg={colors.brownButton}
        color="white"
        _hover={{ bg: colors.brownNavbar }}
      >
        <IoIosArrowBack />
      </Button>
      <Button
        className="arrow arrow-right"
        position="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        onClick={showNextImage}
        bg={colors.brownButton}
        color="white"
        _hover={{ bg: colors.brownNavbar }}
      >
        <IoIosArrowForward />
      </Button>
    </Box>
  );
}
