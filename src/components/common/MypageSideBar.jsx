import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

const MypageSideBar = () => {
  const navigate = useNavigate();
  const goMypage = () => {
    navigate(`/mypage`);
  };

  const goMyBoard = () => {
    navigate(`/board/myBoard`);
  };

  const goMyReview = () => {
    navigate(`/review/myReview`);
  };

  const goPasswordUpdate = () => {
    navigate(`/mypage/passwordChange`);
  };

  const goOrder = () => {
    navigate(`/order`);
  };

  // const goCreateMessage = () => {
  //   navigate(`/mypage/createMessage`);
  // };

  const goReceiveMessage = () => {
    navigate(`/mypage/receiveMessage`);
  };

  const geoSentMessage = () => {
    navigate(`/mypage/sentMessage`);
  };

  return (
    <SideBar>
      <SideBarTitle>마이 페이지</SideBarTitle>
      <SimpleTreeView sx={{ border: "3px solid #EEC759", borderRadius: "15px", padding: "3rem", width: "300px" }}>
        <TreeItem itemId="profile" label="프로필" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} onClick={goMypage} />
        <TreeItem
          itemId="pwdChange"
          label="비밀번호 변경"
          onClick={goPasswordUpdate}
          sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}
        />
        <TreeItem itemId="order" label="주문 목록" onClick={goOrder} sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} />
        <TreeItem itemId="message" label="쪽지" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}>
          {/* <TreeItem itemId="createMessage" label="쪽지 보내기" onClick={goCreateMessage} /> */}
          <TreeItem itemId="receive" label="받은 쪽지함" onClick={goReceiveMessage} />
          <TreeItem itemId="sent" label="보낸 쪽지함" onClick={geoSentMessage} />
        </TreeItem>
        <TreeItem itemId="myData" label="내 활동" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}>
          <TreeItem itemId="myBoard" label="내 글 관리" onClick={goMyBoard} />
          <TreeItem itemId="myReview" label="내 후기 관리" onClick={goMyReview} />
        </TreeItem>
      </SimpleTreeView>
    </SideBar>
  );
};

export default MypageSideBar;

const SideBar = styled.div`
  width: 25%;
  min-height: 700px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SideBarTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 3rem;
`;
