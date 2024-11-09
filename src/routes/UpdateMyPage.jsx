import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableCell, TableRow } from "@mui/material";
import DaumPostcode from "react-daum-postcode";
import MypageSideBar from "../components/common/MypageSideBar";
import { updateUser } from "../service/UserAPI";
import defaultProfile from "../assets/defaultprofile.png";

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
    const profile = localStorage.getItem("profile");

    // 가져온 데이터를 상태에 설정
    const userData = {
      username,
      email,
      nickname,
      intro,
      phone,
      address,
      profile,
    };
    setUserInfo(userData);
    setProfile(userData);

  }, []);

  const goMypage = () => {
    navigator('/mypage');
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profile: file
      }));
      console.log("-- file-- : ", file);
    }
  }

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('username', profile.username);
      formData.append('email', profile.email);
      formData.append('nickname', profile.nickname);
      formData.append('intro', profile.intro);
      formData.append('phone', profile.phone);
      formData.append('address', profile.address);
      if (profile.profile) {
        formData.append('profile', profile.profile);
      }

      console.log("-- formData.file -- : ", formData.profile);

      // const updatedUserInfo = await updateUser(formData);
      // alert("프로필이 업데이트되었습니다.");
      updateUser(formData)
        .then((updatedUserInfo) => {
          alert("프로필이 업데이트되었습니다.");

          localStorage.setItem("username", updatedUserInfo.username);
          localStorage.setItem("email", updatedUserInfo.email);
          localStorage.setItem("nickname", updatedUserInfo.nickname);
          localStorage.setItem("intro", updatedUserInfo.intro);
          localStorage.setItem("phone", updatedUserInfo.phone);
          localStorage.setItem("address", updatedUserInfo.address);
          localStorage.setItem("profile", updatedUserInfo.profile);

          setUserInfo(updatedUserInfo);

          goMypage();
        })
        .catch((error) => {
          console.error("프로필 업데이트 중 오류 발생:", error);
        });
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
    }
  };

  const profileHandler = (event, key) => {
    const { value } = event.target;
    setProfile((prev) => ({ ...prev, [key]: value }));


  };


  const deleteProfileImg = () => {
    // 기본 프로필 이미지로 변경
    setProfile((prevProfile) => ({
      ...prevProfile,
      profile: defaultProfile, // public 폴더 내 이미지 경로
    }));

    // VisuallyHiddenInput 초기화
    setProfile((prevProfile) => ({
      ...prevProfile,
      profile: null, // 파일 초기화
    }));
  };

  //카카오 api

  const [apiAddress, setapiAddress] = useState("");
  const [detailaddress, setDetailaddress] = useState(""); //api상의 주소
  const [detail2address, setDetail2address] = useState(""); //상세주소

  const [openPostcode, setOpenPostcode] = useState(false); //카카오api

  const clickAddrButton = () => {
    setOpenPostcode(current => !current);
  }

  const selectAddress = (data) => {
    console.log(
      `주소: ${data.address} , 우편번호 : ${data.zonecode} `
    )
    setapiAddress(data.zonecode);
    setDetailaddress(data.address);

    setProfile((prevProfile) => ({
        ...prevProfile,
        address: `${data.address}`,  
    }));
    setOpenPostcode(false);
  };

  return (
    <>
      <Box>
        <MypageSideBar />
        <UpdateContainer>
          {profile ? (
            <>
              <Content>
                <Profile>
                  <ProfileImg
                    src={profile.profile && profile.profile !== "null" ? `http://localhost:8081/${profile.profile}` : defaultProfile}
                  />
                  <Button component="label" variant="contained">
                    이미지 변경
                    <VisuallyHiddenInput
                      type="file" accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                  <Button
                    variant='outlined' onClick={deleteProfileImg}>삭제</Button>
                </Profile>
                <Profile>
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
                          required
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
                          onChange={(event) => profileHandler(event, "phone")}
                          required
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
                          onChange={(event) => profileHandler(event, "address")}
                          required
                        />
                        <Button sx={{ marginLeft: "10px" }} onClick={clickAddrButton}>
                          검색
                        </Button>
                        {openPostcode &&
                          <DaumPostcode
                            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                            onComplete={selectAddress} />}
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
                          onChange={(event) => profileHandler(event, "nickname")}
                          required
                        />
                      </TableCell>
                    </TableRow>
                  </Table>
                </Profile>
              </Content>
              <div>
                <Title>자기소개</Title>
                <TextField
                  variant="outlined"
                  size="small"
                  multiline
                  maxRows={6}
                  sx={{ alignSelf: "start", width: "60rem", marginBottom: "2rem" }}
                  value={profile.intro}
                  onChange={(event) => profileHandler(event, "intro")}
                />
              </div>
              <div>
                <Button variant="outlined" color="primary" onClick={goMypage}>
                  취소
                </Button>
                <Button variant="contained" color="primary" onClick={() => updateProfile()}>
                  저장
                </Button>
              </div>
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

const UploadButton = styled.label`
    border-radius: 15px;
    padding : 5px;
    display: inline-block;
    cursor: pointer;
    margin-top: 10px;
    font-size: 14px;
    text-align : center;
`;

// const UploadButton = styled.label`
//     background-color: RGB(240, 240, 243);
//     border-radius: 15px;
//     padding : 5px;
//     display: inline-block;
//     cursor: pointer;
//     margin-top: 10px;
//     font-size: 14px;
//     text-align : center;
// `;

const FileInput = styled.input`
    display: none;
`;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
