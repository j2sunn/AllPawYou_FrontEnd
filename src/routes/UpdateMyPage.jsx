import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { useLocation, useNavigate } from "react-router-dom";
import poodle from "../assets/poodle.png";
import { Table, TableCell, TableRow } from "@mui/material";
import DaumPostcode from "react-daum-postcode";
import MypageSideBar from "../components/common/MypageSideBar";

const MyPage = () => {
  const navigator = useNavigate();

  //---- 회원정보 가져오기
  const [userInfo, setUserInfo] = useState(null);
  const [profile, setProfile] = useState({});
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const nickname = localStorage.getItem("nickname");
    const intro = localStorage.getItem("intro");
    const phone = localStorage.getItem("phone");
    const address = localStorage.getItem("address");
    const profileImage = localStorage.getItem("profile");

    // 가져온 데이터를 상태에 설정
    if (username && email && nickname && intro && phone && address && profileImage) {
      const userData = {
        username,
        email,
        nickname,
        intro,
        phone,
        address,
        profileImage,
      };
      setUserInfo(userData);
      setProfile(userData);
    } else {
      console.error("사용자 정보가 localStorage에 없습니다.");
    }
  }, []);

  const profileHandler = (event, key) => {
    const { value } = event.target;
    setProfile((prev) => ({ ...prev, [key]: value }));

    // const newObj = {
    //   ...profile,
    //   [key]: event.target.value
    // };
    // console.log(newObj);
    // setProfile(newObj);
  };

  // useEffect(()=>{
  //   setUpdate(stat);
  // },[stat]);

  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  const [popup, setPopup] = useState(false);

  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplete = (data) => {
    setPopup(!popup);
  };

  const [isPostcodePopupVisible, setIsPostcodePopupVisible] = useState(false);

  const onCompletePost = (data) => {
    setIsPostcodePopupVisible(false); // 주소 선택 후 팝업 닫기
    setProfile((prev) => ({
      ...prev,
      address: data.address, // 선택한 주소를 프로필에 저장
    }));
  };
  const postCodeStyle = {
    display: isPostcodePopupVisible ? "block" : "none", // 팝업 상태에 따라 보이기
    position: "absolute",
    top: "20%",
    width: "400px",
    height: "400px",
    padding: "7px",
    zIndex: 100,
  };

  return (
    <>
        <Box>
          <SideBar>
            <SideBarTitle>마이 페이지</SideBarTitle>
            <SimpleTreeView>
              <TreeItem
                itemId="0"
                label="회원정보 수정"
                sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }}
                // onClick={()=>navigator('/myPage',{state:{stat: true}})}
                onClick={() => setUpdate((prev) => !prev)}
              />
              <TreeItem itemId="board" label="결제 내역" sx={{ marginBottom: "2rem", "& .MuiTreeItem-label": { fontSize: "1.2rem" } }} />
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
            {profile ? (
              <>
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
                          <TextField
                            variant="outlined"
                            size="small"
                            sx={{ marginLeft: "1rem", width: "25rem" }}
                            value={profile.username}
                            onChange={(event) => profileHandler(event, "username")}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>전화번호 :</TableCell>
                        <TableCell>
                          <TextField
                            variant="outlined"
                            size="small"
                            sx={{ marginLeft: "1rem", width: "25rem" }}
                            value={profile.phone}
                            onChange={() => profileHandler(event, "phone")}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>이메일 :</TableCell>
                        <TableCell>
                          <TextField
                            variant="outlined"
                            size="small"
                            sx={{ marginLeft: "1rem", width: "25rem" }}
                            value={profile.email}
                            slotProps={{
                              input: {
                                readOnly: true,
                              },
                            }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>주소 :</TableCell>
                        <TableCell>
                          <TextField
                            variant="outlined"
                            size="small"
                            multiline
                            maxRows={6}
                            sx={{
                              marginLeft: "1rem",
                              // alignSelf: 'start',
                              width: "25rem",
                            }}
                            value={profile.address}
                            onChange={() => profileHandler(event, "address")}
                          />
                          <Button sx={{ marginLeft: "10px" }} onClick={() => isPostcodePopupVisible(true)}>
                            검색
                          </Button>
                          {isPostcodePopupVisible && <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} />}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>닉네임 :</TableCell>
                        <TableCell>
                          <TextField
                            variant="outlined"
                            size="small"
                            sx={{ marginLeft: "1rem", width: "25rem" }}
                            value={profile.nickname}
                            onChange={() => profileHandler(event, "nickname")}
                          />
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Profile>
                </Content>
                {/* <Title>주소</Title> */}
                {/* <TextField variant="outlined" size="small" multiline maxRows={6} 
              sx={{margin: '1rem 0 3rem 24rem', alignSelf: 'start', width: '60rem'}}
              onChange={()=>profileHandler(event, 'address')}/> */}
                <div>
                  <Title>자기소개</Title>
                  <TextField
                    variant="outlined"
                    size="small"
                    multiline
                    maxRows={6}
                    sx={{ alignSelf: "start", width: "60rem", marginBottom: "2rem" }}
                    value={profile.intro}
                    onChange={() => profileHandler(event, "intro")}
                  />
                </div>
                <Button variant="contained" color="primary" onClick={() => setUpdate((prev) => !prev)}>
                  저장
                </Button>
              </>
            ) : (
              <div>사용자 정보가 없습니다.</div>
            )}
          </UpdateContainer>
        </Box>
    </>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin: 5rem 0 10rem;
`;

const Content = styled.div`
  width: 60rem;
  min-height: 3rem;
  display: flex;
  padding: 1rem;
  margin-bottom: 3rem;
  border: 1px solid black;
  border-radius: 1rem;

  &:first-child {
    border: none;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 4rem;
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

// const Introduce = styled.div`

// `;

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
  margin: 5rem 0;
`;
