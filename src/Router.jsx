import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./routes/MainPage";
import SignUp from "./routes/SignUp";
import MyPage from "./routes/MyPage";
import NotFound from "./routes/errors/NotFound";
import Login from "./routes/Login";
import FindEmail from "./routes/FindEmail";
import FindEmailResult from "./routes/FindEmailResult";
import ResetPassword from "./routes/ResetPassword";
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
import NoticeDetail from "./routes/NoticeDetail";
import Temp from "./routes/Temp";
import BoardDetail from "./routes/BoardDetail";

import UserReviewList from "./components/Review/UserReviewList";
import UserReviewCreate from "./components/Review/UserReviewCreate";
import UserReviewUpdate from "./components/Review/UserReviewUpdate";
import ShoppingDetail from "./routes/ShoppingDetail";
import BoardList from "./routes/BoardList";
import UpdateMyPage from "./routes/UpdateMyPage";
import BoardUpdate from "./routes/BoardUpdate";

import PetMap from "./routes/kakaoMap/PetMap";
//message
import MessageSendPage from "./routes/message/CreateMessage";
import SentMessages from "./routes/message/SentMessages";
import ReceiveMessages from "./routes/message/ReceiveMessages";
import DetailMessages from "./routes/message/MessageDetails";

// Admin
import AdminBoardList from "./routes/Admin/AdminBoardList";
import AdminDashboard from "./routes/Admin/AdminDashBoard";
import AdminReviewList from "./routes/Admin/AdminReviewList";
import AdminUserList from "./routes/Admin/AdminUserList";
import AdminOrderList from "./routes/Admin/AdminOrderList";
import AdminProductList from "./routes/Admin/AdminProductList";
import AdmiinAddProduct from "./routes/Admin/AdminAddProduct";
import AdminUpdateProduct from "./routes/Admin/AdminUpdateProduct";
import AdminNoticeList from "./routes/Admin/AdminNoticeList";
import AdminNoticeWrite from "./routes/Admin/AdminCreateNotice";
import AdminNoticeUpdate from "./routes/Admin/AdminUpdateNotice";
import NoticeListUser from "./routes/NoticeListUser";

import MyPageBoardList from "./routes/MyPageBoardList";

import TheaterLocation from "./routes/kakaoMap/KakaoMapComponent";
import ChangePassword from "./routes/Mypage/ChangePassword";

//error
import Forbidden from "./routes/errors/Forbidden";
import LoginNeed from "./routes/errors/LoginNeed";

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
          {/* 주문 상세 */}
          <Route path="/order/:orderId" element={<OrderDetail />} />
          {/* 주문결제 */}
          <Route path="/payment" element={<PaymentCheck />} />
          {/* 결제 완료 */}
          <Route path="/payment/approve" element={<PaymentApprove />} />
          {/* 쇼핑몰 */}
          <Route path="/shopping" element={<ShoppingMain />} />
          <Route path="/shoppingDetail/:id" element={<ShoppingDetail />} />
          {/* 게시판 */}
          <Route path="/boardWrite" element={<BoardWrite />} />
          <Route path="/board/:boardNo" element={<BoardDetail />} />
          <Route path="/temp" element={<Temp />} />
          <Route path="/boardList" element={<BoardList />} />
          <Route path="/boardUpdate" element={<BoardUpdate />} />
          {/* 공지사항 글 상세 */}
          <Route path="/notice/:noticeNo" element={<NoticeDetail />} />
          {/* 사용자 후기 리스트 */}
          <Route path="/review/myReview" element={<UserReviewList />} />
          {/* 사용자 후기 작성 */}
          <Route path="/review/createReview/:orderName" element={<UserReviewCreate />} />
          {/* 사용자 후기 수정 */}
          <Route path="/review/updateReview/:reviewNo" element={<UserReviewUpdate />} />

          {/* 공지사항 메인(유저) */}
          <Route path="/noticeListUser" element={<NoticeListUser />} />

          {/* 공지사항 상세페이지(유저) */}
          <Route path="/noticeDetail/:noticeNo" element={<NoticeDetail />} />

          {/* 마이페이지 글 목록 */}
          <Route path="/board/myBoard" element={<MyPageBoardList />} />

          {/* 지도 실험 */}
          <Route path="/kakaoMap" element={<PetMap />} />
          <Route path="/map2" element={<TheaterLocation />} />

          {/* 마이페이지 비밀번호 수정 */}
          <Route path="/mypage/passwordChange" element={<ChangePassword />} />
          {/* 메세지 */}

          <Route path="/mypage/receiveMessage" element={<ReceiveMessages />} />
          <Route path="/mypage/sentMessage" element={<SentMessages />} />
          <Route path="/mypage/messageDetail/:messageId" element={<DetailMessages />} />
        </Route>

        {/* 관리자 페이지 */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/reviewlist" element={<AdminReviewList />} />
        <Route path="/admin/userlist" element={<AdminUserList />} />
        <Route path="/admin/noticeList" element={<AdminNoticeList />} />
        <Route path="/admin/noticeWrite" element={<AdminNoticeWrite />} />
        <Route path="/admin/noticeUpdate/:noticeNo" element={<AdminNoticeUpdate />} />
        <Route path="/admin/boardlist" element={<AdminBoardList />} />
        <Route path="/admin/orderlist" element={<AdminOrderList />} />
        <Route path="/admin/productlist" element={<AdminProductList />} />
        <Route path="/admin/addproduct" element={<AdmiinAddProduct />} />
        <Route path="/admin/updateproduct/:id" element={<AdminUpdateProduct />} />

        {/* 쪽지 팝업 */}
        <Route path="/mypage/createMessage" element={<MessageSendPage />} />

        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/loginNeed" element={<LoginNeed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
