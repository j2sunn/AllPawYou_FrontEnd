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
      pageButton: {
        main: "#FFF7D4",
      },
    },
    typography: {
      fontFamily: "Pretendard-Regular",
      fontSize: "1.5rem",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
