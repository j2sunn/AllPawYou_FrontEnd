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
import UserList from "./components/User/UserList";
import KakaoLogin from "./routes/KakaoSignUp";
import LoginError from "./routes/LoginError";
import Cart from "./routes/Cart";
import OrderList from "./routes/OrderList";
import OrderDetail from "./routes/OrderDetail";
import PaymentApprove from "./routes/PaymentApprove";
import PaymentCheck from "./routes/PaymentCheck";
import BoardWrite from "./routes/BoardWrite";
import ShoppingMain from "./routes/ShoppingMain";
import Layout from "./components/common/Layout";
import NoticeList from "./routes/NoticeList";
import Temp from "./routes/Temp";
import BoardDetail from "./routes/BoardDetail";
import AdminReviewList from "./components/Review/AdminReviewList";
import UserReviewList from "./components/Review/UserReviewList";
import UserReviewCreate from "./components/Review/UserReviewCreate";
import { UpdateReview } from "./service/Review";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />

          {/* 회원가입 */}
          <Route path="/signup" element={<SignUp />} />
          {/* 로그인 */}
          <Route path="/login" element={<Login />} />
          {/* 카카오 회원가입 */}
          <Route path="/login/kakao/update" element={<KakaoLogin />} />
          {/* 모든 회원 리스트 */}
          {/* // http://localhost:3000/user/userlist */}
          <Route path="/user/userlist" element={<UserList />} />
          {/* 회원가입 중복 에러 */}
          <Route path="/login/error" element={<LoginError />} />

          <Route path="/mypage" element={<MyPage />} />
          {/* // http://localhost:3000/admin/memberList */}
          <Route path="/admin/memberList" element={<MemberList />} />
          <Route path="/findEmail" element={<FindEmail />} />
          <Route path="/findEmailResult" element={<FindEmailResult />} />
          <Route path="/resetPwd" element={<ResetPassword />} />

          {/* 장바구니 */}
          <Route path="/cart" element={<Cart />} />
          {/* 주문 목록 */}
          <Route path="/order" element={<OrderList />} />
          {/* 주문 상세 */}
          <Route path="/order/:orderId" element={<OrderDetail />} />
          {/* 주문결제 */}
          <Route path="/payment" element={<PaymentCheck />} />
          {/* 결제 완료 */}
          <Route path="/payment/approve" element={<PaymentApprove />} />

          {/* 쇼핑몰 */}
          <Route path="/shoppingMain" element={<ShoppingMain />} />
          {/* 게시판 */}
          <Route path="/boardWrite" element={<BoardWrite />} />

          {/* 공지사항 메인(관리자) */}
          <Route path="/admin/noticeList" element={<NoticeList />} />

          {/* 후기 전체 리스트 */}
          <Route path="/admin/review/reviewList" element={<AdminReviewList />} />
          {/* 사용자 후기 리스트 */}
          <Route path="/review/myReview" element={<UserReviewList />} />
          {/* 사용자 후기 작성 */}
          <Route path="/review/createReview" element={<UserReviewCreate />} />
          {/* 사용자 후기 수정 */}
          <Route path="/review/updateReview/:reviewNo" element={<UpdateReview />} />

          <Route path="/boardDetail/:boardNo" element={<BoardDetail />} />
          <Route path="/temp" element={<Temp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
