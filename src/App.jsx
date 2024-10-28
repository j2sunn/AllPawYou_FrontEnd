import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import Router from "./Router";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#527853'
      }
    },
    typography: {
      fontFamily: "'GowunDodum-Regular', 'NanumSquareRound'"
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
