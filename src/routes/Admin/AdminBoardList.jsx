import Box from "@mui/material/Box";
import BoardList from "./components/aBoardList";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import { useEffect } from "react";

export default function AdminBoardList() {

  useEffect(()=>{
    scrollTo(0,0);
  },[])

  return (
    <>
    
      <Box sx={{ display: "flex", minHeight: "850px" }}>
        <AdminHeader />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <BoardList />
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
