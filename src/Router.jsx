import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeaderComponent from "src/components/common/HeaderComponent";
import FooterComponent from "src/components/common/FooterComponent";
import MemberList from "./components/member/MemberList";
import MemberSignUp from "./components/member/MemberSignUp";

const Router = () => {
  return (
    <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* // http://localhost:3000/admin/memberList */}
          <Route path="/admin/memberList" element={<MemberList />}></Route>
          {/* // http://localhost:3000/signup */}
          <Route path="/signup" element={<MemberSignUp />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
  )
}

export default Router;