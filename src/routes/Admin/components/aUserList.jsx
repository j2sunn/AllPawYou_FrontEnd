import { useEffect, useState } from "react";
import { listUsers, deleteUser } from "../../../service/UserService";
import styled from "styled-components";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";

const UserList = () => {
  const [user, setUsers] = useState([]);

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

  return (
    <>
      <Title>유저 관리</Title>
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
            {user.map((item, index) => (
              <TableRow key={item.no}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{item.username}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center" sx={{ width: "15rem" }} onClick={() => removeUser(item.no)}>
                  <Button variant="contained" color="error">
                    <FaRegTrashAlt size="25" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Pages>1 2 3 4 5 6</Pages> */}
    </>
  );
};

export default UserList;

const Title = styled.div`
  font-size: 2rem;
  padding-bottom: 3rem;
  width: 90%;
  border-bottom: 3px solid #c4e1f6;
`;
