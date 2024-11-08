import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

const MypageSideBar = () => {
  const navigate = useNavigate();
  const goMypage = () => {
    navigate(`/mypage`);
  };

  const goMyBoard = () => {
    navigate(`/`);
  };

  const goMyReview = () => {
    navigate(`/review/myReview`);
  };

  const goInfoUpdate = () => {
    navigate(`/mypage/update`);
  }

  return (
      <SideBar>
        <SideBarTitle>마이 페이지</SideBarTitle>
        <SimpleTreeView  sx={{border: '3px solid #EEC759', borderRadius: '15px', padding: '4rem'}}>
          <TreeItem
            itemId="profile"
            label="프로필"
            sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem"} }}
            onClick={goMypage}
          />
          {/* <TreeItem itemId="updateProfile" label="프로필 수정" onClick={goInfoUpdate} sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem"} }} /> */}
          <TreeItem itemId="order" label="구매 내역" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem"} }} />
          <TreeItem itemId="myData" label="내 활동" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem"} }}>
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