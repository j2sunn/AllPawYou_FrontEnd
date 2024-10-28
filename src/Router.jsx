import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./routes/MainPage";
import MemberList from "./components/member/MemberList";
import MemberSignUp from "./components/member/MemberSignUp";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* // http://localhost:3000/admin/memberList */}
          <Route path="/admin/memberList" element={<MemberList />}></Route>
          {/* // http://localhost:3000/signup */}
          <Route path="/signup" element={<MemberSignUp />}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default Router;