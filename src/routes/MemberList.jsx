import { useEffect, useState } from "react";
import { deleteMember, listMembers } from "../service/MemberService";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ListEmployeeComponent = () => {
  const [members, setMembers] = useState([
    {
      name: "a",
      email: "a@a.com",
    },
    {
      name: "b",
      email: "b@a.com",
    },
    {
      name: "c",
      email: "c@a.com",
    },
    {
      name: "d",
      email: "d@a.com",
    },
  ]);

  useEffect(() => {
    getAllMembers();
  }, []);

  function getAllMembers() {
    listMembers()
      .then((response) => {
        console.log(response.data);
        setMembers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removeMember(mno) {
    console.log(mno);

    deleteMember(mno)
      .then((response) => {
        console.log(response);
        getAllMembers();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Container>
        <SideBar>
          <SideBarTitle>관리자 메뉴</SideBarTitle>
          <SimpleTreeView>
            <TreeItem itemId="0" label="회원관리" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} />
            <TreeItem itemId="board" label="게시판 관리" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}>
              <TreeItem itemId="1" label="공지사항" />
              <TreeItem itemId="2" label="자유게시판" />
              <TreeItem itemId="3" label="FAQ" />
            </TreeItem>
            <TreeItem itemId="shopping-mall" label="쇼핑몰 관리" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}>
              <TreeItem itemId="4" label="상품 관리" />
              <TreeItem itemId="5" label="매출 관리" />
              <TreeItem itemId="6" label="주문 관리" />
            </TreeItem>
          </SimpleTreeView>
        </SideBar>
        <Content>
          <Title>회원 관리</Title>
          <TableContainer component={Paper} sx={{ width: "90%", marginTop: "3rem" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#EEC759" }}>
                <TableRow>
                  <TableCell align="center">번호</TableCell>
                  <TableCell align="center">이름</TableCell>
                  <TableCell align="center">이메일</TableCell>
                  <TableCell align="center" sx={{ width: "15rem" }}>
                    삭제
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((item, index) => (
                  <TableRow key={item.name}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center" sx={{ width: "15rem" }}>
                      <Button variant="outlined" color="error">
                        회원 삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pages>1 2 3 4 5 6</Pages>
        </Content>
      </Container>
    </>
  );
};

export default ListEmployeeComponent;

const Container = styled.div`
  display: flex;
`;

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

const Title = styled(SideBarTitle)`
  width: 90%;
  border-bottom: 3px solid #c4e1f6;
`;

const Content = styled.div`
  width: 100%;
`;

const Pages = styled.div`
  width: 90%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
