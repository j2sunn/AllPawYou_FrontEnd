import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./routes/MainPage";
import MemberList from "./routes/MemberList";
import MemberSignUp from "./components/member/MemberSignUp";
import MyPage from "./routes/MyPage";
import NotFound from "./routes/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/mypage" element={<MyPage />} />
          {/* // http://localhost:3000/admin/memberList */}
          <Route path="/admin/memberList" element={<MemberList />}></Route>
          {/* // http://localhost:3000/signup */}
          <Route path="/signup" element={<MemberSignUp />}></Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  )
}

export default Router;