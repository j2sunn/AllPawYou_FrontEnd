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
        <Route path="/findEmailResult/:email" element={<FindEmailResult />} />
        <Route path="/resetPwd" element={<ResetPassword />} />

        {/* 로그인, 회원가입 */}
        {/* // http://localhost:3000/user */}
        <Route path="/user" element={<UserLogin />}></Route>
        {/* // http://localhost:3000/user/userlist */}
        <Route path="/user/userlist" element={<UserList />}></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
