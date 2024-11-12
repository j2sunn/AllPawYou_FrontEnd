import { useEffect, useState } from "react";
import { listUsers, deleteUser, updateRole } from "../../../service/UserService";
import styled from "styled-components";
import { Button, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import defaultProfile from "src/assets/defaultprofile.png";
import Swal from "sweetalert2";

const UserList = () => {
  const [users, setUsers] = useState([[]]);

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    listUsers()
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removeUser(no) {
    console.log(no);

    deleteUser(no)
      .then((response) => {
        console.log(response);
        getAllUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const PerPage = 5; // 페이지당 메시지 개수

  // 현재 페이지에 대한 메시지 가져오기
  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  console.log(currentUsers);

  const totalPages = Math.ceil(users.length / PerPage); // 전체 페이지 수

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  function fetchRole(no, newRole) {
    updateRole(no, newRole) // API 호출
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "권한을 변경했습니다.",
          confirmButtonColor: "#527853",
          confirmButtonText: "닫기",
        });
        getAllUsers(); // 사용자 목록 새로고침
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "오류가 발생했습니다..",
          confirmButtonColor: "#527853",
          confirmButtonText: "닫기",
        });
        console.error(error);
      });
  }

  return (
    <>
      <Title>회원 관리</Title>
      <TableContainer
        component={Paper}
        sx={{
          width: "90%",
          marginTop: "3rem",
          marginLeft: "3rem",
          boxShadow: "none",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                borderTop: "2px solid rgba(0,0,0,0.8)",
                borderBottom: "2px solid rgba(0,0,0,0.8)",
              }}
            >
              <TableCell align="center" sx={{ width: "5rem" }}>
                사진
              </TableCell>
              <TableCell align="center" sx={{ width: "10rem" }}>
                이름
              </TableCell>
              <TableCell align="center" sx={{ width: "15rem" }}>
                이메일
              </TableCell>
              <TableCell align="center" sx={{ width: "15rem" }}>
                권한
              </TableCell>
              <TableCell align="center" sx={{ width: "10rem" }}>
                회원 삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((item) => (
              <TableRow
                key={item.no}
                sx={{
                  borderTop: "2px solid rgba(0,0,0,0.3)",
                  borderBottom: "2px solid rgba(0,0,0,0.3)",
                }}
              >
                <TableCell align="center" sx={{ width: "5rem" }}>
                  <img
                    src={item?.profileImage && item?.profileImage !== "default" ? `http://localhost:8081${item.profileImage}` : defaultProfile}
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ width: "5rem" }}>
                  {item.username}
                </TableCell>
                <TableCell align="center" sx={{ width: "15rem" }}>
                  {item.email}
                </TableCell>
                <TableCell align="center">
                  <Select value={item.role} onChange={(e) => fetchRole(item.no, e.target.value)} variant="outlined" sx={{ width: "10rem" }}>
                    <MenuItem value="ROLE_USER">사용자</MenuItem>
                    <MenuItem value="ROLE_SALER">판매자</MenuItem>
                    <MenuItem value="ROLE_ADMIN">관리자</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="center" onClick={() => removeUser(item.no)} sx={{ width: "10rem" }}>
                  <Button variant="contained" color="error">
                    <FaRegTrashAlt size="25" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pages>
        {totalPages > 1 && (
          <Pagination
            count={totalPages} // 총 페이지 수
            page={currentPage} // 현재 페이지
            onChange={handlePageChange} // 페이지 변경 핸들러
            siblingCount={2} // 현재 페이지 주변에 보이는 페이지 수
            boundaryCount={2} // 처음과 끝에 보이는 페이지 수
            color="primary"
          />
        )}
      </Pages>
    </>
  );
};

export default UserList;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 3rem;
  margin-left: 3rem;
  width: 90%;
`;

const Pages = styled.div`
  width: 90%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
