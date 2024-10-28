import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./routes/MainPage";
import MemberList from "./routes/MemberList";
import MemberSignUp from "./components/member/MemberSignUp";
import MyPage from "./routes/MyPage";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import FindEmail from "./routes/FindEmail";
import FindEmailResult from "./routes/FindEmailResult";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/mypage" element={<MyPage />} />
          {/* // http://localhost:3000/admin/memberList */}
          <Route path="/admin/memberList" element={<MemberList />} />
          {/* // http://localhost:3000/signup */}
          <Route path="/signup" element={<MemberSignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/findEmail" element={<FindEmail/>}  />
          <Route path="/findEmailResult" element={<FindEmailResult/>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  )
}

export default Router;