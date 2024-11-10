import Box from "@mui/material/Box";
import { useEffect } from "react";
import Kakao from "./kakaoMap";

export default function PetMap() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <Kakao />
      </div>

      <Box>123123</Box>
      <Box>123123</Box>
      <Box>123123</Box>
    </>
  );
}
