import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { useLocation, useNavigate } from "react-router-dom";
import poodle from "../assets/poodle.png";
import { Table, TableCell, TableRow } from "@mui/material";
const MyPage = () => {
  // const {state} = useLocation();
  // const stat = state?.stat;
  const [update, setUpdate] = useState(false);
  const [profile, setProfile] = useState({});
  const navigator = useNavigate();
  const profileHandler = (event, key) => {
    const newObj = {
      ...profile,
      [key]: event.target.value
    };
    console.log(newObj);
    setProfile(newObj);
  }
  // useEffect(()=>{
  //   setUpdate(stat);
  // },[stat]);
  return (
    <>
      {update ? ( //수정인 경우
        /* 사용자 정보 수정 */
          <Box>
            <SideBar> 
              <SideBarTitle>마이 페이지</SideBarTitle>
              <SimpleTreeView>
                <TreeItem itemId="0" label="회원정보 수정" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} 
                // onClick={()=>navigator('/myPage',{state:{stat: true}})}
                onClick={()=>setUpdate(prev=>!prev)}
                />
                <TreeItem itemId="board" label="결제 내역" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}/>
                  {/* <TreeItem itemId="1" label="공지사항" />
                  <TreeItem itemId="2" label="자유게시판" />
                  <TreeItem itemId="3" label="FAQ" /> */}
                {/* </TreeItem> */}
                {/* <TreeItem itemId="shopping-mall" label="쇼핑몰 관리" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}>
                  <TreeItem itemId="4" label="상품 관리" />
                  <TreeItem itemId="5" label="매출 관리" />
                  <TreeItem itemId="6" label="주문 관리" />
                </TreeItem> */}
              </SimpleTreeView>
            </SideBar>                    
        
          <UpdateContainer>
            
            <Content>
              <Profile>
                <ProfileImg 
                // as="div"
                src={poodle}
                />
                {/* <TextField variant="outlined" size="small" sx={{width: '150px'}} onChange={()=>profileHandler(event, 'nickname')}/> */}
              </Profile>
              <Profile>
                {/* Table, TableCell, TableRow */}
                {/* <ProfileDetail>
                  이름 : <TextField variant="outlined" size="small" sx={{marginLeft: '1rem'}} onChange={()=>profileHandler(event, 'name')}
                    value={profile.name}/>
                    
                </ProfileDetail>
                <ProfileDetail>
                  전화번호 : <TextField variant="outlined" size="small" sx={{marginLeft: '1rem'}} onChange={()=>profileHandler(event, 'phone')}/>
                </ProfileDetail>
                <ProfileDetail>
                  이메일 : <TextField variant="outlined" size="small" sx={{marginLeft: '1rem'}} onChange={()=>profileHandler(event, 'email')}/>
                </ProfileDetail>
                <ProfileDetail>
                  주소 : <TextField variant="outlined" size="small" multiline maxRows={6} 
              sx={{
                // margin: '1rem 0 3rem 24rem',
                marginLeft: '1rem',
                // alignSelf: 'start', 
                // width: '60rem'
              }}
              onChange={()=>profileHandler(event, 'address')}/>
                </ProfileDetail>
                <ProfileDetail>
                  닉네임 : <TextField variant="outlined" size="small" sx={{marginLeft: '1rem'}} onChange={()=>profileHandler(event, 'nickname')}/>
                </ProfileDetail> */}
                {/* Table, TableCell, TableRow */}
                <Table>
                  <TableRow>
                    <TableCell>이름 :</TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" sx={{marginLeft: '1rem'}} onChange={()=>profileHandler(event, 'name')}
                        value={profile.name}/>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>전화번호 :</TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" sx={{marginLeft: '1rem'}} onChange={()=>profileHandler(event, 'phone')}/>
                    </TableCell>
                    
                  </TableRow>
                  <TableRow>
                    <TableCell>이메일 :</TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" sx={{marginLeft: '1rem'}} onChange={()=>profileHandler(event, 'email')}/>
                    </TableCell>
                  
                  </TableRow>
                  <TableRow>
                    <TableCell>주소 :</TableCell>
                    <TableCell>
                          <TextField variant="outlined" size="small" multiline maxRows={6} 
                      sx={{
                        // margin: '1rem 0 3rem 24rem',
                        marginLeft: '1rem',
                        // alignSelf: 'start', 
                        // width: '60rem'
                      }}
                      onChange={()=>profileHandler(event, 'address')}/>
                    </TableCell>
                    
                  </TableRow>
                  <TableRow>
                    <TableCell>닉네임 :</TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" sx={{marginLeft: '1rem'}} onChange={()=>profileHandler(event, 'nickname')}/>
                    </TableCell>
                    
                  </TableRow>
                </Table>
              </Profile>
            </Content>
            {/* <Title>주소</Title> */}
            {/* <TextField variant="outlined" size="small" multiline maxRows={6} 
              sx={{margin: '1rem 0 3rem 24rem', alignSelf: 'start', width: '60rem'}}
              onChange={()=>profileHandler(event, 'address')}/> */}
            <Title>자기소개</Title>
            <TextField variant="outlined" size="small" multiline maxRows={6} 
              sx={{alignSelf: 'start', width: '60rem'}}
              onChange={()=>profileHandler(event, 'info')}/>
            <Button variant="contained" color="primary" onClick={()=>setUpdate(prev=>!prev)}>저장</Button>
          </UpdateContainer>
          </Box>
        //-----------------------------------------------------------------------
      ) : ( //수정 아닌 경우
        /* 사용자 정보 출력 */
        <Box>
          <SideBar> 
            <SideBarTitle>마이 페이지</SideBarTitle>
            <SimpleTreeView>
              <TreeItem itemId="0" label="회원정보 수정" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} 
              // onClick={()=>navigator('/myPage',{state:{stat: true}})}
              onClick={()=>setUpdate(prev=>!prev)}
              />
              <TreeItem itemId="board" label="결제 내역" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}>
                {/* <TreeItem itemId="1" label="공지사항" />
                <TreeItem itemId="2" label="자유게시판" />
                <TreeItem itemId="3" label="FAQ" /> */}
              </TreeItem>
              {/* <TreeItem itemId="shopping-mall" label="쇼핑몰 관리" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}>
                <TreeItem itemId="4" label="상품 관리" />
                <TreeItem itemId="5" label="매출 관리" />
                <TreeItem itemId="6" label="주문 관리" />
              </TreeItem> */}
            </SimpleTreeView>
          </SideBar>
          <Container>
            <Content>
              <Profile>
                <ProfileImg 
                // as="div" 
                src={poodle}
                />
                <NickName>건강하개</NickName>
              </Profile>
              <Profile>
                <div>이름 : 김엘지</div>
                <div>전화번호 : 010-1234-5678</div>
                <div>이메일 : lg@lg.com</div>
                <div>주소 : 서울특별시 마곡동로</div>
              </Profile>
            </Content>
            {/* <Title>주소</Title>
            <Content></Content> */}
            <Title>자기소개</Title>
            <Content>푸들과 포메라니안 키우고 있습니다. <br/>
              푸들 2017.01.04일생<br/>
              포메라니안 2023.12.23일생<br/>
            </Content>
            {/* <Button variant="contained" color="primary" onClick={()=>setUpdate(prev=>!prev)}>수정</Button> */}
          </Container>
        </Box>
      )}
    </>
  )
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem 0 10rem;
`;

const Content = styled.div`
  width: 60rem;
  min-height: 3rem;
  display: flex;
  padding: 1rem;
  margin-bottom: 3rem;
  border: 1px solid black;
  border-radius: 1rem;

  &:first-child{
    border: none;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-right: 5rem;
`;

const ProfileImg = styled.img`
    width: 150px;
    height: 150px;
    border: 1px solid black;
    border-radius: 50%;
    margin-bottom: 2rem;
`;

const NickName = styled.div`
  text-align: center;
`;

const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  align-self: start;
  padding-left: 25rem;
  margin-bottom: 1rem;
  
`;
//--------사이드바
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
const Box = styled.div`
  display: flex;
  flex-direction: row;

`;
const UpdateContainer = styled(Container)`
  margin : 5rem 0;
`;
