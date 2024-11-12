import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
  Avatar,
} from "@mui/material";
import { MdExpandLess, MdExpandMore, MdPersonOutline, MdEditNote } from "react-icons/md";
import { TbSpeakerphone } from "react-icons/tb";
import { FiClipboard } from "react-icons/fi";
import { RiShoppingCart2Line } from "react-icons/ri";
import { LuGift } from "react-icons/lu";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { MdOutlineRateReview } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { VscGraph } from "react-icons/vsc";
import { IoHomeOutline } from "react-icons/io5";
import { RxReload } from "react-icons/rx";
import Swal from "sweetalert2";
import defaultProfile from "src/assets/defaultprofile.png";
import { GrUserAdmin, GrUserWorker } from "react-icons/gr";

const drawerWidth = 240;

const AdminHeader = () => {
  const [openBoard, setOpenBoard] = useState(false); // 게시판 관리 collapse
  const [openShop, setOpenShop] = useState(false); // 쇼핑몰 관리 collapse

  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  useEffect(() => {
    // 'ROLE_ADMIN' 또는 'ROLE_SALER'만 접근 허용
    if (role !== "ROLE_ADMIN" && role !== "ROLE_SALER") {
      navigate("/forbidden"); // 권한이 없으면 접근 불가 페이지로 리다이렉트
      Swal.fire({
        title: "비정상적인 접근이 감지되었습니다.",
        icon: "warning",
        confirmButtonColor: "#527853",
        confirmButtonText: "닫기",
      });
    }
  }, [role, navigate]);

  const handleClickBoard = () => {
    setOpenBoard(!openBoard);
  };

  const handleClickShop = () => {
    setOpenShop(!openShop);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    Swal.fire({
      title: "로그아웃 되었습니다.",
      icon: "success",

      confirmButtonColor: "#527853",
      confirmButtonText: "닫기",
    });
  };

  const goMain = () => {
    navigate("/"); // 클릭 시 navigate 호출
  };

  const goDashBoard = () => {
    navigate("/admin/dashboard"); // 클릭 시 navigate 호출
  };

  const goUserList = () => {
    navigate("/admin/userlist"); // 클릭 시 navigate 호출
  };

  const goNoticeList = () => {
    navigate("/admin/noticeList"); // 클릭 시 navigate 호출
  };

  const goBoardList = () => {
    navigate("/admin/boardList"); // 클릭 시 navigate 호출
  };

  const goReviewList = () => {
    navigate("/admin/reviewlist"); // 클릭 시 navigate 호출
  };

  const goOrderList = () => {
    navigate("/admin/orderlist"); // 클릭 시 navigate 호출
  };

  const goProductList = () => {
    navigate("/admin/productlist"); // 클릭 시 navigate 호출
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const nickname = localStorage.getItem("nickname");
    const intro = localStorage.getItem("intro");
    const phone = localStorage.getItem("phone");
    const address = localStorage.getItem("address");
    const profileImage = localStorage.getItem("profile");

    // 가져온 데이터를 상태에 설정
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
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `100%`,
          ml: `${drawerWidth}px`,
          height: "70px",
        }}
      >
        <Toolbar>
          {role === "ROLE_ADMIN" ? (
            <Typography variant="h6" noWrap component="div" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              ADMIN PAGE
            </Typography>
          ) : role === "ROLE_SALER" ? (
            <Typography variant="h6" noWrap component="div" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              SALER PAGE
            </Typography>
          ) : null}

          <div style={{ flexGrow: 1 }} />
          {ACCESS_TOKEN ? (
            <>
              {/* 관리자는 관리자 아이콘을, 판매자는 판매자 아이콘을 표시 */}
              {role === "ROLE_ADMIN" ? (
                <Avatar sx={{ backgroundColor: "#C4E1F6", width: "3.5rem", height: "3.5rem" }}>관리자</Avatar>
              ) : role === "ROLE_SALER" ? (
                <Avatar sx={{ backgroundColor: "#EEC759", width: "3.5rem", height: "3.5rem" }}>판매자</Avatar>
              ) : null}
              <img
                src={
                  userInfo?.profileImage && userInfo?.profileImage !== "default" ? `http://localhost:8081${userInfo.profileImage}` : defaultProfile
                }
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <Button color="inherit" style={{ marginLeft: "16px" }} onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            navigate("/forbidden")
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "70px",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleRefresh}>
              <ListItemIcon>
                <RxReload size={30} />
              </ListItemIcon>
              <ListItemText>새로고침</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={goMain}>
              <ListItemIcon>
                <IoHomeOutline size={30} />
              </ListItemIcon>
              <ListItemText>메인 페이지</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={goDashBoard}>
              <ListItemIcon>
                <VscGraph size={30} />
              </ListItemIcon>
              <ListItemText>대시보드</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />

        {/* 게시판 관리 */}

        {role === "ROLE_ADMIN" ? (
          <>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={goUserList}>
                  <ListItemIcon>
                    <MdPersonOutline size={30} />
                  </ListItemIcon>
                  <ListItemText>회원관리</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItemButton onClick={handleClickBoard}>
                <ListItemIcon>
                  <MdEditNote size={30} />
                </ListItemIcon>
                <ListItemText primary="게시판관리" />
                {openBoard ? <MdExpandLess /> : <MdExpandMore />}
              </ListItemButton>
              <Collapse in={openBoard} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={goNoticeList}>
                      <ListItemIcon>
                        <TbSpeakerphone />
                      </ListItemIcon>
                      <ListItemText>공지사항</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={goBoardList}>
                      <ListItemIcon>
                        <FiClipboard />
                      </ListItemIcon>
                      <ListItemText>자유게시판</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Collapse>
            </List>
            <Divider />
          </>
        ) : null}

        <List>
          <ListItemButton onClick={handleClickShop}>
            <ListItemIcon>
              <RiShoppingCart2Line size={30} />
            </ListItemIcon>
            <ListItemText primary="쇼핑몰관리" />
            {openShop ? <MdExpandLess /> : <MdExpandMore />}
          </ListItemButton>
          <Collapse in={openShop} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={goProductList}>
                  <ListItemIcon>
                    <LuGift />
                  </ListItemIcon>
                  <ListItemText>상품관리</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={goOrderList}>
                  <ListItemIcon>
                    <LiaShoppingBagSolid />
                  </ListItemIcon>
                  <ListItemText>주문관리</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={goReviewList}>
                  <ListItemIcon>
                    <MdOutlineRateReview />
                  </ListItemIcon>
                  <ListItemText>후기관리</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
    </>
  );
};

export default AdminHeader;
