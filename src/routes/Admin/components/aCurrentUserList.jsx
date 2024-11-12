import { useEffect, useState } from "react";
import { listUsers, deleteUser } from "../../../service/UserService";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import defaultProfile from "src/assets/defaultprofile.png";

const CurrentUser = () => {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    listUsers()
      .then((response) => {
        console.log(response.data);

        // 데이터를 가입일 기준으로 정렬 (가장 최근 순서로)
        const sortedUsers = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // 상위 5명의 사용자만 저장
        setUsers(sortedUsers.slice(0, 4));
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

  // 역할을 변환하는 함수
  const getRoleName = (role) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "관리자";
      case "ROLE_USER":
        return "사용자";
      case "ROLE_SALER":
        return "판매자";
      default:
        return "알 수 없음"; // 역할이 정의되지 않은 경우
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
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
              <TableCell align="center" sx={{ width: "10rem", height: "60px" }}>
                사진
              </TableCell>
              <TableCell align="center" sx={{ width: "10rem" }}>
                이름
              </TableCell>
              <TableCell align="center" sx={{ width: "15rem" }}>
                이메일
              </TableCell>
              <TableCell align="center" sx={{ width: "10rem" }}>
                권한
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((item) => (
              <TableRow
                key={item.no}
                sx={{
                  borderTop: "2px solid rgba(0,0,0,0.3)",
                  borderBottom: "2px solid rgba(0,0,0,0.3)",
                }}
              >
                <TableCell align="center" sx={{ height: "85px" }}>
                  <img
                    src={item?.profileImage && item?.profileImage !== "default" ? `http://localhost:8081${item.profileImage}` : defaultProfile}
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ height: "85px" }}>
                  {item.username}
                </TableCell>
                <TableCell align="center" sx={{ height: "85px" }}>
                  {item.email}
                </TableCell>
                <TableCell align="center" sx={{ width: "15rem", height: "85px" }}>
                  {getRoleName(item.role)} {/* 역할 변환 함수 호출 */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CurrentUser;
