import Box from "@mui/material/Box";
import { useEffect } from "react";
import KakaoMapComponent from "./KakaoMapComponent";
import TheaterLocation from "./TheaterLocation";

export default function PetMap() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <KakaoMapComponent />
      </div>

      <div>
        <TheaterLocation />
      </div>

      <Box>123123</Box>
      <Box>123123</Box>
      <Box>123123</Box>
    </>
  );
}
