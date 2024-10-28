import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./routes/MainPage";
import MemberList from "./routes/MemberList";
import SignUp from "./routes/SignUp";
import MyPage from "./routes/MyPage";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import FindEmail from "./routes/FindEmail";
import FindEmailResult from "./routes/FindEmailResult";
import ResetPassword from "./routes/ResetPassword";

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
          <Route path="/findEmail" element={<FindEmail/>}  />
          <Route path="/findEmailResult" element={<FindEmailResult/>} />
          <Route path="/resetPwd" element={<ResetPassword />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  )
}

export default Router;