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
  Avatar,
  Button,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { MdExpandLess, MdExpandMore, MdPersonOutline, MdEditNote } from "react-icons/md";
import { TbSpeakerphone } from "react-icons/tb";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiClipboard } from "react-icons/fi";
import { RiShoppingCart2Line } from "react-icons/ri";
import { LuGift } from "react-icons/lu";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { MdOutlineRateReview } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { VscGraph } from "react-icons/vsc";

const drawerWidth = 240;

const AdminHeader = () => {
  const [openBoard, setOpenBoard] = useState(false); // 게시판 관리 collapse
  const [openShop, setOpenShop] = useState(false); // 쇼핑몰 관리 collapse

  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  // Check for admin role on component mount
  useEffect(() => {
    if (role !== "ROLE_ADMIN") {
      navigate("/404error");
      alert("비정상적인 작동이 감지되었습니다.");
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
    alert("로그아웃 되었습니다.");
  };

  const goDashBoard = () => {
    navigate("/admin/dashboard"); // 클릭 시 navigate 호출
  };

  const goUserList = () => {
    navigate("/admin/userlist"); // 클릭 시 navigate 호출
  };

  const goBoardList = () => {
    navigate("/admin/boardList"); // 클릭 시 navigate 호출
  };

  const goReviewList = () => {
    navigate("/admin/reviewlist"); // 클릭 시 navigate 호출
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ADMIN PAGE
          </Typography>
          <div style={{ flexGrow: 1 }} />
          {ACCESS_TOKEN ? (
            <>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{username}</Avatar>
              <Button color="inherit" style={{ marginLeft: "16px" }} onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            navigate("/404error")
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
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
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
          {/* 게시판 관리 */}
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
                <ListItemButton sx={{ pl: 4 }}>
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
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FaRegQuestionCircle />
                  </ListItemIcon>
                  <ListItemText>FAQ</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          {/* 쇼핑몰 관리 */}
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
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <LuGift />
                  </ListItemIcon>
                  <ListItemText>상품관리</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
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
