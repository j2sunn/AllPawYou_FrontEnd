import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLogin from "./components/User/Login";

import MainPage from "./routes/MainPage";
import MemberList from "./routes/MemberList";
import SignUp from "./routes/SignUp";
import MyPage from "./routes/MyPage";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import FindEmail from "./routes/FindEmail";
import FindEmailResult from "./routes/FindEmailResult";
import ResetPassword from "./routes/ResetPassword";
import UserList from "./components/User/UserList";
import KakaoLogin from "./routes/KakaoLogin";
import LoginError from "./routes/LoginError";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/mypage" element={<MyPage />} />
        {/* // http://localhost:3000/admin/memberList */}
        <Route path="/admin/memberList" element={<MemberList />} />
        {/* // http://localhost:3000/signup */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findEmail" element={<FindEmail />} />
        <Route path="/findEmailResult" element={<FindEmailResult />} />
        <Route path="/resetPwd" element={<ResetPassword />} />

        {/* 로그인, 회원가입 */}
        {/* // http://localhost:3000/user */}
        <Route path="/user" element={<UserLogin />}></Route>
        {/* 카카오 회원가입 */}
        <Route path="/login/kakao/update" element={<KakaoLogin />}></Route>

        {/* 모든 회원 리스트 - 관리자 */}
        {/* // http://localhost:3000/user/userlist */}
        <Route path="/user/userlist" element={<UserList />}></Route>
        {/* 회원가입 중복 에러 */}
        <Route path="/login/error" element={<LoginError />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
