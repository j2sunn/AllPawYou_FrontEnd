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
              <TableCell align="center" sx={{ height: "60px" }}>
                번호
              </TableCell>
              <TableCell align="center">이름</TableCell>
              <TableCell align="center">이메일</TableCell>
              <TableCell align="center" sx={{ width: "15rem" }}>
                삭제
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
                <TableCell align="center" sx={{ width: "15rem", height: "85px" }} onClick={() => removeUser(item.no)}>
                  <Button variant="contained" color="primary">
                    삭제
                  </Button>
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
