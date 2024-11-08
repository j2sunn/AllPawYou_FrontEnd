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
import OrderList from "./routes/Order/OrderList";
import OrderDetail from "./routes/Order/OrderDetail";
import PaymentApprove from "./routes/Payment/PaymentApprove";
import PaymentCheck from "./routes/Payment/PaymentCheck";
import BoardWrite from "./routes/BoardWrite";
import ShoppingMain from "./routes/ShoppingMain";
import Layout from "./components/common/Layout";
import NoticeList from "./routes/NoticeList";
import NoticeWrite from "./routes/NoticeWrite";
import NoticeDetail from "./routes/NoticeDetail";
import Temp from "./routes/Temp";
import BoardDetail from "./routes/BoardDetail";
import AdminReviewList from "./components/Review/AdminReviewList";
import UserReviewList from "./components/Review/UserReviewList";
import UserReviewCreate from "./components/Review/UserReviewCreate";
import UserReviewUpdate from "./components/Review/UserReviewUpdate";
import ShoppingDetail from "./routes/ShoppingDetail";
import AddProduct from "./routes/AddProduct";
import ProductList from "./routes/ProductList";
import BoardList from "./routes/BoardList";
import UpdateProduct from "./routes/UpdateProduct";
import AdminOrderList from "./routes/Order/AdminOrderList";
import Chart from "./components/chart/Chart";
import UpdateMyPage from "./routes/UpdateMyPage";
import AdminBoardList from "./components/common/AdminBoardList";

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
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/boardlist" element={<AdminBoardList />} />
          {/* 회원가입 중복 에러 */}
          <Route path="/login/error" element={<LoginError />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/update" element={<UpdateMyPage />} />
          <Route path="/findEmail" element={<FindEmail />} />
          <Route path="/findEmailResult" element={<FindEmailResult />} />
          <Route path="/resetPwd" element={<ResetPassword />} />

          {/* 장바구니 */}
          <Route path="/cart" element={<Cart />} />
          {/* 주문 목록 */}
          <Route path="/order" element={<OrderList />} />
          {/* 관리자 주문 목록 */}
          <Route path="/admin/order" element={<AdminOrderList />} />
          {/* 주문 상세 */}
          <Route path="/order/:orderId" element={<OrderDetail />} />
          {/* 주문결제 */}
          <Route path="/payment" element={<PaymentCheck />} />
          {/* 결제 완료 */}
          <Route path="/payment/approve" element={<PaymentApprove />} />

          {/* 쇼핑몰 */}
          <Route path="/shopping" element={<ShoppingMain />} />
          <Route path="/shoppingDetail/:id" element={<ShoppingDetail />} />
          <Route path="/admin/addproduct" element={<AddProduct />} />
          <Route path="/admin/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/admin/productlist" element={<ProductList />} />

          {/* 게시판 */}
          <Route path="/boardWrite" element={<BoardWrite />} />
          <Route path="/board/:boardNo" element={<BoardDetail />} />
          <Route path="/temp" element={<Temp />} />
          <Route path="/boardList" element={<BoardList />} />
          {/* 공지사항 메인(관리자) */}
          <Route path="/admin/noticeList" element={<NoticeList />} />

          {/* 공지사항 글 작성(관리자) */}
          <Route path="/admin/noticeWrite" element={<NoticeWrite />} />

          {/* 공지사항 글 상세 */}
          <Route path="/notice/:noticeNo" element={<NoticeDetail />} />

          {/* 후기 전체 리스트 */}
          <Route path="/admin/reviewList" element={<AdminReviewList />} />
          {/* 사용자 후기 리스트 */}
          <Route path="/review/myReview" element={<UserReviewList />} />
          {/* 사용자 후기 작성 */}
          <Route path="/review/createReview" element={<UserReviewCreate />} />
          {/* 사용자 후기 수정 */}
          <Route path="/review/updateReview/:reviewNo" element={<UserReviewUpdate />} />

          <Route path="/chart" element={<Chart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
