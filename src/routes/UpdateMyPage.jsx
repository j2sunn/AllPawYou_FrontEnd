import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableCell, TableRow } from "@mui/material";
import DaumPostcode from "react-daum-postcode";
import MypageSideBar from "../components/common/MypageSideBar";
import { updateUser } from "../service/UserAPI";
import defaultProfile from "../assets/defaultprofile.png";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import { checkNickname } from "../service/UserService";

const MyPage = () => {
  const navigator = useNavigate();

  //---- 회원정보 가져오기
  const [userInfo, setUserInfo] = useState(null);
  const [profile, setProfile] = useState({});
  const [update, setUpdate] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
    navigator("/mypage");
    window.location.reload();
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      const fullAddress = `${profile.address} ${detail2address}`;

      formData.append("username", profile.username);
      formData.append("email", profile.email);
      formData.append("nickname", profile.nickname);
      formData.append("intro", profile.intro);
      formData.append("phone", profile.phone);
      formData.append("address", fullAddress);

      if (profile.profile) {
        formData.append("profile", profile.profile);
      }

      console.log("전체주소 : ", fullAddress);
      console.log("-- formData profile -- : ", formData.get("profile"));

      // const updatedUserInfo = await updateUser(formData);
      // alert("프로필이 업데이트되었습니다.");
      updateUser(formData)
        .then((updatedUserInfo) => {
          Swal.fire({
            icon: "success",
            title: "프로필이 업데이트되었습니다.",
            confirmButtonColor: "#527853",
            confirmButtonText: "닫기",
          });

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
          // console.error("프로필 업데이트 중 오류 발생:", error);
          Swal.fire({
            icon: "warning",
            title: "프로필 업데이트 중 오류 발생.",
            confirmButtonColor: "#527853",
            confirmButtonText: "닫기",
          });
        });
    } catch (error) {
      // console.error("프로필 업데이트 중 오류 발생:", error);
      Swal.fire({
        icon: "error",
        title: "프로필 업데이트 중 오류 발생.",
        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
    }
  };

  const profileHandler = (event, key) => {
    const { value } = event.target;
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const [thumbnail, setThumbnail] = useState({ file: null, preview: `http://localhost:8081${profile.profile}` });

  // useEffect(() => {
  //   if(profile){
  //     setThumbnail({
  //       file : profile.profile,
  //       preview: profile.profile &&  profile.profile !== 'default' ? `http://localhost:8081${profile.profile}` : defaultProfile,
  //     });
  //   } else {
  //     setThumbnail({file : null, preview : defaultProfile});
  //   }
  // }, [profile]);

  useEffect(() => {
    if (profile.profile) {
      // profile.profile이 파일 객체일 경우 (새로 업로드된 경우)
      if (typeof profile.profile === "object") {
        setThumbnail({
          file: profile.profile,
          preview: URL.createObjectURL(profile.profile),
        });
      }
      // profile.profile이 문자열 경로일 경우 (기존 서버 이미지인 경우)
      else if (typeof profile.profile === "string" && profile.profile !== "default") {
        setThumbnail({
          file: profile.profile,
          preview: `http://localhost:8081${profile.profile}`,
        });
      }
    } else {
      // profile.profile이 null이거나 없을 경우 기본 이미지 사용
      setThumbnail({
        file: null,
        preview: defaultProfile,
      });
    }
  }, [profile.profile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (thumbnail.preview) {
        URL.revokeObjectURL(thumbnail.preview);
      }
      const previewURL = URL.createObjectURL(file);
      console.log("previewURL :" + previewURL);

      setProfile((prevProfile) => ({
        ...prevProfile,
        profile: file,
      }));

      setThumbnail({
        file: file,
        preview: previewURL,
      });

      console.log("-- file-- : ", file);
    }
  };

  const deleteProfileImg = () => {
    if (thumbnail.preview) URL.revokeObjectURL(thumbnail.preview);
    setProfile((prevProfile) => ({
      ...prevProfile,
      profile: null,
    }));

    setThumbnail({ file: "", preview: defaultProfile });
  };

  //카카오 api

  const [apiAddress, setapiAddress] = useState("");
  const [detailaddress, setDetailaddress] = useState(""); //api상의 주소
  const [detail2address, setDetail2address] = useState(""); //상세주소

  const [openPostcode, setOpenPostcode] = useState(false); //카카오api

  const clickAddrButton = () => {
    setModalOpen(true);
    setOpenPostcode((current) => !current);
    setShowDetailAddress((current) => !current);
  };

  const selectAddress = (data) => {
    console.log(`주소: ${data.address} , 우편번호 : ${data.zonecode} `);
    setapiAddress(data.zonecode);
    setDetailaddress(data.address);

    setProfile((prevProfile) => ({
      ...prevProfile,
      address: `${data.address}`,
    }));
    setOpenPostcode(false);
    setModalOpen(false);
  };

  const [showDetailAddress, setShowDetailAddress] = useState(false);

  const [isChecking, setIsChecking] = useState(false); // 중복 확인 상태

  const dupliNickname = async () => {
    setIsChecking(true); // 버튼 비활성화
    const nickname = profile.nickname;
    try {
      const response = await checkNickname(nickname);
      const message = response.data;

      Swal.fire({
        icon: "info",
        title: message,
        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "중복 체크에 실패했습니다.",
        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
    } finally {
      setIsChecking(false); // 버튼 활성화
    }
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <Box>
        <MypageSideBar />
        {modalOpen ? (
          <>
            <ModalBackground onClick={() => setModalOpen(false)} />
            <Modal>
              <div style={{ display: "flex" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>주소 검색</div>
                <IoIosCloseCircleOutline
                  size={32}
                  style={{ position: "absolute", right: "2rem", cursor: "pointer" }}
                  onClick={() => setModalOpen(false)}
                />
              </div>
              <DaumPostcode
                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                onComplete={selectAddress}
              />
            </Modal>
          </>
        ) : null}
        <UpdateContainer>
          {profile ? (
            <>
              <Content>
                <Profile>
                  <ProfileImg
                    src={profile.profile && profile.profile !== "null" ? thumbnail.preview : defaultProfile}
                    //src={thumbnail.preview}
                  />
                  <Button component="label" variant="contained">
                    이미지 변경
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
                  </Button>
                  <Button variant="outlined" onClick={deleteProfileImg}>
                    삭제
                  </Button>
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
                        <Button variant="outlined" sx={{ marginLeft: "10px" }} onClick={clickAddrButton}>
                          주소검색
                        </Button>
                      </TableCell>
                    </TableRow>
                    {showDetailAddress && (
                      <TableRow>
                        <TableCell>상세 주소 :</TableCell>
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
                            value={detail2address}
                            onChange={(event) => setDetail2address(event.target.value)}
                            required
                          />
                        </TableCell>
                      </TableRow>
                    )}
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
                        <Button variant="outlined" sx={{ marginLeft: "10px" }} onClick={dupliNickname} disabled={isChecking}>
                          중복확인
                        </Button>
                      </TableCell>
                    </TableRow>
                  </Table>
                </Profile>
              </Content>
              <div>
                <Title style={{ padding: "1rem" }}>자기소개</Title>
                <TextField
                  variant="outlined"
                  size="small"
                  multiline
                  rows={6}
                  sx={{ alignSelf: "start", width: "60rem", marginBottom: "2rem" }}
                  value={profile.intro}
                  onChange={(event) => profileHandler(event, "intro")}
                />
              </div>
              <Buttons>
                <Button variant="outlined" color="primary" onClick={goMypage}>
                  취소
                </Button>
                <Button variant="contained" color="primary" onClick={() => updateProfile()}>
                  저장
                </Button>
              </Buttons>
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

const Title = styled.div`
  align-self: start;
  padding-left: 25rem;
  margin-bottom: 1rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
`;

const UpdateContainer = styled(Container)`
  margin: 5rem 0;
`;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Buttons = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;
`;

const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 3;
`;

const Modal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 30%;
  left: 35%;
  width: 600px;
  border: 3px solid #eec759;
  border-radius: 20px;
  z-index: 5;
  padding: 2rem 0;
  background-color: white;
`;
