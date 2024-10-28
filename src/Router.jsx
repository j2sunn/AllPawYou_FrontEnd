import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeaderComponent from "src/components/common/HeaderComponent";
import FooterComponent from "src/components/common/FooterComponent";
import MemberList from "./components/member/MemberList";
import MemberSignUp from "./components/member/MemberSignUp";
import Login from "./components/User/Login";
import SignInPage from "./components/User/SignInPage";
import SignUpPage from "./components/User/SignUpPage";

const Router = () => {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        {/* // http://localhost:3000/admin/memberList */}
        <Route path="/admin/memberList" element={<MemberList />}></Route>
        {/* // http://localhost:3000/signup */}
        <Route path="/signup" element={<MemberSignUp />}></Route>

        {/* 로그인, 회원가입 */}
        {/* // http://localhost:3000/user */}
        <Route path="/user" element={<Login />}></Route>
        {/* // http://localhost:3000/user/signin */}
        <Route path="/user/signin" element={<SignInPage />}></Route>
        {/* // http://localhost:3000/user/signup */}
        <Route path="/user/signup" element={<SignUpPage />}></Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
};

export default Router;
