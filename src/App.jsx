import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import HeaderComponent from "src/components/common/HeaderComponent";
import FooterComponent from "src/components/common/FooterComponent";
import MemberList from "./components/MemberList";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* // http://localhost:3000/admin/memberList */}
          <Route path="/admin/memberList" element={<MemberList />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
