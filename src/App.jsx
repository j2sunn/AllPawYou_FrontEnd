import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import Router from "./Router";
import Script from "react-load-script";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#527853",
      },
    },
    typography: {
      fontFamily: "'GowunDodum-Regular', 'NanumSquareRound'",
      fontSize: "1.5rem",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=24bbdb00fa9a34d7534fbdd65caea378&libraries=services,clusterer"
          async
        ></script>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
