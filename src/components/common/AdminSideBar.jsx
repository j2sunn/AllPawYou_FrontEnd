import styled from "styled-components";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { useNavigate } from "react-router-dom";

const AdminSideBar = () => {
  const navigate = useNavigate();
  return (
    <SideBar>
      <SideBarTitle>관리자 메뉴</SideBarTitle>
      <SimpleTreeView sx={{ border: "3px solid #EEC759", borderRadius: "15px", padding: "4rem" }}>
        <TreeItem
          itemId="0"
          label="회원관리"
          onClick={() => navigate("/admin/userlist")}
          sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem", fontWeight: "bold" } }}
        />
        <TreeItem
          itemId="board"
          label="게시판 관리"
          sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem", fontWeight: "bold" } }}
        >
          <TreeItem
            itemId="1"
            label="공지사항"
            onClick={() => navigate("/admin/noticeList")}
            sx={{ "& .MuiTreeItem-label": { fontWeight: "100" } }}
          />
          <TreeItem itemId="2" label="자유게시판" sx={{ "& .MuiTreeItem-label": { fontWeight: "100" } }} />
          <TreeItem itemId="3" label="FAQ" sx={{ "& .MuiTreeItem-label": { fontWeight: "100" } }} />
        </TreeItem>
        <TreeItem
          itemId="shopping-mall"
          label="쇼핑몰 관리"
          sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem", fontWeight: "bold" } }}
        >
          <TreeItem
            itemId="4"
            label="상품 관리"
            onClick={() => navigate("/admin/productlist")}
            sx={{ "& .MuiTreeItem-label": { fontWeight: "100" } }}
          />
          <TreeItem itemId="5" label="매출 관리" sx={{ "& .MuiTreeItem-label": { fontWeight: "100" } }} />
          <TreeItem itemId="6" label="주문 관리" onClick={() => navigate("/admin/order")} sx={{ "& .MuiTreeItem-label": { fontWeight: "100" } }} />
          <TreeItem
            itemId="7"
            label="후기 관리"
            onClick={() => navigate("/admin/reviewlist")}
            sx={{ "& .MuiTreeItem-label": { fontWeight: "100" } }}
          />
        </TreeItem>
      </SimpleTreeView>
    </SideBar>
  );
};

export default AdminSideBar;

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
