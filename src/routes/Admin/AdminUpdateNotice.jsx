import Box from "@mui/material/Box";
import UpdateNotice from "./components/aUpdateNotice";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import { useEffect } from "react";

export default function AdminNoticeList() {
  
  useEffect(()=>{
    scrollTo(0,0);
  },[])

  return (
    <>
      <Box sx={{ display: "flex", minHeight: '850px' }}>
        <AdminHeader />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <UpdateNotice />
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
