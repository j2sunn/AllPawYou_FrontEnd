import Box from "@mui/material/Box";
import { useEffect } from "react";
import BasicMap from "./kakaoMap";

export default function PetMap() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <BasicMap />
      </div>

      <Box>123123</Box>
      <Box>123123</Box>
      <Box>123123</Box>
    </>
  );
}
