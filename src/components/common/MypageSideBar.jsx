import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { Button } from "@mui/material";

const MypageSideBar = () => {
  const navigate = useNavigate();

  const goMyBoard = () => {
    console.log("Navigating to /review/myReview"); // 확인 로그
    navigate(`/`);
  };

  return (
    <>
      <SideBar>
        <SideBarTitle>마이 페이지</SideBarTitle>
        <SimpleTreeView>
          <TreeItem itemId="profile" label="프로필" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} />
          <TreeItem itemId="updateProfile" label="프로필 수정" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} />
          <TreeItem itemId="order" label="구매 내역" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} />
          <TreeItem itemId="myData" label="내 활동" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}>
            <TreeItem itemId="myBoard" label="내 글 관리" />
            <Button type="button" onClick={goMyBoard}>
              내 글 관리로 이동
            </Button>
            <TreeItem itemId="myReview" label="내 후기 관리" />
          </TreeItem>
        </SimpleTreeView>
      </SideBar>
    </>
  );
};

export default MypageSideBar;

const SideBar = styled.div`
  width: 25%;
  height: 70vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SideBarTitle = styled.div`
  font-size: 2rem;
  padding-bottom: 3rem;
`;
